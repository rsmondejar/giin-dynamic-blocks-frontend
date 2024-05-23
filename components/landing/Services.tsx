import loremIpsum from "@/lib/Lorem";
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Services() {
    const blocksServicesItems = [...Array(4)].map((value, index) => ({
        id: index + 1,
        title: `Servicio ${index + 1} título`,
        description: `Servicio ${index + 1} descripción. ${loremIpsum.substring(0, 50)}`,
        image: `https://placehold.co/275x150`,
    }));

    return (
        <>
            {blocksServicesItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.title}
                            title={item.title}
                            width="100%"
                            height="auto"
                        />
                        <CardContent>
                            <Typography variant="h5" component="h3">
                                {item.title}
                            </Typography>
                            <Typography variant="body1">
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
}
