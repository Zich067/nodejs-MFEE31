import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';

const Stock = () => {
  const [error, setError] = useState(null);
  const [ stocks ,setStocks] = useState([]);
  const [ counter,setCounter]=useState(0)

  console.log('outside');

  useEffect(()=> {
    console.log('沒有第二個參數')
  });

  useEffect(()=> {
    console.log('第二個參數事空陣列')
    // 在component初始化的時後跑一次
    // 通常會把去跟後端要資料的動作放這裡
    async function getStocks(){
      let response = await axios.get('http://localhost:3001/api/stocks');
      setStocks(response.data);
    }
    getStocks();
  },[]);

  useEffect(() => {
    console.log('第二個參數是counter');}, [counter]);

    const [stockData,setStockData]=useState({
      stockId : '',
      stockName : '',
    });
  
    const handleFieldChange = (e) => {
      const newStocks = { ...stockData, [e.target.name]: e.target.value }
      setStockData(newStocks);
    }
  
    async function handleSubmit(e){
      console.log('handleSubmit');
      // 擋住表單預設送出行為
      e.preventDefault();
      // 送出時才得到表單中各填入值，用FormData
      const formData = new FormData(e.target);
      const stockId = formData.get('stockId');
      const stockName = formData.get('stockName');
  
      // 得到值的方式
      // 有綁定到state中時，直接用state中的值
      let response = await axios.post('http://localhost:3001/api/stocks/',{
        stockId,
        stockName,
      });
  
      setStockData({...stockData, response});
      console.log(response.data);
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>
      <button onClick={()=>{
        setCounter(counter +1)
      }}> add {counter}</button>

      {stocks.map((stock,index)=> {
        return (
          <div key={stock.id} className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
        <Link to={`/stock/${stock.id}`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{stock.id}</h2>
          <p className="text-gray-700">{stock.name}</p>
        </Link>
      </div>
        );
      })};

      <form method='post' onSubmit={handleSubmit} className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
        <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">新增股票</h2>
        <div className="mb-4 text-2xl">
          <label htmlFor="name" className="flex mb-2 w-32">
            股票代碼
          </label>
          <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="text" id="stockId" name="stockId" value={stocks.id} onChange={handleFieldChange}/>
        </div>
        <div className="mb-8 text-2xl">
          <label htmlFor="password" className="flex mb-2 w-32">
            股票名稱
          </label>
          <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="text" id="stockName" name="stockName" value={stocks.name} onChange={handleFieldChange}/>
        </div>
        <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in" type="submit">
          新增
        </button>
      </form>


    </div>
  );
};

export default Stock;
