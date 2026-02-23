import Shelf from "./shelf";

interface BookPageProps {
    params: Promise<{ id: string }>;
}

export default async function ShelfPage({ params }: BookPageProps) {
    const { id } = await params;

    return (
        <div>
            <Shelf id={id} />
        </div>
    );
}
