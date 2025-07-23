const Price = ({ amount }) => (
    <p className="text-2xl font-bold text-gray-900">₹{amount.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
);
export default Price;