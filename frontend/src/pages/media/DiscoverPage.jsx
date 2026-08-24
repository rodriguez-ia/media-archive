import { useState } from "react";
import { Box, Container } from "@mui/material";
import DiscoverHeader from "../../components/Discover/DiscoverHeader";

function DiscoverPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchMediaTypes, setSearchMediaTypes] = useState(["MOVIE"]);

    const [searchResults, setSearchResults] = useState([]);
    const [stagedMedia, setStagedMedia] = useState([]);

    const [resultModalContent, setResultModalContent] = useState({
        open: false,
        success: false,
        message: ""
    });

    return (
        <Container maxWidth="xl">
            <DiscoverHeader />
        </Container>
    );
}

export default DiscoverPage;