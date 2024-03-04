type props = {
  listname: string,
  amount: number

}
const CommonCard = ({ listname, amount }: props) => {
  return (
    <div>
      <article className="rounded-xl max-w-[300px] bg-white p-4 ring ring-indigo-100 ">
        <div className="flex items-start sm:gap-8">
          <div
            className={`${listname == "EXPENSE" ? "border-red-400" : "border-indigo-500"} hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 `}
            aria-hidden="true"
          >
            <div className="flex items-center gap-1">
              <span className={listname == "INCOME" ? "h-6 w-0.5 rounded-full bg-indigo-500" : "h-6 w-0.5 rounded-full bg-red-400"}></span>
              <span className={listname == "INCOME" ? "h-4 w-0.5 rounded-full bg-indigo-500" : "h-4 w-0.5 rounded-full bg-red-400"}></span>
              <span className={listname == "INCOME" ? "h-2 w-0.5 rounded-full bg-indigo-500" : "h-2 w-0.5 rounded-full bg-red-400"}></span>
              <span className={listname == "INCOME" ? "h-4 w-0.5 rounded-full bg-indigo-500" : "h-4 w-0.5 rounded-full bg-red-400"}></span>
              <span className={listname == "INCOME" ? "h-6 w-0.5 rounded-full bg-indigo-500" : "h-6 w-0.5 rounded-full bg-red-400"}></span>
            </div>
          </div>

          <div>
            <strong
              className={
                listname === "INCOME"
                  ? "rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                  : "rounded border border-red-500 bg-red-600 px-3 py-1.5 text-[10px] font-medium text-white"
              }
            >
              {listname}
            </strong>

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              <a href="#" className="hover:underline"> {amount} </a>
            </h3>

            <p className="mt-1 text-sm text-gray-700">Your all time {listname}.
            </p>

          </div>
        </div>
      </article>
    </div>
  )
}

export default CommonCard