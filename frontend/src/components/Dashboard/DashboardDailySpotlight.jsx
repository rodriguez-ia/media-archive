import { Box } from "@mui/material";
import { getDailyRandom } from "../../utils/otherUtils";

function DashboardDailySpotlight() {

    console.log("Today's num: "+getDailyRandom());

    return (
        <Box>

        </Box>
    );
}

export default DashboardDailySpotlight;
