import ItemForm from './ItemForm';

function Item({item, file}) {
    console.log(item, "llllllllll")
    return (
        <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white ">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2"></div>
                <div class="px-6 pt-4 pb-2">
                <img src={file}/>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.name}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.description}</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.image}</span>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Item;