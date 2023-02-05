
export default function Card({day, open, close, id}) {
  return (
   
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{day}</p>
          <p className="text-gray-600">{open}</p>
          <p className="text-gray-600">{close}</p>
        </div>
  
    );
}

