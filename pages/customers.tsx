import { useState, useEffect, ChangeEvent } from "react";
import CustomerList from "../components/LIsts/CustomerList";
import {
  customersList,
  deleteCustomerState,
  deleteCustomer,
  getSortedCustomers,
  setSortType,
  fetchCustomers,
} from "../slices/customerSlice";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import SearchIcon from "@mui/icons-material/Search";
import { cancelButton } from "../slices/themeSlice";
import type { Customer } from "../slices/DbTypes";
import Modal from "../components/Ui/Modal";
import AddButton from "../components/Ui/AddButton";
import Loader from "../components/Ui/Loader";
import { keyframes } from "@emotion/react";
import { keys } from "@mui/system";

const Customers: React.FC = () => {
  const popupHandler = useAppSelector(
    (state) => state.themeContext.popupHandler
  );
  const handleLoading = useAppSelector((state) => state.userContext.status);
  const contextCustomers: Customer[] = useAppSelector(customersList);
  const sortedCustomers = useAppSelector(
    (state) => state.customerContext.sortedCustomers
  );
  const deleteId = useAppSelector(
    (state) => state.customerContext.deleteCustomerId
  );
  const type = useAppSelector((state) => state.customerContext.sortType);
  const dispatch = useAppDispatch();

  const [handleOpen, setHandleOpen] = useState<string>("");
  const [isLoading, setIsLoading] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  console.log(type);

  useEffect(() => {
    setIsLoading(handleLoading);
    setHandleOpen(popupHandler);
    console.log(sortedCustomers);
  }, [popupHandler, handleLoading]);

  const handleDeleteCustomer = () => {
    dispatch(deleteCustomerState());
    dispatch(cancelButton());
    dispatch(deleteCustomer(deleteId));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortType(e.target.value));
    dispatch(fetchCustomers());
  };

  const search = (data: Customer[]) => {
    const keys = [
      "firstName",
      "lastName",
      "companyName",
      "email",
      "oib",
      "city",
      "adress",
      "phoneNumber",
    ];
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(searchQuery))
    );
  };

  return (
    <>
      <div>
        <section>{handleOpen !== "" ? <Modal /> : ""}</section>
        <section className="flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full">
          <div className="flex justify-between pr-10 pb-16">
            <div className="flex relative ml-10 items-center justify-end  ">
              <SearchIcon className="absolute mr-2" />
              <input
                className="w-[300px] h-full input rounded-full"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>
            <AddButton add={"customer"} />
          </div>
          <div className="flex w-full h-full  justify-end">
            <select onChange={handleChange} className="mr-10 mb-2 select w-36">
              <option disabled>Sort by</option>
              <option value="asc">Asc: Name</option>
              <option value="dsc">Dsc: Name</option>
            </select>
          </div>

          <div className="overflow-x-auto w-full px-10 ">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>WorkList</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>OIB</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading === "loading" ? (
                  <Loader />
                ) : (
                  sortedCustomers &&
                  search(sortedCustomers).map(
                    (singleCustomer: Customer, index: number) => {
                      return (
                        <CustomerList
                          key={index}
                          singleCustomer={singleCustomer}
                          index={index}
                        />
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default Customers;
