function Header({ signedIn }) {
  return (
    <div className="flex justify-between items-center py-4 px-8 border-white border-b-2 h-[10%] bg-black">
      <div className="text-2xl font-bold text-white">Store.Items.eth</div>
      <div className="flex items-between">
        {signedIn ? (
          <>
            <w3m-account-button balance="show" />
          </>
        ) : (
          <w3m-button label="Sign In" />
        )}
      </div>
    </div>
  );
}

export default Header;
