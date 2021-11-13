import fs from "fs";
import fetch from "node-fetch";

export const getUsers = async () => {
  try {
    const users = await fetch("http://jsonplaceholder.typicode.com/users", {
      method: "GET",
    });

    return users.json();
  } catch (error) {
    return false;
  }
};

export const getCurrencyRatio = async (fromCurrency, toCurrency) => {
  const query = `${fromCurrency}_${toCurrency}`;

  try {
    const res = await fetch(
      `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${process.env.API_KEY}`,
      {
        method: "GET",
      }
    );

    const ratios = await res.json();
    return ratios[query];
  } catch (err) {
    return false;
  }
};

export const getMergedSalary = async () => {
  let salary_data;
  fs.readFile("./salary_data.json", "utf-8", (err, jsonString) => {
    const salary_data_object = JSON.parse(jsonString);
    salary_data = salary_data_object.array;
  });
  const ratio = await getCurrencyRatio("IDR", "USD");
  const users = await getUsers();

  const mergedSalary = salary_data.map((salary) => {
    const user = users.find((user) => user.id === salary.id);
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: user.address,
      phone: user.phone,
      salaryInIDR: salary.salaryInIDR,
      salaryInUSD: salary.salaryInIDR * ratio,
    };
  });
  return mergedSalary;
};
