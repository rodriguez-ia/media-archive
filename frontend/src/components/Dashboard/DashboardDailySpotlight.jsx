import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getDailyRandom } from "../../utils/otherUtils";
import {
    getSpotlightOnThisDay,
    getSpotlightForgottenFavorite,
    getSpotlightGenreShoutout,
    getSpotlightRandomSpotlight,
    getSpotlightTopTrending
} from "../../services/mediaService";

function OnThisDay({ data }) {

    return (
        <>OnThisDay</>
    );
}

function ForgottenFavorite({ data }) {

    return (
        <>ForgottenFavorite</>
    );
}

function GenreShoutout({ data }) {

    return (
        <>GenreShoutout</>
    );
}

function RandomSpotlight({ data }) {

    return (
        <>RandomSpotlight</>
    );
}

function TopTrending({ data }) {

    return (
        <>TopTrending</>
    );
}

function NoSpotlight() {

    return(
        <>Add media to your library to activate the Daily Spotlight.</>
    );
}

function DashboardDailySpotlight() {
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchSpotlight() {
            const defaultComponent = {component: OnThisDay, apiCallback: getSpotlightOnThisDay};

            const otherComponents = [
                { component: ForgottenFavorite, apiCallback: getSpotlightForgottenFavorite },
                { component: GenreShoutout, apiCallback: getSpotlightGenreShoutout },
                { component: RandomSpotlight, apiCallback: getSpotlightRandomSpotlight },
                { component: TopTrending, apiCallback: getSpotlightTopTrending }
            ];

            const hasData = (response) => {
                return Object.keys(response?.data ?? {}).length > 0;
            }
                
            try {
                // Always try OnThisDay first.
                let chosen = defaultComponent;
                let response = await chosen.apiCallback();

                if (!hasData(response)) {
                    // Try a daily-selected spotlight.
                    chosen = otherComponents[getDailyRandom()];
                    response = await chosen.apiCallback();
                }

                if (!hasData(response) && chosen.component !== RandomSpotlight) {
                    
                    // Last resort: RandomSpotlight.
                    chosen = otherComponents.find(
                        item => item.component === RandomSpotlight
                    );
                    response = await chosen.apiCallback();
                }

                if (!cancelled) {
                    setSelected(
                        hasData(response)
                            ? {
                                component: chosen.component,
                                data: response.data
                            }
                            : null
                    );
                }
            } catch (error) {
                console.error("Failed to fetch daily spotlight:", error);

                if (!cancelled) {
                    setSelected(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchSpotlight();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return <Box>Loading daily spotlight...</Box>;
    }

    const ComponentToRender = selected?.component ?? NoSpotlight;

    return (
        <Box>
            <ComponentToRender data={selected?.data} />
        </Box>
    );
}

export default DashboardDailySpotlight;
