const Footer = () => (
  <footer className="bg-gray-800 text-white mt-auto">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div><h4 className="font-bold mb-2">ABOUT</h4><ul><li className="hover:underline cursor-pointer">Contact Us</li><li className="hover:underline cursor-pointer">About Us</li><li className="hover:underline cursor-pointer">Careers</li></ul></div>
        <div><h4 className="font-bold mb-2">HELP</h4><ul><li className="hover:underline cursor-pointer">Payments</li><li className="hover:underline cursor-pointer">Shipping</li><li className="hover:underline cursor-pointer">FAQ</li></ul></div>
        <div><h4 className="font-bold mb-2">POLICY</h4><ul><li className="hover:underline cursor-pointer">Return Policy</li><li className="hover:underline cursor-pointer">Terms of Use</li><li className="hover:underline cursor-pointer">Privacy</li></ul></div>
        <div><h4 className="font-bold mb-2">SOCIAL</h4><ul><li className="hover:underline cursor-pointer">Facebook</li><li className="hover:underline cursor-pointer">Twitter</li><li className="hover:underline cursor-pointer">YouTube</li></ul></div>
      </div>
      <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400"><p>&copy; {new Date().getFullYear()} Aaisaheb Vastram. All Rights Reserved.</p></div>
    </div>
  </footer>
);
export default Footer;