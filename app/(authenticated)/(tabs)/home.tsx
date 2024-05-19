import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";
import { useBalanceStore } from "@/store/balanceStorage";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const { balance, runTransaction, clearTransactions, transactions } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      date: new Date(),
      title: "Added money",
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
    });
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>INR</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundButton icon={"add"} text="Add money" onPress={onAddMoney} />
        <RoundButton
          icon={"refresh"}
          text="Exchange"
          onPress={clearTransactions}
        />
        <RoundButton icon={"list"} text="Details" />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions yet
          </Text>
        )}

        {transactions.map((t) => (
          <View
            key={t.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            <View style={styles.circle}>
              <Ionicons
                name={t.amount > 0 ? "add" : "remove"}
                size={24}
                color={Colors.dark}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "400" }}>{t.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {t.date.toLocaleString()}
              </Text>
            </View>
            <Text>{t.amount} INR</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 5,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
