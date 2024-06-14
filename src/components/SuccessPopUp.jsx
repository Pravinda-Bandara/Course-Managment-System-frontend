
const SuccessPopUp = ({ message, onOk }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center backdrop-blur-sm justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white px-9 pb-2 pt-5 rounded-2xl shadow-md">
                <p className="text-lg text-customBlue">{message}</p>
                <div className="flex justify-center">
                    <button className="custom-button p-1 mb-3 mt-4" onClick={onOk}>Okay</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPopUp;
