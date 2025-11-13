import HistoryList from '../components/HistoryList';

const HistoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">History</h1>
      <HistoryList />
    </div>
  );
};

export default HistoryPage;

