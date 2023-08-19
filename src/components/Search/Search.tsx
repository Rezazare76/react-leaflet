import { useState, useEffect } from "react";
import SearchProps from "../../interfaces/Search";
import searchIcon from "../../assets/images/search-solid.svg";
import "./Search.scss";
const Search: React.FC<SearchProps> = ({ setVehicleType }) => {
  const [vehicle, setVehicle] = useState([]);
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setInputValue(target.value);
    setVehicle([]);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (inputValue.length >= 2) {
          const searchParams = new URLSearchParams({
            SearchTerm: inputValue,
            UserToken: JSON.parse(localStorage.getItem("token") || "")?.token,
          });
          const response = await fetch(
            `https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?${searchParams}`
          );

          if (response.ok) {
            const { data } = await response.json();
            setTimeout(() => setVehicle(data), 300);
          }
        } else {
          setVehicle([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVehicles();
  }, [inputValue]);
  const handleVehicleType = (id: number) => {
    setVehicleType(id);
    setInputValue("");
  };
  return (
    <div className="search position-relative ">
      <div className="w-100 bg-gray rounded-3 d-flex align-items-center position-relative">
        <input
          className=" rounded-3"
          onChange={handleInputOnchange}
          value={inputValue}
          placeholder="نوع ماشین آلات"
        />
        <img src={searchIcon} alt="search-icon" width="40px" />
      </div>
      <ul
        className=" position-absolute bg-secondary rounded-3-top w-100 transition overflow-hidden"
        style={{
          height: `${vehicle.length * 45}px`,
        }}
      >
        {vehicle.length > 0 &&
          vehicle.map((element: { [index: string]: string }) => (
            <li
              key={element.id}
              className=" cursor-pointer"
              onClick={() => handleVehicleType(Number(element.id))}
            >
              {element.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Search;
