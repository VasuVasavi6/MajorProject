import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { Toast } from "./helper/HelperFunctions";
import axios from "axios";
import { REQUEST_URL } from "../CONSTANTS";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import { MdPersonOutline } from "react-icons/md";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const label = { inputProps: { "aria-label": "Switch demo" } };
const cities = [
  "Ajit Singh Nagar",
  "Arul Nagar",
  "Ashok Nagar",
  "Auto Nagar",
  "Ayodhya Nagar",
  "Ayyappa Nagar",
  "Bandar Road",
  "Bapanayyanagar",
  "Bavajipet",
  "Benz Circle",
  "Bhagat Singh Nagar",
  "Bharathi Nagar",
  "Bhavanipuram",
  "Bhimannavaripeta",
  "Bramanadha Reddy Nagar",
  "Canal Road",
  "Chalasani Nagar",
  "Chittinagar",
  "Chowdhary Pet",
  "Christurajupuram",
  "Currency Nagar",
  "Devi Nagar",
  "Durga Agraharam",
  "Enikepadu",
  "Fakirgudem",
  "Fraserpeta",
  "Gayatri Nagar",
  "Gollapudi",
  "Governorpet",
  "Gunadala",
  "Hanumanpet",
  "Jojinagar",
  "Kaleswara Rao Market",
  "Kanayyathopu",
  "Kanuru",
  "Krishnalanka",
  "Labbipeta",
  "LEPL Icon",
  "LIC Colony",
  "Lurdhunagar",
  "Mallikarjunapeta",
  "Milk Colony",
  "Moghalrajpuram",
  "Mylavaram Vari Street",
  "Nehru Nagar",
  "New Rajarajeswaripeta",
  "NH-9",
  "Nidamanuru",
  "Patamata",
  "Payakapuram",
  "PNT Colony",
  "Poranki",
  "Ramalingeswara Nagar",
  "Ramarajunagar",
  "Ramavarapupadu",
  "Ranga Nagar",
  "Ranigaritota",
  "RR Nagar",
  "RTC Colony",
  "Sanath Nagar",
  "Satyanarayanapuram Main Road",
  "Satyaranayana Puram",
  "Siddhartha Nagar",
  "Sri Ramachandra Nagar",
  "Sriram Nagar",
  "State Bank Colony",
  "Station Road",
  "Surya Rao Peta",
  "Tadigadapa Main Raod",
  "Tarapet",
  "Tulasi Nagar",
  "Vambay Colony",
  "Vidhyadharpuram",
  "Yanamalakuduru",
  "Vinchipeta",
];

// const donors = [
//   {
//     fullname: "shivangi",
//     bloodgroup: "B+",
//   },
//   {
//     fullname: "Rogit",
//     bloodgroup: "B+",
//   },
//   {
//     fullname: "shivangi",
//     bloodgroup: "B+",
//   },
//   {
//     fullname: "shivangi",
//     bloodgroup: "B+",
//   },
// ];

function MainFront({
  setSwitchData,
  setSearchFilterValue,
  setSearchCityFilter,
}) {
  const [bankPlasmaSwitch, setBankPlasmaSwitch] = useState("bank");
  const [donors, setDonors] = useState([]);
  const [inputValues, setInputValues] = useState({
    city: "",
    state: "",
    bloodgroup: "",
  });

  useEffect(() => {
    setSearchFilterValue("");
    setSearchCityFilter("");

    axios({
      method: "get",
      url: `${REQUEST_URL}/auth/getusers`,
    }).then((response) => {
      setDonors(response.data.result);
    });
  }, []);
  const handleInputChange = (e) => {
    if (e.target.checked) setBankPlasmaSwitch("plasma");
    else setBankPlasmaSwitch("bank");
  };
  const handleInputChangeSwitch = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSearch = () => {
    if (inputValues.city === "") {
      Toast("error", "Some Fields are Empty");
    } else {
      setSearchFilterValue(inputValues.city);
    }
  };
  const handleBloodSearch = () => {
    if (inputValues.bloodgroup === "" && inputValues.city === "") {
      Toast("error", "Some Fields are Empty");
    } else {
      setSearchFilterValue(inputValues.bloodgroup);
      setSearchCityFilter(inputValues.city);
    }
  };

  return (
    <>
      <div className="text-white font-semibold px-8 w-full border-b-2 border-white mb-2">
        <div className="flex flex-col w-1/2 px-8 py-20">
          { <div className="flex space-x-4">
            <div className="text-2xl">Blood Bank</div>
            <Switch {...label} onChange={handleInputChange} color="warning" />

            <div className="text-2xl">Plasma Bank</div>
          </div> }
          <div className="flex items-center space-x-12 mt-12">
            <div className="flex flex-col w-1/2 space-y-8 ">
              <select
                name="state"
                id="state"
                className="h-10 rounded-lg text-black px-4 py-2"
                onChange={handleInputChangeSwitch}
                value={inputValues.state}
              >
                <option value="">City</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
              </select>
              <select
                name="city"
                id="city"
                className="h-10 rounded-lg text-black px-4 py-2"
                onChange={handleInputChangeSwitch}
                value={inputValues.city}
              >
                <option value="">Select Area</option>
                {cities.map((val, index) => {
                  return (
                    <option value={val} key={index}>
                      {val}
                    </option>
                  );
                })}
              </select>

              <select
                name="bloodgroup"
                id="bloodgroup"
                className="h-10 rounded-lg text-black px-4 py-2"
                onChange={handleInputChangeSwitch}
                value={inputValues.bloodgroup}
              >
                <option value="">Select BloodGroup</option>
                <option value="Dont't know">Don't know</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            { <Link
              to={bankPlasmaSwitch === "bank" ? "/bloodbank" : "/plasmabank"}
            >
              <div
                className="text-md bg-white logo-color px-8 py-2 rounded-xl cursor-pointer"
                onClick={handleSearch}
              >
                Find
              </div>
            </Link> }
          </div>
          <div className="mt-20 flex">
            <Link to="/donor">
              <div
                className="bg-white logo-color py-2 px-4 rounded-lg cursor-pointer"
                onClick={handleBloodSearch}
              >
                Find Donor
              </div>
            </Link>
          </div>
        </div>
        {/* Image section */}
      </div>
      <div className="totals-front flex space-x-20 w-full justify-center items-center py-8">
        <div className="h-32 w-64 bg-black border-white border-4 rounded-lg flex flex-col text-white font-bold justify-center items-center">
          <div className="text-xl">Total Donors</div>
          <div>7</div>
        </div>
        <div className="h-32 w-64 bg-black border-white border-4 rounded-lg flex flex-col text-white font-bold justify-center items-center">
          <div className="text-xl">Total Plasmabanks</div>
          <div>1</div>
        </div>
        <div className="h-32 w-64 bg-black border-white border-4 rounded-lg flex flex-col text-white font-bold justify-center items-center">
          <div className="text-xl">Total Bloodbanks</div>
          <div>1</div>
        </div>
      </div>

      <div className="bg-whtie h-screen">
        <div className="bg-white w-full">
          <div className="py-10 ">
            <div className="text-3xl font-bold text-center my-5 mt-20">
              Donors Register With BLOOD & PLASMA INFORMANTS
            </div>

            <div className="w-2/3 bg-white h-72 mx-auto donors-front rounded-2xl">
              <div className="py-20 px-20">
                <Carousel responsive={responsive}>
                  {donors.map((val, index) => {
                    return (
                      <div
                        className="flex flex-col justify-center items-center"
                        key={index}
                      >
                        <div>
                          <MdPersonOutline className="text-6xl" />
                        </div>
                        <div>{val.fullname}</div>
                        <div>{val.bloodgroup}</div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full">
             <div className="text-4xl font-bold text-center">We Save Lives</div>
            <div className="text-center capitalize text-xl mt-4 text-black-600">
              " find blood and plasma donor near your location and make blood
              and plasma request as soon as possible "
            </div>            
         </div>

        <div className="mt-12 w-2/3 mx-auto">
          <div className="text-4xl font-bold text-center">Food Diet</div>
          <div className="text-center capitalize text-xl mt-4 text-black-600">
            If you are low in blood level then don't worry just try to add the following food items in your diet menu.               
           </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmXPTQQVWc7VbXMNkYEoEAbGL1wseVjxri8g&usqp=CAU" alt="react logo" style={{ width: '400px', }}/>
            <div className="font-bold">Green Leafy vegetables</div>
            <div className="text-center">

            {/*
            Green vegetables to increase hemoglobin like spinach, mustard greens, celery, and ​ broccoli are rich vegetarian sources of iron. 
            This leafy green vegetable is a natural source of vitamin B12, folic acid, and other vital nutrients, and you should make it a staple part of your daily platter if you want to increase your hemoglobin.
                */}

             </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7PYkTMcsDKmXX3fB7_6UroDpuwFZLbWFjrw&usqp=CAU" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">Egg</div>
            <div className="text-center">
            {/*Nitrate-rich foods like spinach may improve your circulation. These compounds help enlarge your blood vessels and create more room for blood to move through. Also, a study found that a diet rich in spinach helped keep arteries flexible and helped lower blood pressure.
            */}
          </div>  
          </div>           
          
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="https://w7.pngwing.com/pngs/804/871/png-transparent-spinach-graphy-leaf-vegetable-salad-spinach-food-photography-nutrition-thumbnail.png" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">Spinach</div>
            <div className="text-center">
            {/*Nitrate-rich foods like spinach may improve your circulation. These compounds help enlarge your blood vessels and create more room for blood to move through. Also, a study found that a diet rich in spinach helped keep arteries flexible and helped lower blood pressure.
            */}
            </div>
          </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHnmtokvW0JZ887O1aJc683g24q80DkuTuw&usqp=CAU" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">DRY FRUITS</div>
            <div className="text-center">
            {/*Raisins and prunes are rich in iron, which in turn aids those who are suffering from anaemia. There are essential nutrients in dry fruits like Vitamin A, B and K; minerals like copper, magnesium and iron; and unsaturated fat that helps in regenerating red blood cells and haemoglobin in the body.
             */}
             </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB5s_6actq-5W_r89C92_scYd9qtEoE81Q0w&usqp=CAU" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">Lettuce</div>
            <div className="text-center">
            {/*Lettuce is an excellent source of beta carotene (vitamin A) which is needed for healthy skin, bones, and eyes. It helps to improve your haemoglobin levels.   
             */}
             </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYL0zpLuEPKGVjle70Z91C6nG0CQOGh1J_Q&usqp=CAU" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">Carrot</div>
            <div className="text-center">
            {/*Lettuce is an excellent source of beta carotene (vitamin A) which is needed for healthy skin, bones, and eyes. It helps to improve your haemoglobin levels.   
             */}
             </div>
          </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="data:image/jpeg;base64,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" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">Beetroot</div>
            <div className="text-center">
            {/*Beetroot is enriched with natural iron, magnesium, copper, phosphorus, and vitamins B1, B2, B6, B12 and C. The wealth of nutrients in this wondrous vegetable helps in increasing the hemoglobin count and regeneration of red blood cells. It can be consumed raw as salad or in the cooked form. Alternatively, you can even blend it and prepare a glass of beetroot juice.
            */}</div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">

          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhp3P4h7IVqSFVlMF8ldCNc_LJrxhOSacOnA&usqp=CAU" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">Fish</div>
            <div className="text-center">
            {/*Eating black sesame seeds is another great way of increasing your iron intake as they are loaded with iron, calcium, magnesium, copper, zinc, selenium and vitamin B6, E and folate. You can soak them in some water and leave it overnight before consuming it the next morning. Mix about 1 tablespoon of dry roasted black sesame seeds with a teaspoon of honey and roll into a ball. Consume this nutritious ladoo regularly to Increase your iron levels. You can sprinkle some over your cereal or oatmeal or even yogurts and fruit salads.
             */}</div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
          <img src="data:image/jpeg;base64,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" alt="react logo" style={{ width: '400px', }}/>

            <div className="font-bold">Moringa Leaves</div>
            <div className="text-center">
            {/*Moringa leaves are rich in minerals like zinc, iron, copper, magnesium, vitamin A, B and C. Take a few finely chopped moringa leaves and make a paste, add a teaspoon of jaggery powder and blend well. Consume this churna regularly along with the breakfast to improve your hemoglobin level and red blood cells count.
            */} </div>
          </div>
        </div>


        <div className="mt-12 w-2/3 mx-auto">
          <div className="text-4xl font-bold text-center"> Other Tips to Increase Your Hemoglobin Levels at Home </div>
          <div className="text-center capitalize text-xl mt-4 text-gray-600">
            Follow the home remedies to increase your hemoglobin levels.              
           </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Rely on Fruits</div>
            <div className="text-center">
            Apricots, apples, grapes, bananas, pomegranates and watermelons play a very important role in improving hemoglobin count.
              </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Consume food cooked in iron utensils</div>
            <div className="text-center">
            This is because an iron utensil fortifies your food with iron, making it potent for people suffering from low hemoglobin levels.
            </div>
          </div>
          
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Take help of Vitamin C Rich Foods</div>
            <div className="text-center">            
            Eat more gooseberry, oranges, lemon, sweet lime, strawberries, bell peppers, tomatoes, grapefruits, berries,  as they are super rich in vitamin C.             </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Avoid iron blockers</div>
            <div className="text-center">
            imit the intake of haemoglobin foods rich in polyphenols, tannins, phytates and oxalic acid such as tea, coffee, cocoa, soy products, wine, beer, cola and aerated drinks.      
            </div>
          </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Opt for moderate to high intensity workouts</div>
            <div className="text-center">
            When you exercise, your body produces more hemoglobin to meet the increasing demand for oxygen throughout the body.  
             </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Add supplements when needed</div>
            <div className="text-center">
            Some cases of low hemoglobin count can’t be fixed through diet alone. You may need to take oral iron supplements or additional treatments. Before you start taking an iron supplement, consult your doctor.
            </div>
          </div>
           
        </div>

        <div className="w-full footer-top h-52 flex flex-col justify-center items-center text-white font-bold">
          <div className="text-5xl">Start Saving Lives</div>
          <div className="mt-5">
            Become a donor or request for blood and help save lives
          </div>
          <Link to="/register">
            <div className="mt-6 bg-white logo-color px-12 py-2 rounded-full cursor-pointer tracking-widest">
              Register
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MainFront;
