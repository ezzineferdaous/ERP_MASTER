import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

//SALES
const AppSalesOrder = Loadable(lazy(() => import('./Sales/SalesOrder/AppSalesOrder')));
const AppCreditMemo = Loadable(lazy(() => import('./Sales/ARCreditMemo/AppCreditMemo')));
const AppDelivery = Loadable(lazy(() => import('./Sales/Delivery/AppDelivery')));
const AppReturns = Loadable(lazy(() => import('./Sales/Returns/AppReturns')));
const AppARInvoice = Loadable(lazy(() => import('./Sales/ARInvoice/AppARInvoice')));
const AppSalesQuotation = Loadable(lazy(() => import('./Sales/SalesQuotation/AppSalesQuotation')));
//PURCHASE
const AppPurchaseOrder = Loadable(lazy(() => import('./Purchase/PurchaseOrder/AppPurchaseOrder')));
const AppGoodsReturn = Loadable(lazy(() => import('./Purchase/GoodsReturn/AppGoodsReturn')));
const AppGoodsReceipt = Loadable(lazy(() => import('./Purchase/GoodsReceipt/AppGoodsReceipt')));
const AppAPInvoice = Loadable(lazy(() => import('./Purchase/APInvoice/AppAPInvoice')));
const AppAPCreditMemo = Loadable(lazy(() => import('./Purchase/APCreditMemo/AppAPCreditMemo')));
//BankTransactions
const AppIncomingPayment = Loadable(lazy(() => import('./BankTransactions/IncomingPayment/AppIncomingPayment')));
const AppOutgoingPayments = Loadable(lazy(() => import('./BankTransactions/OutgoingPayments/AppOutgoingPayments')));
//ADMINISTRATION
const AppItemGroupe = Loadable(lazy(() => import('./Administration/Setup/Inventory/ItemGroups/AppItemGroupe')));
const AppFamille = Loadable(lazy(() => import('./Administration/Setup/Inventory/Famille/AppFamille')));
const AppSFamille = Loadable(lazy(() => import('./Administration/Setup/Inventory/SFamille/AppSFamille')));
const AppWarehouses = Loadable(lazy(() => import('./Administration/Setup/Inventory/Warehouses/AppWarehouses')));
const AppUOM = Loadable(lazy(() => import('./Administration/Setup/Inventory/UnitOfMeasurement/AppUM')));
const AppCountry = Loadable(lazy(() => import('./Administration/Setup/BusinessPartner/Country/AppCountry')));
const AppCountryList = Loadable(lazy(() => import('./Administration/Setup/BusinessPartner/Country/AppCountryList')));
const AppCity = Loadable(lazy(() => import('./Administration/Setup/BusinessPartner/City/AppCity')));
const AppTerritory = Loadable(lazy(() => import('./Administration/Setup/BusinessPartner/Territories/AppTerritory')));
const AppCardGroups = Loadable(lazy(() => import('./Administration/Setup/BusinessPartner/CustomerVendorGroups/AppCardGroups')));
/***** Definition > Gestion financière > Devise ****/
const AppCurrency = Loadable(lazy(() => import('./Administration/Setup/Financials/Currency/AppCurrency')));
const AppTax = Loadable(lazy(() => import('./Administration/Setup/Financials/Tax/AppTax')));

const AppBanks = Loadable(lazy(() => import('./Administration/Setup/Banking/Banks/AppBanks')));
const AppCreditCard = Loadable(lazy(() => import('./Administration/Setup/Banking/CreditCards/AppCreditCard')));
const AppMeasureGroup = Loadable(lazy(() => import('./Administration/Setup/Inventory/UnitOfMeasurementGroup/AppMeasureGroup')));
const AppGeneralOptions = Loadable(lazy(() => import('./Administration/Initialization/GeneralOptions/AppGeneralOptions')));
const AppPostingPeriod = Loadable(lazy(() => import('./Administration/Initialization/PostingPeriod/AppPostingPeriod')));
const AppAuthorization = Loadable(lazy(() => import('./Administration/Initialization/Authorization/AppAuthorization')));
const AppDocumentNumbering = Loadable(lazy(() => import('./Administration/Initialization/DocumentNumbering/AppDocumentNumbering')));
const AppPrintPreferences = Loadable(lazy(() => import('./Administration/Initialization/PrintPreferences/AppPrintPreferences')));
//PARTNER
const AppBusinessPartner = Loadable(lazy(() => import('./Partner/BusinessPartner/AppBusinessPartner')));
const AppAddress = Loadable(lazy(() => import('./Partner/Address/AppAddressCRUD')));
//HumanResources
const AppEmployees = Loadable(lazy(() => import('./HumanResources/Employees/AppEmployees')));
//STOCK
const AppItems = Loadable(lazy(() => import('./Stock/Items/AppItems')));
const AppBarCodes = Loadable(lazy(() => import('./Stock/BarCodes/AppBarCodes')));
const AppBatch = Loadable(lazy(() => import('./Stock/ItemManagement/BatchNumbers/AppBatch')));
const AppPriceList = Loadable(lazy(() => import('./Stock/PriceList/PriceLists/AppPriceList')));
const AppDiscountGroups = Loadable(lazy(() => import('./Stock/PriceList/DiscountGroups/AppDiscountGroups')));
const AppGoodsReceiptPO = Loadable(lazy(() => import('./Stock/StockTransactions/GoodsReceiptPO/AppGoodsReceiptPO')));
const AppGoodsIssue = Loadable(lazy(() => import('./Stock/StockTransactions/GoodsIssue/AppGoodsIssue')));
const AppInventoryTransfer = Loadable(lazy(() => import('./Stock/StockTransactions/InventoryTransfer/AppInventoryTransfer')));
const AppInventoryCounting = Loadable(lazy(() => import('./Stock/StockTransactions/InventoryCounting/AppInventoryCounting')));
//FINANCE
const AppGLAccounts = Loadable(lazy(() => import('./Finance/GLAccounts/AppGLAccounts')));

const modulesRoutes = [
  {
    path: '/SalesOrder',
    element: <AppSalesOrder />,
  },
  {
    path: '/ItemGroups',
    element: <AppItemGroupe />,
  },
  {
    path: '/Famille',
    element: <AppFamille />,
  },
  {
    path: '/UnitOfMeasurement',
    element: <AppUOM />,
  },
  {
    path: '/SFamille',
    element: <AppSFamille />,
  },
  {
    path: '/Warehouses',
    element: <AppWarehouses />,
  },{
    path: '/CardGroups',
    element: <AppCardGroups />,
  },{
    path: '/Territory',
    element: <AppTerritory />,
  },{
    path: '/Currency',
    element: <AppCurrency />,
  },{
    path: '/Tax',
    element: <AppTax />,
  },{
    path: '/Banks',
    element: <AppBanks />,
  },{
    path: '/CreditCards',
    element: <AppCreditCard />,
  },
  {
    path: '/UnitOfMeasurementGroup',
    element: <AppMeasureGroup />,
  },{
    path: '/BusinessPartner',
    element: <AppBusinessPartner />,
  }, {
    path: '/Employees',
    element: <AppEmployees />,
  },{
    path: '/Batches',
    element: <AppBatch />,
  },  {
    path: '/PriceLists',
    element: <AppPriceList />,
  },
  {
    path: '/DiscountGroups',
    element: <AppDiscountGroups />,
  },
  {
    path: '/GeneralOptions',
    element: <AppGeneralOptions />,
  },
  {
    path: '/PostingPeriod',
    element: <AppPostingPeriod />,
  },
  {
    path: '/Authorization',
    element: <AppAuthorization />,
  },
  {
    path: '/DocumentNumbering',
    element: <AppDocumentNumbering />,
  },
  {
    path: '/PrintPreferences',
    element: <AppPrintPreferences />,
  },
  {
    path: '/GLAccounts',
    element: <AppGLAccounts />,
  },
  {
    path: '/ARCreditMemo',
    element: <AppCreditMemo />,
  },
  {
    path: '/Delivery',
    element: <AppDelivery />,
  },
  {
    path: '/SalesQuotation',
    element: <AppSalesQuotation />,
  },
  {
    path: '/Returns',
    element: <AppReturns />,
  },
  {
    path: '/ARInvoice',
    element: <AppARInvoice />,
  },
  {
    path: '/PurchaseOrder',
    element: <AppPurchaseOrder />,
  },
  {
    path: '/GoodsReturn',
    element: <AppGoodsReturn />,
  },
  {
    path: '/GoodsReceipt',
    element: <AppGoodsReceipt/>,
  },
  {
    path: '/APInvoice',
    element: <AppAPInvoice/>,
  },
  {
    path: '/APCreditMemo',
    element: <AppAPCreditMemo/>,
  },
  {
    path: '/IncomingPayment',
    element: <AppIncomingPayment/>,
  },
  {
    path: '/OutgoingPayments',
    element: <AppOutgoingPayments/>,
  },
  {
    path: '/Items',
    element: <AppItems/>,
  },
  {
    path: '/BarCodes',
    element: <AppBarCodes/>,
  },
  {
    path: '/GoodsReceiptPO',
    element: <AppGoodsReceiptPO/>,
  },
  {
    path: '/GoodsIssue',
    element: <AppGoodsIssue/>,
  },
  {
    path: '/InventoryTransfer',
    element: <AppInventoryTransfer/>,
  },{
    path: '/Country',
    element: <AppCountry/>,
  },{
    path: '/City',
    element: <AppCity/>,
  },{
    path: '/CountryList',
    element: <AppCountryList/>,
  },{
    path: '/Address',
    element: <AppAddress/>,
  },{
    path: '/InventoryCounting',
    element: <AppInventoryCounting/>
  }

];

export default modulesRoutes; 
