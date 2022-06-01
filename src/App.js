import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  //Rastgele Sayı üretilip Markaların ilk değerleri giriliyor
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10 + 1);
  };
  const data = [
    {
      id: 1,
      title: "Bursaspor",
      color: "green",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 1500,
    },
    {
      id: 2,
      title: "Galatasaray",
      color: "red",
      textColor: "yellow",
      value: getRandomNumber(),
      maxValue: 5500,
    },
    {
      id: 3,
      title: "Fenerbahçe",
      color: "yellow",
      textColor: "blue",
      value: getRandomNumber(),
      maxValue: 3500,
    },
    {
      id: 4,
      title: "Trabzonspor",
      color: "#800000",
      textColor: "#3BB9FF",
      value: getRandomNumber(),
      maxValue: 2500,
    },
    {
      id: 5,
      title: "Beşiktaş",
      color: "black",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 4500,
    },
  ];

  const [barData, setBarData] = useState(data);

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }
  const setBarDataRandomWith = () => {
    let data = [...barData];
    data.map((item) => {
      return (item.value += getRandomNumber());
    });
    setBarData(data);
  };
  useEffect(() => {
    const arr = [...barData];
    let timer;
    timer = setInterval(() => {
      arr.forEach((item, index) => {
        if (item.value > item.maxValue) {
          console.log("Durması Lazım");
          let data = [...barData];
          data.map((item) => {
            return (item.value = item.maxValue);
          });
          setBarData(data);
          clearInterval(timer);
        } else {
          setBarDataRandomWith();
        }
      });
    }, 500);

    //console.log(arr.);
  }, []);

  return (
    <div className="App">
      <h1>React Yarışan Grafikler Uygulaması</h1>
      {
        //console.log(barData.sort(compareValues("value", "desc")))
        barData.sort(compareValues("value", "desc")).map((item, index) => {
          return (
            <div
              className="chart"
              key={index}
              style={{
                backgroundColor: item.color,
                color: item.textColor,
                width:
                  item.value > item.maxValue
                    ? "100%"
                    : (item.value * 100) / item.maxValue + "%",
                transform: `translateY(${index * 70 + 20 + "px"})`,
              }}>
              <h3>
                En Değerli:{index + 1}.Şirket {item.title} --- Değeri:
                {item.value} --- Max:{item.maxValue}
              </h3>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
