export const navigations = [ 
  { 
    name: 'Administration', path: '/Administration ', icon: 'person',
    children: [ 
      { name: 'Initialisation système', icon: 'folder', path: '/Initialization', 
        children: [
              { name: 'Options générales', icon: 'fiber_manual_record', path: '/GeneralOptions' , iconText: 'A'},
              { name: 'Périodes comptables', icon: 'fiber_manual_record', path: '/PostingPeriod' , iconText: 'B'},
              { name: 'Autorisations', icon: 'fiber_manual_record', path: '/Authorization' , iconText: 'C'},
              { name: 'Numérotation', icon: 'fiber_manual_record', path: '/DocumentNumbering ' , iconText: 'D'},
              { name: 'Options d\'impression', icon: 'fiber_manual_record', path: '/PrintPreferences' , iconText: 'E'},  
            ],
     },
      {   name: 'Définition', icon: 'folder', path: '/Setup',
          children: [ 
            { name: 'Partenaires', icon: 'folder_open', path: '/BusinessPartner',
              children: [
                { name: 'Countries/Regions', icon: 'fiber_manual_record', path: '/Country' , iconText: 'F'},
                { name: 'Ville', icon: 'fiber_manual_record', path: '/City' , iconText: 'G'},
                { name: 'Groupes clients/frns', icon: 'fiber_manual_record', path: '/CardGroups' , iconText: 'H'},
                { name: 'Territories', icon: 'fiber_manual_record', path: '/Territory' , iconText: 'TE'},  
              ],
            },
            { name: 'Opérations bancaires', icon: 'folder_open', path: '/Banking',
              children: [
                { name: 'Banques', icon: 'fiber_manual_record', path: '/Banks',  iconText: 'I'},
                { name: 'Cartes de crédit', icon: 'fiber_manual_record', path: '/CreditCards',  iconText: 'J' },
                //{ name: 'Modes de paiement', icon: 'fiber_manual_record', path: '/PaymentMethods' },  
              ],
            },
            { name: 'Gestion des stocks', icon: 'folder_open', path: '/Inventory',
              children: [
                  { name: 'Groupes d\'articles', icon: 'fiber_manual_record', path: '/ItemGroups' ,  iconText: 'K'},                   
                  { name: 'Famille', icon: 'fiber_manual_record', path: '/Famille',  iconText: 'L' },
                  { name: 'Sous Famille', icon: 'fiber_manual_record', path: '/SFamille',  iconText: 'M'},
                  { name: 'Magasins', icon: 'fiber_manual_record', path: '/Warehouses',  iconText: 'N' },
                  { name: 'Unités de mesure', icon: 'fiber_manual_record', path: '/UnitOfMeasurement',  iconText: 'O' }
                  /*, { name: 'Groupes UM', icon: 'fiber_manual_record', path: '/UnitOfMeasurementGroup' ,  iconText: 'P'},*/ ], 
            },
            { name: 'Gestion financière', icon: 'folder_open', path: '/Financial',
              children: [ 
                { name: 'Devises', icon: 'fiber_manual_record', path: '/Currency',  iconText: 'I' },
                { name: 'Tax', icon: 'fiber_manual_record', path: '/Tax',  iconText: 'TaxI' },
              ],
            }
          ],
     }, ],
  },
  { 
    name: 'Gestion financière', icon: 'pie_chart', path: '/Finance',
    children: [ { name: 'Plan comptable', path: '/GLAccounts' , icon: 'folder',  iconText: 'Q'}, ],
  },
  { 
    name: 'Ventes', icon: 'receipt', path: '/Sales',
    children: [ 
      { name: 'Commande client', icon: 'folder', path: '/SalesOrder' ,  iconText: 'R'},
      { name: 'Livraison client', icon: 'folder', path: '/Delivery' ,  iconText: 'S'}, 
      { name: 'Retour client', icon: 'folder', path: '/Returns' ,  iconText: 'T'}, 
      { name: 'Facture client', icon: 'folder', path: '/ARInvoice' ,  iconText: 'U'}, 
      { name: 'Avoir client', icon: 'folder', path: '/ARCreditMemo' ,  iconText: 'V'}, 
      { name: 'Devis client', icon: 'folder', path: '/SalesQuotation' ,  iconText: 'OQUT'}, 
    ],
  },
  { 
    name: 'Achats',icon: 'shopping_cart', path: '/Purchase', 
    children: [ 
      { name: 'Commande fournisseur', icon: 'folder', path: '/PurchaseOrder' ,  iconText: 'W'},
      { name: 'Réception marchandises', icon: 'folder', path: '/GoodsReceipt' ,  iconText: 'X'}, 
      { name: 'Retours', icon: 'folder', path: '/GoodsReturn' ,  iconText: 'Y'}, 
      { name: 'Facture fournisseur', icon: 'folder', path: '/APInvoice' ,  iconText: 'Z'}, 
      { name: 'Avoir fournisseur', icon: 'folder', path: '/APCreditMemo' ,  iconText: 'AA'}, 
    ],
  },
  { 
    name: 'Partenaires', icon: 'safety_divider', path: '/Partner',
    children: [ 
      { name: 'Fiche partenaire', icon: 'folder', path: '/BusinessPartner' , iconText: 'AB'},
      { name: 'Address', icon: 'folder', path: '/Address' , iconText: 'ABBP'}],
  },
  { 
    name: 'Opérations bancaires', icon: 'account_balance', path: '/BankTransactions',
    children: [
      { name: 'Encaissements', icon: 'folder', path: '/IncomingPayment'  , iconText: 'AC' }, 
      { name: 'Décaissements', icon: 'folder', path: '/OutgoingPayments' ,   iconText: 'AD'},],
  },
  {
    name: 'Gestion des stocks', icon: 'inventory', path: '/Stock',
    children: [ 
      { name: 'Article', icon: 'folder', path: '/Items'  , iconText: 'AE'}, 
      { name: 'Codes à barres', icon: 'folder', path: '/BarCodes' , iconText: 'AF'},
      { name: 'Gestion des articles', icon: 'folder', path: '/ItemManagement', iconText: 'AG',
        children: [
          { name: 'Lots', icon: 'folder_open', path: '/Batches' , iconText: 'AH'},
        ]
      },
      { name: 'Transactions de stock', icon: 'folder', path: '/StockTransactions',
        children: [ 
          { name: 'Entrée de marchandises', icon: 'folder_open', path: '/GoodsReceiptPO', iconText: 'AJ' },
          { name: 'Sortie de marchandises', icon: 'folder_open', path: '/GoodsIssue', iconText: 'AK' },
          { name: 'Transfert de stock', icon: 'folder_open', path: '/InventoryTransfer ', iconText: 'AL' },
          { name: 'Inventaire', icon: 'folder_open', path: '/InventoryCounting ', iconText: 'INVC' }
        ] 
      },
      { name: 'Listes de prix', icon: 'folder', path: '/PriceList',
        children: [
          { name: 'Listes de prix', icon: 'folder_open', path: '/PriceLists' , iconText: 'AM'},
          { name: 'Groupes de remises', icon: 'folder_open', path: '/DiscountGroups', iconText: 'AN' }
        ]
      },
    ],
  },
  { name: 'Ressources humaines', icon: 'supervisor_account', path: '/HumanResources',
    children: [
      { name: 'Salariés', icon: 'folder', path: '/Employees' , iconText: 'AO'},
    ],
  },
  { name: 'Etats', icon: 'description', path: '/Reports',
    children: [
      { name: 'Gestion financière', icon: 'folder', path: '/FinancialsReports' , iconText: 'AP'},
      { name: 'Achats et Ventes', icon: 'folder', path: '/SalesPurchasingReports' , iconText: 'AQ'},
      { name: 'Partenaires', icon: 'folder', path: '/BusinessPartnersReports', iconText: 'AR' },
      { name: 'Opérations bancaires', icon: 'folder', path: '/BankingReports', iconText: 'AS' },
      { name: 'Gestion des stocks', icon: 'folder', path: '/StockManagementReports', iconText: 'AT' },
      { name: 'Ressources humaines', icon: 'folder', path: '/HumanResourcesReports', iconText: 'AU' },
    ],
  }

];
