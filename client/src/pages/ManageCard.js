import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ManageCard() {
  const [active, setActive] = useState("true");
  const [subscription, setSubscription] = useState([]);
  const user = JSON.parse(localStorage.getItem('User'));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/subscription?user=${user.id}`)
      .then(({data}) => {
        console.log(data)
        setSubscription(data && data.results && data.results[0]);
        setActive(data.results[0].active);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error('something went wrong');
      });
  }, []);

  const handleCancel = async () => {
    try {
      const res = axios.post(`${process.env.REACT_APP_API_URL}/stripe/cancel`, {
        id: subscription.id,
        subscriptionId: subscription.subscriptionId
      })
      if(res) {
        toast.success('Subscription Cancelled Successfully')
        setActive("false")
      }
    } catch (err) {
      console.log(err.message);
      toast.error('something went wrong'); 
    }
  }
  let date
  if(subscription && subscription.validTill !== null) {
    date = new Date(subscription.validTill).toLocaleDateString()
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 m-4 border border-blue-500 w-1/3">
        <div className="flex mb-4">
          <h2 className="text-2xl font-bold mr-2">Current Plan Details</h2>
          <span
            className={
              active === "true"
                ? 'border p-1 rounded text-green-500 border-green-500 bg-green-100'
                : 'border p-1 rounded text-red-500 border-red-500 bg-red-100'
            }
          >
           {
            active === "true" ? <>Active</> : <>Cancelled</>
           }
          </span>
        </div>
        {subscription && subscription.planId && subscription.planId.name}{' '}
        <span className="text-lg font-normal"></span>
        <div className="text-4xl font-bold mb-4">
          {subscription && subscription.planId && subscription.planId.price}
          <span className="text-lg font-normal">
            {subscription && subscription.planId && subscription.planId.monthly === true ? (
              <>/mo</>
            ) : (
              <>/yr</>
            )}
          </span>
        </div>
        <ul className="mb-6">
          {/* <li>Phone</li>
          <li>Tablet</li> */}
          {subscription && subscription.planId &&
            subscription.planId.devices.map((item, index) => {
              <li key={index}>{item}</li>;
            })}
        </ul>
        <div className="flex">
          <Link
            to={'/subscription'}
            className="bg-transparent border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded mr-2"
            type="button"
          >
            Check Plans
          </Link>
          {active && active==="true" && (<button
            onClick={handleCancel}
            className="bg-transparent border border-red-500 text-red-500 font-bold py-2 px-4 rounded mr-2"
            type="button"
          >
            Cancel
          </button>)}
        </div>
        <p className="text-gray-500 mt-2">
          Your subscription is valid till {date}.
        </p>
      </div>
    </div>
  );
}
