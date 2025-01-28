import * as React from "react";
// Composants MUI
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};


const NAVIGATION = [
  {
    kind: "header",
    title: "Main Items",
  },
  {
    segment: "/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "dashboard/orders",
    title: "Commandes",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "/dashboard/clients",
    title: "Clients",
    icon: <AssignmentIndIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "#/dashboard/categories",
    title: "Catégories",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "/dashboard/products",  
    title: "Produits",
    icon: <ViewInArIcon />,
    children: [
      {
        segment: "info",  
        title: "Liste des produits",
        icon: <ViewInArIcon />,
      },
      {
        segment: "stock",  
        title: "Gestion du stock",
        icon: <DescriptionIcon />,
      },
    ],
  },
];


const dashboardTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const BaseOfPages = ({ children }) => {

 const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    // Side Menu
    <AppProvider
      navigation={NAVIGATION}
      theme={dashboardTheme}
      branding={{
        logo: "",
        title: "ShoeMarket",
        homeUrl: "/dashboard",
      }}
      authentication={authentication}
      session={session}
    >
      {/* Header */}
      <DashboardLayout >
        {/* Contenu */}
        <PageContainer>
          <div style={{ textAlign: "center", padding: "20px" }}>
            {children}
          </div>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default BaseOfPages;
