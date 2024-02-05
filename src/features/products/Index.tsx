import { useGetAllProductQuery } from "@/services/api/prouductApi";

const AllProducts = () => {
  const { data, isError, isLoading } = useGetAllProductQuery();
  console.log(data);

  const columns = [
    { id: "title", name: "title" },
    { id: "fullName", name: "Fullname" },
    { id: "email", name: "Email" },
    { id: "role", name: "Role" },
    { id: "active", name: "Active" },
    { id: "action", name: "Action" },
  ];

  if (isError) {
    return <h1>OOOhNoooo we got an error</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data?.value.map((p) => (
        <>
          <h1 key={p.id}>{p.title}</h1>
          <p>{p.description}</p>
        </>
      ))}
    </div>
  );
};

export default AllProducts;
