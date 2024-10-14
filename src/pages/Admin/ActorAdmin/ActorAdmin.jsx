import { useState } from "react";
import {
  useGetAllActorsQuery,
  useAddActorMutation,
  useUpdateActorMutation,
  useDeleteActorMutation,
} from "../../../services/Actor/actor.service";

const ActorAdmin = () => {
  const { data: actors, isLoading, isError, refetch } = useGetAllActorsQuery();
  const [addActor] = useAddActorMutation();
  const [updateActor] = useUpdateActorMutation();
  const [deleteActor] = useDeleteActorMutation();

  const [editActorId, setEditActorId] = useState(null);
  const [img, setImg] = useState(null);
  const [sub_img, setSub_img] = useState([]);

  const [newActor, setNewActor] = useState({
    name: "",
    description: "",
    date_of_birth: "",
    nationality: "",
    biography: "",
    height: "",
  });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActor((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (for both add and update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("name", newActor.name);
    formData.append("description", newActor.description);
    formData.append("date_of_birth", newActor.date_of_birth);
    formData.append("nationality", newActor.nationality);
    formData.append("biography", newActor.biography);
    formData.append("height", newActor.height);
    
    if (img) {
      formData.append("img", img); // Main image
    }

    sub_img.forEach((sub_img) => {
      formData.append("sub_img", sub_img); // Sub-images
    });

    
    if (editActorId) {
      await updateActor({ id: editActorId, updatedData: formData });
    } else {
      console.log(formData)
      await addActor(formData);
    }

    setNewActor({
      name: "",
      description: "",
      date_of_birth: "",
      nationality: "",
      biography: "",
      height: "",
    });
    setImg(null); // Reset image after submit
    setSub_img([]); // Reset sub-images after submit
    setEditActorId(null); // Reset edit state
    refetch();
  };

  // Handle edit click
  const handleEditClick = (actor) => {
    setEditActorId(actor._id);
    setNewActor({
      name: actor.name,
      description: actor.description,
      date_of_birth: actor.date_of_birth,
      nationality: actor.nationality,
      biography: actor.biography,
      height: actor.height,
    });
  };

  // Handle delete actor
  const handleDelete = async (id) => {
    await deleteActor(id);
    refetch();
  };

  // Handle file input for main image
  const handleMainImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  // Handle file input for sub-images
  const handleSubImagesChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setSub_img(fileArray);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading actors</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="mb-5 text-2xl font-bold">Actor Admin</h1>

      {/* Add or Edit Actor Form */}
      <form onSubmit={handleSubmit} className="mb-5 text-black" encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newActor.name}
            onChange={handleInputChange}
            placeholder="Actor Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="description"
            value={newActor.description}
            onChange={handleInputChange}
            placeholder="Actor Description"
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="date_of_birth"
            value={newActor.date_of_birth}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="nationality"
            value={newActor.nationality}
            onChange={handleInputChange}
            placeholder="Nationality"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="biography"
            value={newActor.biography}
            onChange={handleInputChange}
            placeholder="Biography"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="height"
            value={newActor.height}
            onChange={handleInputChange}
            placeholder="Height (cm)"
            className="input input-bordered w-full"
          />

          {/* Main Image Upload */}
          <input
            type="file"
            onChange={handleMainImageChange}
            accept="image/*"
            className="input input-bordered w-full"
          />

          {/* Sub-Images Upload */}
          <input
            type="file"
            multiple
            onChange={handleSubImagesChange}
            accept="image/*"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mt-4 flex gap-4 text-white">
          <button type="submit" className="btn btn-primary">
            {editActorId ? "Update Actor" : "Add Actor"}
          </button>
          {editActorId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditActorId(null)}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Actor List */}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date of Birth</th>
            <th>Nationality</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actors?.map((actor) => (
            <tr key={actor._id}>
              <td>{actor.name}</td>
              <td>{actor.description}</td>
              <td>{actor.date_of_birth}</td>
              <td>{actor.nationality}</td>
              <td>
                {actor.img && (
                  <img
                    src={actor.img}
                    alt={actor.name}
                    className="w-16 h-16 object-cover"
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEditClick(actor)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(actor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActorAdmin;
