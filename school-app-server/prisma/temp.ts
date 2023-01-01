/**generator client {
    provider        = "prisma-client-js"
    previewFeatures = ["interactiveTransactions"]
  }
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  model User {
    id                               Int       @id @default(autoincrement())
    firstName                        String    @db.VarChar(255)
    lastName                         String    @db.VarChar(255)
    eMail                            String    @unique @db.VarChar(255)
    phoneNumber                      String?   @db.VarChar(25)
    password                         String?   @db.VarChar(500)
    createdAt                        DateTime  @default(now())
    updatedAt                        DateTime  @updatedAt
    currentHashedRefreshToken        String?
    twoFactorAuthenticationSecret    String?
    isTwoFactorAuthenticationEnabled Boolean   @default(false)
    isEmailConfirmed                 Boolean   @default(false)
    isPhoneNumberConfirmed           Boolean   @default(false)
    avatarId                         Int?
    avatar                           File?     @relation(fields: [avatarId], references: [id])
    resetPasswordToken               String?   @unique() @db.VarChar(50)
    resetPasswordExpires             DateTime? @db.Timestamptz
    emailConfirmCodeSecret           String?
    isAdmin                          Boolean?  @default(false)
    isActive                         Boolean?  @default(true)
    company                          Company?  @relation(fields: [companyId], references: [id])
    companyId                        Int?
    hasAcceptedTerms                 Boolean?  @default(false)
    hasAcceptedPolicy                Boolean?  @default(false)
    acceptanceDate                   DateTime?
    offerRequestSupplierUser     OfferRequestSupplierUser[]
    vesselPortUser               VesselPortUser[]
    UserAuthEvents               UserAuthEvents[]
    NotificationEventWhoToNotify NotificationEvent[]        @relation("userToNotifyNotfs")
    NotificationEventWhoFired    NotificationEvent[]        @relation("userWhoFiredEventNotfs")
    @@map("user")
  }
  model UserAuthEvents {
    id              Int           @id @default(autoincrement())
    userId          Int
    user            User          @relation(fields: [userId], references: [id])
    eMail           String        @db.VarChar(255)
    remoteIPAddress String?       @db.VarChar(100)
    createdAt       DateTime      @default(now())
    authEventType   AuthEventType
    @@map("userAuthEvents")
  }
  enum AuthEventType {
    LogIn
    Refresh
    LogOut
    ChangePassword
  }
  model Company {
    id                   Int                    @id @default(autoincrement())
    name                 String                 @unique @db.VarChar(255)
    code                 String                 @db.VarChar(5)
    domainName           String                 @unique @db.VarChar(255)
    createdAt            DateTime               @default(now())
    updatedAt            DateTime               @updatedAt
    location             Location               @relation(fields: [locationId], references: [id])
    locationId           Int
    taxNo                String?                @unique @db.VarChar(12)
    isActive             Boolean?               @default(true)
    address              String?                @db.VarChar(511)
    postalCode           String?                @db.VarChar(10)
    mainRole             CompanyRoleType?
    hasLogo              Boolean?               @default(false)
    logoFileName         String?
    activeSubscId        Int?
    isLinersMandatory    Boolean?               @default(true)
    usersAnonymized      Boolean?               @default(false)
    OfferRequest         OfferRequest[]
    companyTransportType CompanyTransportType[]
    user                 User[]
    CompanyRole          CompanyRole[]
    OfferRequestSupplier OfferRequestSupplier[]
    SubscriptionCompany  SubscriptionCompany[]
    ShipmentDetail       ShipmentDetail[]
    OfferChatMessageFrom OfferChatMessage[]     @relation("fromCompanyMessages")
    OfferChatMessageTo   OfferChatMessage[]     @relation("toCompanyMessages")
    @@map("company")
  }
  model CompanyRole {
    id        Int             @id @default(autoincrement())
    company   Company         @relation(fields: [companyId], references: [id])
    companyId Int
    role      CompanyRoleType
    @@unique([companyId, role], name: "companyrole_uc1")
    @@map("companyRole")
  }
  model Location {
    id             Int          @id @default(autoincrement())
    code           String       @db.VarChar(5)
    name           String       @db.VarChar(255)
    type           LocationType
    createdAt      DateTime     @default(now())
    updatedAt      DateTime     @updatedAt
    parent         Location?    @relation("LocationToLocation", fields: [parentId], references: [id])
    parentId       Int?         @map("locationId")
    coordinates    String?      @db.VarChar(255)
    children       Location[]   @relation("LocationToLocation")
    country        String?      @db.VarChar(2)
    unlocode       String?      @db.VarChar(5)
    isFavorite     Boolean?
    isContTerminal Boolean?     @default(false)
    isActive       Boolean      @default(true)
    subDivision    String?      @db.VarChar(255)
    m49code       String?   @db.VarChar(5)
    iso3code      String?   @db.VarChar(5)
    region1Id     Int?
    region1       Location? @relation("Region1ForCountry", fields: [region1Id], references: [id])
    region2Id     Int?
    region2       Location? @relation("Region2ForCountry", fields: [region2Id], references: [id])
    telephoneCode String?   @db.VarChar(50)
    internetCode  String?   @db.VarChar(5)
    alternateText String?   @db.VarChar(100)
    Company Company[]
    ReceiptOfferRequest   OfferRequest[] @relation("receiptLocation")
    LoadingOfferRequest   OfferRequest[] @relation("loadingLocation")
    DischargeOfferRequest OfferRequest[] @relation("dischargeLocation")
    DeliveryOfferRequest  OfferRequest[] @relation("deliveryLocation")
    VesselPort      VesselPort[]
    LoadingOffer    Offer[]           @relation("loadingPort")
    DischargeOffer  Offer[]           @relation("dischargePort")
    DemoFirmRequest DemoFirmRequest[]
    RegisterCountry         RegisterForm[]            @relation("registerCountry")
    RegisterCity            RegisterForm[]            @relation("registerCity")
    ShipmentDetailPOD       ShipmentDetail[]          @relation("portOfLoading_location")
    ShipmentDetailPOL       ShipmentDetail[]          @relation("portOfDischarge_location")
    Region1ForCountry       Location[]                @relation("Region1ForCountry")
    Region2ForCountry       Location[]                @relation("Region2ForCountry")
    CompanyInterestLocation CompanyInterestLocation[]
    LocationSource LocationAutoUpdate?  @relation("LocationSource")
    LocationTarget LocationAutoUpdate[] @relation("LocationTarget")
    @@unique([code, type], name: "location_uc1")
    @@index([name, type])
    @@index([alternateText, type])
    @@map("location")
  }
  model CompanyTransportType {
    id                      Int                       @id @default(autoincrement())
    company                 Company                   @relation(fields: [companyId], references: [id])
    companyId               Int
    transportType           TransportType
    CompanyInterestLocation CompanyInterestLocation[]
    @@unique([transportType, companyId], name: "transport_company_uc1")
    @@map("companyTransportType")
  }
  model CompanyInterestLocation {
    id                     Int                  @id @default(autoincrement())
    location               Location             @relation(fields: [locationId], references: [id])
    locationId             Int
    companyTransportTypeId Int
    companyTransportType   CompanyTransportType @relation(fields: [companyTransportTypeId], references: [id])
    interestLoc            InterestLocType?
    @@unique([companyTransportTypeId, id], name: "transport_interestLoc_uc1")
    @@map("companyInterestLocation")
  }
  model LocationAutoUpdate {
    id        Int       @id @default(autoincrement())
    sourceLoc Location  @relation(fields: [sourceId], references: [id], "LocationSource") //source
    sourceId  Int
    targetLoc Location? @relation(fields: [targetId], references: [id], "LocationTarget") //target
    targetId  Int?
    repeated  String?   @db.VarChar(25)
    notes     String?   @db.VarChar(300)
    @@unique([sourceId])
    @@map("locationAutoUpdate")
  }
  model Supplier {
    id         Int          @id @default(autoincrement())
    name       String       @db.VarChar(255)
    domainName String       @db.VarChar(255)
    type       SupplierType
    createdAt  DateTime     @default(now())
    updatedAt  DateTime     @updatedAt
    @@map("supplier")
  }
  model Commodity {
    id          Int     @id @default(autoincrement())
    hsCode      String  @db.VarChar(50)
    description String? @db.VarChar(255)
    end         String? @db.VarChar(50)
    OfferRequestEquipment OfferRequestEquipment[]
    @@map("commodity")
  }
  model File {
    id   Int    @id @default(autoincrement())
    url  String
    key  String
    user User[]
    @@map("file")
  }
  model OfferRequest {
    id                 Int                    @id @default(autoincrement())
    offerNumber        String                 @unique @db.VarChar(10)
    company            Company                @relation(fields: [companyId], references: [id])
    companyId          Int
    placeOfReceipt     Location?              @relation("receiptLocation", fields: [placeOfReceiptId], references: [id])
    placeOfReceiptId   Int?
    portOfLoading      Location?              @relation("loadingLocation", fields: [portOfLoadingId], references: [id])
    portOfLoadingId    Int?
    portOfDischarge    Location?              @relation("dischargeLocation", fields: [portOfDischargeId], references: [id])
    portOfDischargeId  Int?
    placeOfDelivery    Location?              @relation("deliveryLocation", fields: [placeOfDeliveryId], references: [id])
    placeOfDeliveryId  Int?
    isPortStuffing     Boolean                @default(false)
    offerRequestStatus OfferRequestStatusType
    title              String?                @db.VarChar(100)
    shipmentTerm       ShipmentTerm?          @relation("shipmentTerm", fields: [shipmentTermId], references: [id])
    shipmentTermId     Int?
    offerReqState      OfferReqStateType?     @default(Draft)
    isRevised          Boolean                @default(false)
    createdUserId Int
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt
    offerRequestEquipment OfferRequestEquipment[]
    offerRequestSupplier  OfferRequestSupplier[]
    offerRequestService   OfferRequestService[]
    offerStatusHistory    OfferStatusHistory[]
    OfferReqTermItem     OfferReqTermItem[]
    offerReqStateHistory OfferReqStateHistory[]
    @@map("offerRequest")
  }
  model OfferRequestEquipment {
    id              Int           @id @default(autoincrement())
    offerRequest    OfferRequest  @relation(fields: [offerRequestId], references: [id])
    offerRequestId  Int
    equipment       Equipment     @relation(fields: [equipmentId], references: [id])
    equipmentId     Int
    frequencyType   FrequencyType
    amount          Int?
    commodity       Commodity?    @relation(fields: [commodityId], references: [id])
    commodityId     Int?
    createdUserId   Int?
    reeferMinDegree Decimal?      @db.Decimal(10, 2)
    reeferMaxDegree Decimal?      @db.Decimal(10, 2)
    oogHeight       Decimal?      @db.Decimal(10, 2)
    oogWidth        Decimal?      @db.Decimal(10, 2)
    oogLength       Decimal?      @db.Decimal(10, 2)
    oogType         OOGType?
    tonnage         Decimal?      @db.Decimal(10, 2)
    isDG            Boolean       @default(false)
    imo             Imo?          @relation(fields: [imoId], references: [id])
    imoId           Int?
    imoUnNo         String?       @db.VarChar(4)
    createdAt       DateTime      @default(now())
    updatedAt       DateTime      @updatedAt
    @@unique([offerRequestId, equipmentId], name: "orequipment_uc1")
    @@map("offerRequestEquipment")
  }
  model OfferRequestSupplier {
    id                 Int                   @id @default(autoincrement())
    offerRequest       OfferRequest          @relation(fields: [offerRequestId], references: [id])
    offerRequestId     Int
    company            Company               @relation(fields: [companyId], references: [id])
    companyId          Int
    createdUserId      Int
    createdAt          DateTime              @default(now())
    updatedAt          DateTime              @updatedAt
    offerStatus        OfferStatusType?
    onlinePlatformId   Int?
    onlinePlatform     OnlinePlatform?       @relation(fields: [onlinePlatformId], references: [id])
    onlinePlatformName String?               @db.VarChar(50)
    reminderMailSent   Boolean?              @default(false)
    supplierReqState   SupplierReqStateType?
    requestSentDate    DateTime?
    requestClosedDate  DateTime?
    isRejected         Boolean?              @default(false)
    rejectReason       String?               @db.VarChar(200)
    offerRequestSupplierUser OfferRequestSupplierUser[]
    Offer                    Offer[]
    OfferStatusHistory       OfferStatusHistory[]
    @@unique([offerRequestId, companyId, onlinePlatformName], name: "orsupplier_uc1")
    @@map("offerRequestSupplier")
  }
  model OfferRequestSupplierUser {
    id                     Int                  @id @default(autoincrement())
    offerRequestSupplier   OfferRequestSupplier @relation(fields: [offerRequestSupplierId], references: [id])
    offerRequestSupplierId Int
    userId                 Int
    user                   User                 @relation(fields: [userId], references: [id])
    createdUserId          Int
    createdAt              DateTime             @default(now())
    updatedAt              DateTime             @updatedAt
    @@unique([offerRequestSupplierId, userId], name: "orsupplieruser_uc1")
    @@map("offerRequestSupUser")
  }
  model OfferRequestService {
    id             Int          @id @default(autoincrement())
    offerRequest   OfferRequest @relation(fields: [offerRequestId], references: [id])
    offerRequestId Int
    service        Service      @relation(fields: [serviceId], references: [id])
    serviceId      Int
    paymentGroupNo Int          @default(1)
    createdUserId  Int
    createdAt      DateTime     @default(now())
    updatedAt      DateTime     @updatedAt
    @@unique([offerRequestId, serviceId], name: "orservice_uc1")
    @@map("offerRequestService")
  }
  model OfferReqTermItem {
    id                  Int          @id @default(autoincrement())
    offerRequest        OfferRequest @relation(fields: [offerRequestId], references: [id])
    offerRequestId      Int
    termId              Int
    term                Term         @relation(fields: [termId], references: [id])
    valueString         String?      @db.VarChar(1000)
    valueDate           DateTime?
    valueNumber         Int?
    additionalRequested Boolean?
    createdUserId       Int
    createdAt           DateTime     @default(now())
    updatedAt           DateTime     @updatedAt
    OfferTermItem OfferTermItem[]
    @@unique([offerRequestId, termId], name: "ortermItem_uc1")
    @@map("offerReqTermItem")
  }
  model Term {
    id            Int      @id
    name          String   @db.VarChar(50)
    term          TermType
    hasAdditional Boolean?
    OfferReqTermItem OfferReqTermItem[]
    @@map("term")
  }
  model OfferStatusHistory {
    id                   Int                     @id @default(autoincrement())
    offerRequestId       Int
    offerRequest         OfferRequest            @relation(fields: [offerRequestId], references: [id])
    offerReqSupplierId   Int?
    offerRequestSupplier OfferRequestSupplier?   @relation(fields: [offerReqSupplierId], references: [id])
    offerReqStatus       OfferRequestStatusType?
    offerStatus          OfferStatusType?
    status               String                  @db.VarChar(20)
    description          String?                 @db.VarChar(350)
    createdUserId        Int
    createdAt            DateTime                @default(now())
    updatedAt            DateTime                @updatedAt
    @@map("offerStatusHistory")
  }
  model OfferReqStateHistory {
    id             Int               @id @default(autoincrement())
    offerRequestId Int
    offerRequest   OfferRequest      @relation(fields: [offerRequestId], references: [id])
    offerReqState  OfferReqStateType
    createdUserId  Int
    createdAt      DateTime          @default(now())
    updatedAt      DateTime          @updatedAt
    @@map("offerReqStateHistory")
  }
  model OfferStateHistory {
    id            Int            @id @default(autoincrement())
    offerId       Int
    offer         Offer          @relation(fields: [offerId], references: [id])
    offerState    OfferStateType
    createdUserId Int
    createdAt     DateTime       @default(now())
    updatedAt     DateTime       @updatedAt
    @@map("offerStateHistory")
  }
  model Service {
    id                  Int                   @id @default(autoincrement())
    code                String                @db.VarChar(5)
    serviceType         ServiceType
    name                String                @db.VarChar(50)
    offerRequestService OfferRequestService[]
    serviceDist         ServiceDistType?
    OfferAmount         OfferAmount[]
    OfferAmountRevision OfferAmountRevision[]
    @@map("service")
  }
  model Equipment {
    id                    Int                     @id
    size                  Int
    type                  EquipmentType
    description           String                  @db.VarChar(50)
    offerRequestEquipment OfferRequestEquipment[]
    OfferAmount         OfferAmount[]
    OfferAmountRevision OfferAmountRevision[]
    @@map("equipment")
  }
  model Vessel {
    id            Int      @id @default(autoincrement())
    name          String   @unique @db.VarChar(50)
    dtoName       String?  @db.VarChar(50)
    vdoName       String?  @db.VarChar(50)
    notes         String?  @db.VarChar(50)
    imo           String   @unique @db.VarChar(8)
    isActive      Boolean  @default(false)
    createdUserId Int
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt
    VesselPort      VesselPort[]
    SWhipmentDetail ShipmentDetail[]
    @@map("vessel")
  }
  model Imo {
    id                    Int                     @id
    class                 String                  @db.VarChar(4)
    description           String                  @db.VarChar(200)
    OfferRequestEquipment OfferRequestEquipment[]
    @@map("imo")
  }
  model ShipmentTerm {
    id           Int            @id
    code         String         @db.VarChar(5)
    description  String         @db.VarChar(50)
    OfferRequest OfferRequest[] @relation("shipmentTerm")
    @@map("shipmentTerm")
  }
  model VesselPort {
    id             Int              @id @default(autoincrement())
    vessel         Vessel           @relation(fields: [vesselId], references: [id])
    vesselId       Int
    location       Location?        @relation(fields: [locationId], references: [id])
    locationId     Int?
    eta            DateTime
    ata            DateTime?
    atb            DateTime?
    atd            DateTime?
    stringEta      String?          @db.VarChar(100)
    createdUserId  Int?
    createdAt      DateTime?        @default(now())
    updatedAt      DateTime         @updatedAt
    ports          VesselPlanPorts?
    status         VesselPlanStatus
    vesselPortUser VesselPortUser[]
    isActive Boolean? @default(true)
    @@unique([vesselId, locationId, stringEta], name: "vsslporteta_uc1")
    @@map("vesselPort")
  }
  model Liner {
    id             Int              @id @default(autoincrement())
    code           String           @unique @db.VarChar(50)
    name           String           @db.VarChar(200)
    dtoName        String?          @db.VarChar(50)
    vdoName        String?          @db.VarChar(50)
    scacCode       String?          @db.VarChar(10)
    ranking        Int?
    teu            Int?
    ships          Int?
    siteLink       String?          @db.VarChar(200)
    twitterLink    String?          @db.VarChar(200)
    instagramLink  String?          @db.VarChar(250)
    linkedInLink   String?          @db.VarChar(400)
    facebookLink   String?          @db.VarChar(200)
    isActive       Boolean?         @default(true)
    logoUrl        String?          @db.VarChar(100)
    Offer          Offer[]
    ShipmentDetail ShipmentDetail[]
    OnlinePlatform OnlinePlatform[]
    @@map("liner")
  }
  model ShipmentDetail {
    id                  Int                @id @default(autoincrement())
    liner               Liner              @relation(fields: [linerId], references: [id])
    agency              Company?           @relation(fields: [companyId], references: [id])
    portOfLoading       Location?          @relation(name: "portOfLoading_location", fields: [portOfLoadingId], references: [id])
    portOfDischarge     Location?          @relation(name: "portOfDischarge_location", fields: [portOfDischargeId], references: [id])
    sailingDate         DateTime
    vessel              Vessel             @relation(fields: [vesselId], references: [id])
    teu20               Int
    teu40               Int
    teuTotal            Int
    shipmentDetailFile  ShipmentDetailFile @relation(fields: [shipmentDetailFileId], references: [id])
    portOfDischargeCode String?            @db.VarChar(30)
    portOfLoadingCode   String?            @db.VarChar(30)
    linerId              Int
    companyId            Int?
    portOfLoadingId      Int?
    portOfDischargeId    Int?
    vesselId             Int
    shipmentDetailFileId Int
    @@map("shipmentDetail")
  }
  model ShipmentDetailFile {
    id             Int                     @id @default(autoincrement())
    createdAt      DateTime                @default(now())
    fileName       String                  @unique @db.VarChar(50)
    fileType       ShipmentDetailFileType?
    createdUserId  Int?
    ShipmentDetail ShipmentDetail[]
    @@map("shipmentDetailFile")
  }
  model VesselNotFound {
    id            Int       @id @default(autoincrement())
    vesselName    String    @db.VarChar(40)
    createdUserId Int?
    createdAt     DateTime? @default(now())
    @@map("vesselNotFound")
  }
  model Offer {
    id                      Int                  @id @default(autoincrement())
    orderNo                 Int                  @default(1)
    requestSupplierId       Int
    requestSupplier         OfferRequestSupplier @relation(fields: [requestSupplierId], references: [id])
    portOfLoading           Location?            @relation("loadingPort", fields: [portOfLoadingId], references: [id])
    portOfLoadingId         Int?
    portOfDischarge         Location?            @relation("dischargePort", fields: [portOfDischargeId], references: [id])
    portOfDischargeId       Int?
    liner                   Liner?               @relation(fields: [linerId], references: [id])
    linerId                 Int?
    transitTime             Int?                 @db.SmallInt
    includeCharges          String?              @db.VarChar(2000)
    excludeCharges          String?              @db.VarChar(2000)
    otherTerms              String?              @db.VarChar(4000)
    isDirectService         Boolean?             @default(true)
    numberofTrsPort         Int?                 @db.SmallInt
    createdUserId           Int?
    createdAt               DateTime             @default(now())
    updatedAt               DateTime             @updatedAt
    referenceNumber         String?              @db.VarChar(150)
    offerValidity           DateTime?
    hasCustomerValidityTerm Boolean?             @default(false)
    offerState              OfferStateType?      @default(Draft)
    isRevised               Boolean?             @default(false)
    isApproved              Boolean?             @default(false)
    OfferClause OfferClause[]
    OfferAmount         OfferAmount[]
    OfferTermItem       OfferTermItem[]
    OfferStateHistory   OfferStateHistory[]
    OfferChatMessage    OfferChatMessage[]
    OfferAmountRevision OfferAmountRevision[]
    @@unique([requestSupplierId, orderNo], name: "offer_uc1")
    @@map("offer")
  }
  model OfferAmount {
    id          Int           @id @default(autoincrement())
    offerId     Int
    offer       Offer         @relation(fields: [offerId], references: [id])
    amount      Decimal?      @db.Decimal(10, 2)
    currency    CurrencyType?
    amountType  AmountType?
    equipmentId Int?
    equipment   Equipment?    @relation(fields: [equipmentId], references: [id])
    serviceId   Int
    service     Service       @relation(fields: [serviceId], references: [id])
    createdUserId Int?
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt
    @@unique([offerId, serviceId, equipmentId], name: "offerAmount_uc1")
    @@map("offerAmount")
  }
  model OfferAmountRevision {
    id            Int           @id @default(autoincrement())
    orderNo       Int           @default(1)
    operationType OperationType
    offerId       Int
    offer         Offer         @relation(fields: [offerId], references: [id])
    serviceId     Int
    service       Service       @relation(fields: [serviceId], references: [id])
    equipmentId   Int?
    equipment     Equipment?    @relation(fields: [equipmentId], references: [id])
    oldAmount     Decimal?      @db.Decimal(10, 2)
    oldCurrency   CurrencyType?
    newAmount     Decimal?      @db.Decimal(10, 2)
    newCurrency   CurrencyType?
    createdUserId Int?
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt
    @@unique([offerId, newAmount, newCurrency], name: "offerAmountRevision_uc1")
    @@map("offerAmountRevision")
  }
  enum OperationType {
    Insert
    Change
    Delete
  }
  model OfferClause {
    id            Int        @id @default(autoincrement())
    offerId       Int
    offer         Offer      @relation(fields: [offerId], references: [id])
    clauseType    ClauseType
    createdUserId Int?
    createdAt     DateTime   @default(now())
    updatedAt     DateTime   @updatedAt
    @@unique([offerId, clauseType], name: "offerClause_uc1")
    @@map("offerClause")
  }
  model OfferTermItem {
    id                 Int              @id @default(autoincrement())
    offerId            Int
    offer              Offer            @relation(fields: [offerId], references: [id])
    offerReqTermItemId Int
    offerReqTermItem   OfferReqTermItem @relation(fields: [offerReqTermItemId], references: [id])
    accepted           Boolean          @default(false)
    valueString        String?          @db.VarChar(1000)
    valueDate          DateTime?
    valueNumber        Int?
    additionalText     String?          @db.VarChar(500)
    createdUserId      Int?
    createdAt          DateTime         @default(now())
    updatedAt          DateTime         @updatedAt
    @@unique([offerId, offerReqTermItemId], name: "offerTermItem_uc1")
    @@map("offerTermItem")
  }
  model VesselPortUser {
    id           Int        @id @default(autoincrement())
    vesselPort   VesselPort @relation(fields: [vesselPortId], references: [id])
    vesselPortId Int
    userId       Int
    user         User       @relation(fields: [userId], references: [id])
    createdAt    DateTime?  @default(now())
    updatedAt    DateTime?  @updatedAt
    @@unique([vesselPortId, userId], name: "vslportuser_uc1")
    @@map("vesselPortUser")
  }
  model DemoFirmRequest {
    id            Int          @id @default(autoincrement())
    personName    String       @db.VarChar(255)
    personSurname String       @db.VarChar(255)
    personEmail   String       @db.VarChar(255)
    firmName      String       @db.VarChar(255)
    demoFirmType  DemoFirmType
    country       Location     @relation(fields: [locationId], references: [id])
    firmSize      String       @db.VarChar(255)
    locationId Int
    @@map("demoFirmRequest")
  }
  model DemoFirmReqTemp {
    id          Int      @id @default(autoincrement())
    personEmail String   @db.VarChar(255)
    isMailSent  Boolean? @default(false)
    lastMailSentDate DateTime?
    sentMailCount    Int?
    @@map("demoFirmReqTemp")
  }
  model RegisterForm {
    id            Int          @id @default(autoincrement())
    personName    String       @db.VarChar(255)
    personSurname String       @db.VarChar(255)
    personEmail   String       @db.VarChar(255)
    phoneNumber   String?      @db.VarChar(25)
    firmName      String       @db.VarChar(255)
    firmType      DemoFirmType
    address       String       @db.VarChar(511)
    postalCode    String       @db.VarChar(10)
    City          Location?    @relation("registerCity", fields: [cityId], references: [id])
    Country       Location?    @relation("registerCountry", fields: [countryId], references: [id])
    taxNo         String?      @db.VarChar(12)
    adConfirm     Boolean?     @default(false)
    termConfirm   Boolean?     @default(false)
    ipAddress String?  @db.VarChar(511)
    createdAt DateTime @default(now())
    countryId Int?
    cityId    Int?
    @@map("registerForm")
  }
  model SubscriptionType {
    id                  Int                   @id @default(autoincrement())
    name                String                @db.VarChar(40)
    unitPrice           Int
    SubscriptionCompany SubscriptionCompany[]
    @@map("subscriptionType")
  }
  model SubscriptionCompany {
    id               Int                   @id @default(autoincrement())
    subsNo           String?               @unique @db.VarChar(13)
    company          Company               @relation(fields: [companyId], references: [id])
    SubscriptionType SubscriptionType      @relation(fields: [subscriptionTypeId], references: [id])
    subsPeriod       SubsPeriodType
    recurrence       Int
    startDate        DateTime
    endDate          DateTime
    discount         SubscriptionDiscount? @relation(fields: [subscriptionDiscountId], references: [id])
    total            Decimal?
    isActive         Boolean               @default(true)
    createdAt        DateTime              @default(now())
    updatedAt        DateTime              @updatedAt
    subscriptionTypeId     Int
    companyId              Int
    subscriptionDiscountId Int?
    @@map("subscriptionCompany")
  }
  model SubscriptionDiscount {
    id                  Int                   @id @default(autoincrement())
    keyword             String                @db.VarChar(50)
    rate                Int
    isActive            Boolean               @default(true)
    SubscriptionCompany SubscriptionCompany[]
    @@map("subscriptionDiscount")
  }
  model ExchangeRate {
    id             Int          @id @default(autoincrement())
    date           Int
    sourceCurrency CurrencyType
    targetCurrency CurrencyType
    rate           Decimal      @db.Decimal(10, 4)
    createdAt      DateTime     @default(now())
    @@unique([sourceCurrency, targetCurrency, date], name: "exchangeRate_uc1")
    @@map("exchangeRate")
  }
  model OnlinePlatform {
    id                   Int                    @id
    name                 String                 @db.VarChar(50)
    offerRequestSupplier OfferRequestSupplier[]
    linerId              Int?
    liner                Liner?                 @relation(fields: [linerId], references: [id])
    @@map("onlinePlatform")
  }
  model NotificationEvent {
    id                Int          @id @default(autoincrement())
    createdAt         DateTime     @default(now())
    userToNotify      User         @relation(fields: [userId], references: [id], name: "userToNotifyNotfs")
    userId            Int
    userWhoFiredEvent User?        @relation(fields: [firedUserId], references: [id], name: "userWhoFiredEventNotfs")
    firedUserId       Int?
    type              Notification @relation(fields: [notificationId], references: [id])
    notificationId    Int
    valueText         String?      @db.VarChar(400) // text binding  
    valueId           Int? // related tablefk id 
    valueIdTableName  String?      @db.VarChar(30) //offerRequest  - id  i userId
    seen              Boolean      @default(false)
    @@map("notificationEvent")
  }
  model Notification {
    id    Int              @id
    type  NotificationType
    text  String           @db.VarChar(100)
    title String?          @db.VarChar(50)
    url   String?          @db.VarChar(50)
    NotificationEvent NotificationEvent[]
    @@map("notification")
  }
  model OfferChatMessage {
    id            Int     @id @default(autoincrement())
    offer         Offer   @relation(fields: [offerId], references: [id])
    offerId       Int
    content       String  @db.VarChar(500)
    fromCompany   Company @relation(fields: [fromCompanyId], references: [id], "fromCompanyMessages")
    fromCompanyId Int
    toCompany     Company @relation(fields: [toCompanyId], references: [id], "toCompanyMessages")
    toCompanyId   Int
    createdAt     DateTime @default(now())
    createdUserId Int
    @@map("offerChatMessage")
  }
  enum NotificationType {
    NewQuotation
    NewQuotationRequest
    QuotationRequestReminder
    QuotationRequestClosed
    VesselPlanChanged
    QuotationRequestDeclined
    QuotationRevised
  }
  enum SubsPeriodType {
    Yearly
    Monthly
  }
  enum CurrencyType {
    USD
    EUR
    GBP
    TL
    TRY
  }
  enum ServiceDistType {
    Cnt
    BL
    Doc
    Day
  }
  enum AmountType {
    AllIn
    Seperate
    Extra
  }
  enum OfferStatusType {
    New
    Draft
    Send
    Revised
    Closed
    Accepted
    Ready
  }
  enum ServiceType {
    Main
    Additional
    Extra
  }
  enum EquipmentType {
    Standart
    OpenTop
    Flat
    Reefer
  }
  enum FrequencyType {
    Spot
    Weekly
    Monthly
    Yearly
  }
  enum LocationType {
    Country
    Port
    Inland
    Continent
    Region1
    Region2
  }
  enum SupplierType {
    forwarder
    carrier
  }
  enum OfferRequestStatusType {
    Draft
    Send
    Revised
    Receipt
    Canceled
    Closed
  }
  enum OfferReqStateType {
    Draft
    Sent
    Closed
  }
  enum SupplierReqStateType {
    Waiting
    Done
  }
  enum OfferStateType {
    Draft
    Sent
    Ready
  }
  enum TermType {
    String
    Number
    Date
  }
  enum CompanyRoleType {
    Shipper
    FreightForwarder
    Agency
    Admin
  }
  enum CompanyMainRoleType {
    RateRequester
    QuotationSupplier
  }
  enum VesselPlanStatus {
    VesselSailing
    VesselBerthed
    VesselDeparted
    VesselArrived
    Cancelled
  }
  enum OOGType {
    OutOfGauge
    InGauge
    Unknown
  }
  enum ClauseType {
    SpaceAvailibility
    EquipmentAvailibility
    BAFIncrease
    CAFIncrease
    GRI
    OutOfGauge
    InGauge
    Hazardaus
    NonHazardous
  }
  enum VesselPlanPorts {
    TREGE
    TRNEM
    TRAPM
    TRIZM
  }
  enum DemoFirmType {
    CargoInterest
    PLAgent3
    OceanCarrier
    FreightForwarder
    TSINVOCC
    RailOperator
    TruckOperator
    BargeOperator
    FeederOperator
    TerminalOperator
    DepotOperator
    DataAggregator
    CertificateIssuer
    CustomsAuthority
    PortAuthority
    FinancialInstitution
  }
  enum ShipmentDetailFileType {
    Import
    Export
  }
  enum InterestLocType {
    ImportCountry
    ExportCountry
    ExportRegion
    ImportRegion
  }
  enum TransportType {
    Sea
    Land
    Air
    Rail
  } */
