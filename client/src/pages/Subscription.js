import { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function Subscription() {
  const [monthly, setMonthly] = useState([]);
  const [annual, setAnnual] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/plans`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setMonthly(
          data.results.filter((item) => {
            return item.monthly === true;
          })
        );
        setAnnual(
          data.results.filter((item) => {
            return item.monthly === false;
          })
        );
      });
  }, []);
  return (
    <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
      <div className="h-full">
        <div className="max-w-5xl mx-auto" x-data="{ annual: true }">
          <h2 className="text-3xl text-gray-800 font-bold text-center mb-4">
            Plans
          </h2>

          <div className="flex justify-center">
            <div className="flex items-center space-x-3 mb-8">
              <div className="text-sm text-gray-500 font-medium min-w-[120px] text-right">
                Monthly
              </div>
              <div className="relative select-none w-[44px]">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onClick={() => {
                      toggle ? setToggle(false) : setToggle(true);
                    }}
                  />
                  <div className="w-11 h-6 bg-blue-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                </label>
              </div>
              <div className="text-sm text-gray-500 font-medium min-w-[120px]">
                Annually <span className="text-green-500">(-20%)</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {!toggle
              ? monthly.map((item, index) => {
                  return <Card key={index} toggle={toggle} data={item} />;
                })
              : annual.map((item, index) => {
                  return <Card key={index} toggle={toggle} data={item} />;
                })}
          </div>
        </div>
      </div>
    </section>
  );
}
