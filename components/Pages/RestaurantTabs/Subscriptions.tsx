'use client';
import { formatPriceInLKR } from '@/utils/localize.';
import React, { useState } from 'react';

const Subscriptions = () => {
  const [yearlyPrice, setYearlyPrice] = useState<any>(false);

  const plans = [
    {
      id: 0,
      title: 'Free',
      description:
        'cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.',
      price: '0',
      features: ['Single Domain', '50 GB SSD', '1 TB Premium Bandwidth'],
      isPopular: false,
    },
    {
      id: 1,
      title: 'Starter',
      description:
        'cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.',
      price: '5000',
      features: ['Single Domain', '50 GB SSD', '1 TB Premium Bandwidth'],
      isPopular: false,
    },
    {
      id: 2,
      title: 'Essential',
      description:
        'cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.',
      price: '10000',
      features: ['Single Domain', '50 GB SSD', '1 TB Premium Bandwidth'],
      isPopular: true,
    },
    {
      id: 3,
      title: 'Pro',
      description:
        'cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM.',
      price: '20000',
      features: ['Single Domain', '50 GB SSD', '1 TB Premium Bandwidth'],
      isPopular: false,
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-[320px] md:max-w-[1140px]">
        <div className="mt-5 flex justify-center space-x-4 text-center text-base font-semibold md:mt-10">
          <span
            className={`${!yearlyPrice ? 'text-primary' : 'text-white-dark'}`}
          >
            Monthly
          </span>

          <label className="relative h-6 w-12">
            <input
              id="custom_switch_checkbox1"
              type="checkbox"
              className="custom_switch peer absolute top-0 z-10 h-full w-full cursor-pointer opacity-0 left-0"
              onChange={() => setYearlyPrice(!yearlyPrice)}
            />
            <span className="outline_checkbox block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary"></span>
          </label>
          <span
            className={`relative ${
              yearlyPrice ? 'text-primary' : ' text-white-dark'
            }  `}
          >
            Yearly
            <span
              className={`badge absolute my-auto ${
                !yearlyPrice && 'hidden'
              } whitespace-nowrap rounded-full bg-success left-full ml-2`}
            >
              20% Off
            </span>
          </span>
        </div>
        <div className="mt-5 space-y-4 text-white-dark md:mt-16 md:flex md:space-y-0">
          {plans?.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-md border border-white-light p-4 transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] md:rounded-r-none md:border-r-0 lg:p-5"
            >
              {plan.isPopular && (
                <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-center rounded-t-md bg-primary text-base text-white md:-top-[30px]">
                  Most Popular
                </div>
              )}
              <h3 className="mb-5 text-xl font-semibold text-black">
                {plan.title}
              </h3>
              <p>{plan.description}</p>
              <div className="my-7 p-2.5 text-center text-lg">
                <strong
                  className={`text-xl ${
                    plan.isPopular ? 'text-primary' : 'text-[#3b3f5c]'
                  }  lg:text-xl`}
                >
                  {yearlyPrice
                    ? formatPriceInLKR(Number(plan.price) * 12)
                    : formatPriceInLKR(Number(plan.price))}
                </strong>{' '}
                / monthly
              </div>
              <div className="mb-6">
                <strong className="mb-3 inline-block text-[15px] text-black">
                  {plan.title} Features
                </strong>
                <ul className="space-y-3">
                  {plan.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className={`btn ${
                  plan.isPopular ? 'btn-primary' : 'btn-dark'
                }  w-full`}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
