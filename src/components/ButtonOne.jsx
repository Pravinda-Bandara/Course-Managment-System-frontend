
const ButtonOne = ({ isBlack, text }) => {
    const backgroundColor = isBlack ? 'bg-black text-white' : 'bg-white text-black';
    const hoverBackgroundColor = isBlack ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white';

    return (
        <button className={`px-6 my-10 py-1 rounded ${backgroundColor} border rounded-2xl border-black ${hoverBackgroundColor}`}>
            {text}
        </button>
    );
};

export default ButtonOne;
