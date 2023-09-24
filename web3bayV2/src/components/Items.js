import Item from "./Item";
import ItemForm from "./ItemForm";

function Items({item,file}) {


return (
    <div>
        <h2 class=" text-center font-medium leading-tight text-5xl mt-0 mb-2 text-gray-500">ITEMS</h2>
        <section className="grid grid-cols-3 gap-3">
            <Item  item={item} />
        </section>
    </div>
  )
}

export default Items;