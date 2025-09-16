import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FMInputs, PaymentRecord } from "@/types";
import { formatter } from "@/lib/utils";
import { GetRecentTransactionsApi } from "@/api/branch";

export interface ExtendedPaymentRecord extends PaymentRecord {
  billId: string;
  FM: FMInputs[];
  branchesId: string;
}
export default function RecentTransaction() {
  const [transactions, setTransactions] = useState<ExtendedPaymentRecord[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await GetRecentTransactionsApi();
      if (response?.status === 200) {
        const allTransactions = response.data.data;
        setTransactions(allTransactions);
        console.log(allTransactions.length);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <section className="flex h-fit max-h-[73vh] w-full flex-col gap-5 overflow-y-auto rounded-md bg-white p-5">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-medium">Recent Transactions</p>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="flex items-center gap-2 text-start font-[400] text-[#797979]">
              <p>Transaction Date</p>
            </th>
            <th className="text-start font-[400] text-[#797979]">
              <div className="flex items-center gap-2">
                <p>Name</p>
                <FaChevronDown size={15} className="cursor-pointer" />
              </div>
            </th>
            <th className="text-start font-[400] text-[#797979]">
              <div className="flex items-center gap-2">
                <p>Transaction Type</p>
                <FaChevronDown size={15} className="cursor-pointer" />
              </div>
            </th>
            <th className="text-start font-[400] text-[#797979]">
              Transaction Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="py-2">{transaction.customerName}</td>
              <td className="py-2">{transaction.billId ? "Cr." : "Dr"} </td>
              <td className="py-2">
                {formatter.format(parseInt(transaction.amount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
