import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

type ProductFormValues = {
  name: string;
  price: string;
  description: string;
};

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
};

const initialFormValues: ProductFormValues = {
  name: "",
  price: "",
  description: "",
};

export default function Dashboard() {
  const [formData, setFormData] =
    useState<ProductFormValues>(initialFormValues);
  const [isToast, setIsToast] = useState<boolean>(false);
  const [isAddToast, setIsAddToast] = useState<boolean>(false);
  const [isDeleteToast, setIsDeleteToast] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/dashboard`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsToast(true);
        setTimeout(() => {
          setIsToast(false);
        }, 3000);
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          },
        );
        if (!response) {
          throw new Error("Error adding a product in handleSubmit - Dashboard");
        } else {
          const newProductData = await response.json();
          setProducts([...products, newProductData]);
          setIsAddToast(true);
          setTimeout(() => {
            setIsAddToast(false);
          }, 3000);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        console.error("Error in Dashboard: ", err.message);
      else console.error("An unknown error occurred in Dashboard");
    }
    setFormData(initialFormValues);

    const modal = document.getElementById(
      "add_product_modal",
    ) as HTMLDialogElement;
    modal.close();
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsToast(true);
        setTimeout(() => {
          setIsToast(false);
        }, 3000);
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/product/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(
            "Error deleting a product in handleDelete - Dashboard",
          );
        } else {
          setIsDeleteToast(true);
          setProducts(products.filter((product) => product.id !== id));
          setTimeout(() => {
            setIsDeleteToast(false);
          }, 3000);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error)
        console.error("Error in Dashboard: ", err.message);
      else console.error("An unknown error occurred in Dashboard");
    }
    setFormData(initialFormValues);

    const modal = document.getElementById(
      "add_product_modal",
    ) as HTMLDialogElement;
    modal.close();
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {isToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error ">
            <span>
              Authentication required: Please sign in to add or delete products.
            </span>
          </div>
        </div>
      )}
      {isAddToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Product Successfully Added!</span>
          </div>
        </div>
      )}
      {isDeleteToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Product Successfully Deleted!</span>
          </div>
        </div>
      )}
      <div className="flex justify-between py-8">
        <div>Dashboard</div>
        <button
          className="btn"
          onClick={() =>
            (
              document.getElementById("add_product_modal") as HTMLDialogElement
            )?.showModal()
          }
        >
          Add Product
        </button>
        <dialog id="add_product_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-left text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-left text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-left text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Add Product
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="hover">
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
