import { MuiButton } from "@/components/shared";
import { IProduct } from "@/types/Product";
import { TableCell, TableRow } from "@mui/material";

type ItemProps = {
  product: IProduct;
};

const Item = ({ product }: ItemProps) => {
  const handleDelete = (id: string) => {};
  return (
    <TableRow key={product.id} hover tabIndex={-1}>
      <TableCell>{product.brand}</TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>
        <img src={product.thumbnail} width={100} alt={product.title} />{" "}
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>
        <MuiButton color="success">Edit</MuiButton>
        {product.id ? (
          <MuiButton onClick={() => handleDelete(product.id)} color="error">
            Delete
          </MuiButton>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default Item;
