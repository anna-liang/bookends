"use client"
import { createShelf, getShelf, getShelves } from "@/api/libraryService";
import { ShelfPrivacy } from "@/types/library";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [privacy, setPrivacy] = useState<ShelfPrivacy>(ShelfPrivacy.PRIVATE)
  const [error, setError] = useState('')

  const handleCreateShelf = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createShelf({ name, description, privacy })

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }

  const handleGetShelves = async () => {
    try {
      await getShelves()
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }

  const handleGetShelf = async () => {
    try {
      await getShelf({ id: '3eac5ad2-c2de-4348-8231-398f273e7f33' })
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message);
      } else {
        console.error(err)
        setError(`Unknown Error: ${err}`)
      }
    }
  }
  // TODO: form validation and error handling
  return (
    <div className="flex flex-col">
      <form onSubmit={handleCreateShelf}>
        <label>Name:</label><input name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} required />
        <label>Description:</label><input name="description" value={description} onChange={(e) => setDescription(e.target.value)} required={false} />
        <label>Privacy:</label>
        <select name="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value as ShelfPrivacy)} required>
          <option value={ShelfPrivacy.PRIVATE}>{ShelfPrivacy.PRIVATE}</option>
          <option value={ShelfPrivacy.PUBLIC}>{ShelfPrivacy.PUBLIC}</option>
        </select>
        <button type="submit">Create Shelf</button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      <button onClick={handleGetShelves}>GET ALL SHELVES</button>
      <button onClick={handleGetShelf}>GET SHELF</button>
    </div>
  );
}
