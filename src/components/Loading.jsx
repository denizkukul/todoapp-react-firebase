function Loading() {
    return (
        <div className="flex h-screen justify-center items-center" >
            <div className="h-12 w-12 rounded-full border-[5px] border-color-700 flex justify-center items-center">
                <div className="bg-transparent border-[40px] border-transparent border-t-[30px] border-t-color-400 h-0 w-0 animate-spin">
                </div>
            </div>
        </div>
    );
}

export default Loading;