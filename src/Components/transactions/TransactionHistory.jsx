import React, { useContext, useState } from 'react';
import { Context } from '@/Context/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { TextAnimate } from '../magicui/text-animate';
import CountUp from '../comman/CountUp';
import DecryptedText from '../Reactbits/DecryptedText';
import ShinyText from '../Reactbits/ShinnyText';
import Button from "../UIverse/EditButtton";
import DeleteButton from "../UIverse/DeleteButton";
import Explore from '../UIverse/ExploreALL';
import { AnimatedList } from '../magicui/animated-list';

// Pagination Imports
import { Pagination, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '../ui/pagination';

function TransactionHistory({ limit, Name }) {
  const Navigate = useNavigate();
  const { transactions, removeTransaction, setEditTransaction } = useContext(Context);

  const [currentPage, setCurretPage] = useState(1);
  const itemsPerPage = 10;

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hours12 = hours % 12 || 12;
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${hours12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍔',
      transport: '🚗',
      salary: '💰',
      shopping: '🛍️',
      entertainment: '🎬',
      other: '🔹',
    };
    return icons[category.toLowerCase()] || icons.other;
  };
console.log(limit,"limit")
  if (limit === undefined) return null;

  const totalPage = Math.ceil(transactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visibleTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurretPage(page);
    }
  };

  return (
    <div className={`w-full p-4 sm:p-6`}>
      <TextAnimate
        delay={0.4}
        duration={1.9}
        animation="slideLeft"
        by="character"
        className="text-center text-2xl sm:text-3xl font-lexend font-bold text-[#082244]"
      >
        {Name}
      </TextAnimate>

      <div className="overflow-x-auto shadow-2xl mt-4">
        <div className="hidden md:grid grid-cols-7 py-5 text-center border-b-2 border-gray-600 rounded-b-lg bg-transparent bg-opacity-80 backdrop-blur-sm p-3 font-semibold text-[17px] text-gray-100">
          <div>Amount</div>
          <div>Category</div>
          <div>Date</div>
          <div>Time</div>
          <div>Description</div>
          <div>Type</div>
          <div>Actions</div>
        </div>

        <div className="divide-y-1 py-3 divide-gray-200">
          {visibleTransactions.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-7 gap-y-3 rounded-b-lg md:gap-y-0 md:items-end md:mt-3 text-center p-4 text-[15px] sm:text-base"
            >
              <div
                className={`font-semibold md:text-[17px] text-[20px] ${item.type === "income" ? "text-green-700" : "text-red-700"}`}
              >
                {item.type === "income" ? "+" : "-"}$
                <CountUp from={0} to={item.amount} separator="," direction="up" duration={1} className="inline" />
              </div>

              <div className="flex items-center justify-center gap-2">
                <span>{getCategoryIcon(item.category)}</span>
                {item.category}
              </div>

              <div className="text-black">
                <DecryptedText text={formatDate(item.date)} animateOn="view" revealDirection="center" />
              </div>

              <div className="text-black">
                <DecryptedText text={formatTime(item.time || "--:--")} animateOn="view" revealDirection="left" />
              </div>

              <div className="text-black truncate">{item.description}</div>

              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    item.type === "income" ? "bg-green-700" : "bg-red-700"
                  }`}
                >
                  <ShinyText text={`${item.type}`} disabled={false} speed={10} className="text-gray-200" />
                </span>
              </div>

              <div className="flex justify-center items-center space-x-3">
                <Button
                  Name={"Edit"}
                  onClick={() => {
                    setEditTransaction(item);
                    Navigate(`/AddTransaction?type=${item.type}`);
                  }}
                />
                <DeleteButton Name={"Delete"} onClick={() => removeTransaction(item.id, item.type)} />
              </div>
            </div>
          ))}
          {limit === 6 && (
            <div className="flex justify-end pr-6 mt-5 my-5">
              <Explore Name={"Explore All"} onClick={() => Navigate('/Transactions')} />
            </div>
          )}
        </div>
      </div>

      {/* Pagination Render */}
      {limit === 'all' && transactions.length > itemsPerPage &&  (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1} />
            </PaginationItem>

            {Array.from({ length: totalPage }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPage} />
            </PaginationItem>
          </Pagination>
        </div>
      )}

      {transactions.length === 0 && (
        <div className="text-center py-10 text-gray-700">
          No transactions found. Add your first transaction!
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
