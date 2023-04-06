function Home() {
  return (
    <Card
      class="text-center"
      header="BadBank Home Page"
      title="Welcome to BadBank"
      text="Please login or create an account to access other parts of this website."
      body={
        <>
          <div
            id="homephotdiv"
            
            className="container"
            style={{textAlign: "center" }}
          >
            <p class="text-center">
              <strong> </strong>
            </p>
            <img
            style={{borderRadius: "20px"}}
              src="bankLogo.png"
              className="img-fluid"
              alt="Responsive image"
            />
          </div>
        </>
      }
    />
  );
}
