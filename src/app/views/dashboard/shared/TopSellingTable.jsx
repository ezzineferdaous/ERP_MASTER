import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { useState ,useEffect } from "react";
import { Paragraph } from 'app/components/Typography';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = ({ startDate, endDate }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
  const { palette } = useTheme();
  const [productList, setProductList] = useState([]);

  console.log("start data article 1:" , startDate) ;
  console.log("end Date article 1:" , endDate) ;

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchTopSellingProducts = async () => {

      console.log("start data article 2:" , startDate) ;
      console.log("end Date article 2:" , endDate) ;
      try {
        // const response = await axiosInstance.get('/KPI/article', {
        //   params: {
        //     startDate: startDate,  // يمكنك تغيير التواريخ حسب الحاجة
        //     endDate: endDate
        //   }
        // });
        const response = await axiosInstance.get('/KPI/article', {  params: { startDate: startDate, endDate: endDate } });
        setProductList(response.data.data); // تحديث المنتج مع البيانات المستلمة
      } catch (error) {
        console.error('Error fetching top selling products:', error);
      }
    };

    fetchTopSellingProducts();
  }, [startDate, endDate]);

  const formatNumber = (num) => {
    if (num == null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Articles les plus vendus</Title>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
              Code Article
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
              Nom Article
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
              Qte Vendu
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                   
                    <Paragraph >{product.ItemCode}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                {product.ItemName}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  <Box display="flex" alignItems="center">
                   
                    <Paragraph >{formatNumber(product.QuantitySold)}</Paragraph>
                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

// const productList = [
//   {
//     imgUrl: '/assets/images/products/headphone-2.jpg',
//     name: 'earphone',
//     prix: 100,
//     available: 15,
//   },
//   {
//     imgUrl: '/assets/images/products/headphone-3.jpg',
//     name: 'earphone',
//     prix: 1500,
//     available: 30,
//   },
//   {
//     imgUrl: '/assets/images/products/iphone-2.jpg',
//     name: 'iPhone x',
//     prix: 1900,
//     available: 35,
//   },
//   {
//     imgUrl: '/assets/images/products/iphone-1.jpg',
//     name: 'iPhone x',
//     prix: 100,
//     available: 0,
//   },
//   {
//     imgUrl: '/assets/images/products/headphone-3.jpg',
//     name: 'Head phone',
//     prix: 1190,
//     available: 5,
//   },
// ];

export default TopSellingTable;
