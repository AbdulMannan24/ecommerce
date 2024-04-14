
export default function Product ({ image, name, description, price, option, onPress, onView, style}){
    return (
      <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Product Image */}
        <img className="w-full h-56 object-cover object-center" src={image} alt="Product" />
  
        {/* Product Details */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="font-semibold mb-2">${price}</p>
  
          {/* Buttons */}
          <div className="flex justify-between">
            <button onClick = {onView} className={style}>View</button>
            <button onClick = {onPress} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">{option}</button>
          </div>
        </div>
      </div>
    );
  };
  
