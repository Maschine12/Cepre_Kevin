import { getServerSession } from "next-auth";
import Navbar from "../Navbar";

export default async function Home() {
    const session = await getServerSession();
    return (
        <div>
            <Navbar session={session} />
        </div>
    );
}
