import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAssetsRdx,
  addAssetRdx,
  updateAssetRdx,
  deleteAssetRdx,
} from "../../../store/actions/assetActions.js";
import CreateAssetModal from './CreateAssetModal';
import UpdateAssetModal from './UpdateAssetModal';
import AssetTable from './AssetTable';

const AssetsName = () => {
  const dispatch = useDispatch();
  const { assets, assetLoading, assetError } = useSelector((state) => state.asset);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addAssets, setAddAssets] = useState({ assetName: "" });
  const [updateAssets, setUpdateAssets] = useState({ assetId: "", assetName: "" });

  useEffect(() => {
    dispatch(fetchAssetsRdx());
  }, [dispatch]);
  
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddAssets((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateAssets((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addAssets.assetName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addAssetRdx(addAssets));
    setAddAssets({ assetName: "" });
    setIsModalOpenCreate(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!updateAssets.assetName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateAssetRdx(updateAssets));
    setUpdateAssets({ assetName: "", assetId: "" });
    setIsModalOpenUpdate(false);
  };

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };

  const handleUpdate = (data) => {
    setUpdateAssets({
      assetName: data.assetName,
      assetId: data.assetId,
    });
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    dispatch(deleteAssetRdx(data.assetId));
  };

  return (
    <>
      <div>
        <section className="wrapper">
          <section className="common-section contact-section text-white" id="Country">
            <div className="container text-end common-title fw-bold">
              {/* <h2 className="common-heading text-white">
                Assets Creation{" "}
                <span
                  className="fs-2"
                  onClick={handleCreate}
                  style={{ cursor: "pointer" }}
                >
                  <IoMdAddCircleOutline />
                </span>
              </h2> */}
            <div className="flex justify-between pr-4">
              <h2 className="text-left pl-5 font-bold text-white">
              💼 ASSETS TABLE
              </h2>
            <button
            onClick={handleCreate}
            className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
            >
            <IoMdAddCircleOutline className="text-base" />
            <span className="text-sm font-medium">Assets Creation</span>
          </button>
            </div>
            </div>
          </section>
        </section>

        <AssetTable
          assets={assets}
          assetLoading={assetLoading}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>

      <CreateAssetModal
        isOpen={isModalOpenCreate}
        onClose={handlecloseCreate}
        onSubmit={handleAdd}
        assetData={addAssets}
        handleChange={handleChangeAdd}
      />

      <UpdateAssetModal
        isOpen={isModalOpenUpdate}
        onClose={handlecloseUpdate}
        onSubmit={handleUpdateSubmit}
        assetData={updateAssets}
        handleChange={handleChangeUpdate}
      />

      <Toaster />
    </>
  );
};

export default AssetsName;