import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState('EUR');
  const [toCurr, setToCurr] = useState('USD');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setOutput(data.rates[toCurr]);
        setIsLoading(false);
      }

      if (fromCurr === toCurr) return setOutput(amount);
      convert();
    },
    [amount, fromCurr, toCurr]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurr}
        onChange={(e) => setFromCurr(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ILS">ILS</option>
        <option value="INR">CAD</option>
      </select>
      <select
        value={toCurr}
        onChange={(e) => setToCurr(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ILS">ILS</option>
        <option value="INR">CAD</option>
      </select>
      {isLoading ? (
        <Loader />
      ) : (
        <p>
          {output} {toCurr}
        </p>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

//`https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
