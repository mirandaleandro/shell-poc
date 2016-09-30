webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../typings/index.d.ts"/>
	"use strict";
	var angular = __webpack_require__(2);
	var appSettings = __webpack_require__(759);
	var Contacts = __webpack_require__(763);
	var SalesOpportunities = __webpack_require__(771);
	var SalesActivities = __webpack_require__(788);
	var Trades = __webpack_require__(800);
	var CustomerCampaigns = __webpack_require__(810);
	var IndividualRefDefs = __webpack_require__(815);
	var LoyaltySummary = __webpack_require__(817);
	var Vehicles = __webpack_require__(819);
	var csiEvents = __webpack_require__(822);
	var Connections = __webpack_require__(831);
	var Franchises = __webpack_require__(834);
	var CustomerService = __webpack_require__(837);
	var Dealership = __webpack_require__(839);
	var LastTwenty = __webpack_require__(841);
	var Duplicates = __webpack_require__(843);
	var Permissions = __webpack_require__(846);
	var MyTasks = __webpack_require__(849);
	var MyOpportunities = __webpack_require__(852);
	var FilterProperties = __webpack_require__(855);
	var Username = __webpack_require__(858);
	var LastContact = __webpack_require__(859);
	var EmployeeNames = __webpack_require__(862);
	var CustomerSurveys = __webpack_require__(864);
	var Log = __webpack_require__(866);
	var SalesOpportunityRefDefs = __webpack_require__(867);
	var SocialMedia = __webpack_require__(869);
	var SSN = __webpack_require__(871);
	var RefDefs = __webpack_require__(873);
	var EmployeeDashboardFilterDropdowns = __webpack_require__(877);
	var VehicleOfInterest = __webpack_require__(881);
	var DuplicateIndividual = __webpack_require__(886);
	var AuditLogs = __webpack_require__(888);
	var SalesAuditLogs = __webpack_require__(890);
	var PostalCodeLookup = __webpack_require__(892);
	var CreditApplication = __webpack_require__(895);
	var SalesSurveys = __webpack_require__(897);
	var SalesChecklist = __webpack_require__(900);
	var CsiAuditLogs = __webpack_require__(904);
	var ConvertOpportunityType = __webpack_require__(906);
	var PrintForms = __webpack_require__(910);
	var ServiceEvents = __webpack_require__(912);
	var PullCreditReport = __webpack_require__(915);
	module.exports = angular.module("mock.data", ["ngMockE2E"])
	    .run(['$httpBackend',
	    function ($httpBackend, $q) {
	        var mockDataModules = [
	            new Contacts(),
	            new SalesOpportunities(),
	            new SalesActivities(),
	            new Trades(),
	            new Vehicles(),
	            new CustomerCampaigns(),
	            new IndividualRefDefs(),
	            new LoyaltySummary(),
	            new csiEvents(),
	            new Connections(),
	            new Franchises(),
	            new Vehicles(),
	            new Connections(),
	            new CustomerService(),
	            new Dealership(),
	            new LastTwenty(),
	            new Permissions(),
	            new MyTasks(),
	            new MyOpportunities(),
	            new FilterProperties(),
	            new Duplicates(),
	            new Username(),
	            new LastContact(),
	            new EmployeeNames(),
	            new CustomerSurveys(),
	            new Log(),
	            new SalesOpportunityRefDefs(),
	            new EmployeeDashboardFilterDropdowns(),
	            new SocialMedia(),
	            new SSN(),
	            new RefDefs(),
	            new VehicleOfInterest(),
	            new DuplicateIndividual(),
	            new AuditLogs(),
	            new SalesAuditLogs(),
	            new SalesSurveys(),
	            new SalesChecklist(),
	            new PostalCodeLookup(),
	            new CreditApplication(),
	            new CsiAuditLogs(),
	            new ConvertOpportunityType(),
	            new PrintForms(),
	            new ServiceEvents(),
	            new PullCreditReport()
	        ];
	        var shimBaseUrl = appSettings.proxyUrl;
	        var apiBaseUrl = appSettings.globalApiUrl;
	        var shimBaseUrlRegex = new RegExp(escapeRegExp(shimBaseUrl));
	        var apiBaseUrlRegex = new RegExp(escapeRegExp(apiBaseUrl));
	        angular.forEach(mockDataModules, function (mockDataModule) {
	            if (!mockDataModule.registerHandlers)
	                return;
	            mockDataModule.registerHandlers($httpBackend, shimBaseUrl, shimBaseUrlRegex, $q, apiBaseUrlRegex);
	        });
	        $httpBackend.whenGET(/.*\.html$/).passThrough();
	        function escapeRegExp(str) {
	            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	        }
	    }]);


/***/ },

/***/ 763:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../../typings/index.d.ts"/>
	"use strict";
	var SeededNumberGeneratorFactory = __webpack_require__(764);
	var imageServerUrl = 'http://localhost:8004';
	var contacts = (function () {
	    function contacts() {
	        this.companiesList = __webpack_require__(765);
	        this.contactsList = __webpack_require__(766);
	        this.contactSummaryJson = __webpack_require__(767);
	        this.temporaryContact = angular.copy(this.contactsList);
	        this.temporaryApiContact = __webpack_require__(768);
	        this.contactHistory = __webpack_require__(769);
	        this.individual = __webpack_require__(768);
	        this.company = __webpack_require__(770);
	    }
	    contacts.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        // /shim/Contact(12345)
	        var peopleEndpoint = /\/shim\/Contacts\((\d+)\)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + peopleEndpoint.source)).respond(function (method, url, data, headers) {
	            var id = null;
	            var matches = peopleEndpoint.exec(url);
	            if (matches && matches.length > 1) {
	                try {
	                    id = parseInt(matches[1]);
	                }
	                catch (e) {
	                }
	                if (!id)
	                    return [400];
	                if (matches[1] == "777") {
	                    return [404, { Error: 'error' }];
	                }
	                if (matches[1].length > 8 && matches[1].length <= 10) {
	                    return [200, _this.getCompanyById(id)];
	                }
	                else if (matches[1].length < 4) {
	                    return [200, _this.getPeopleByIdWithPictures(id)];
	                }
	                else if (matches[1].length > 10) {
	                    return [200, _this.getCompanyByIdWithPictures(id)];
	                }
	                return [200, _this.getPeopleById(id)];
	            }
	        });
	        // We emulate a delete by deleting an entity with an ID of 5 to 8 characters, and then checking the note of the next viewed contact to have a custom message.
	        var deleteEndpoint = /\/shim\/Contacts\/(\d+)/i;
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + deleteEndpoint.source)).respond(function (method, url, data, headers) {
	            _this.temporaryApiContact.Note = "Last contact was deleted all sneaky-beaky-like...";
	            return [200];
	        });
	        // /shim/PeopleRefDefs
	        $httpBackend.whenGET(shimBaseUrl + '/shim/PeopleRefDefs').respond(this.contactsList.peopleRefDefs);
	        // /shim/getSubtypeRefList?&siteId=3&typeId=305
	        var subTypeRefListEndpoint = /\/shim\/getSubtypeRefList\?&siteId=(\d+)&typeId=(\d+)/i; // TODO: remove the '&' in front of siteId once it gets fixed in the app
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + subTypeRefListEndpoint.source)).respond(function (method, url, data, headers) {
	            var siteId = null;
	            var typeId = null;
	            var matches = subTypeRefListEndpoint.exec(url);
	            if (matches && matches.length >= 2 && matches[1]) {
	                try {
	                    siteId = parseInt(matches[1]);
	                }
	                catch (e) {
	                }
	            }
	            if (matches && matches.length >= 3 && matches[2]) {
	                try {
	                    typeId = parseInt(matches[2]);
	                }
	                catch (e) {
	                }
	            }
	            if (!siteId || !typeId)
	                return [400];
	            // siteId and typeId are not being used, the same data will be returned for all siteIds & typeIds
	            return [200, _this.contactsList.subTypeRefList];
	        });
	        var ExternalReferencesSaveEndpoint = /\/shim\/ExternalReferences\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + ExternalReferencesSaveEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200];
	        });
	        var communicationSummaryEndpoint = /\/shim\/contact\/communicationSummary\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + communicationSummaryEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, 'https:\/\/local.dealersocket.com\/DealerSocket.Web\/CommPrefs\/CommunicationSummary?si=CqO2tk7OXO4%3D&en=CqO2tk7OXO4%3D&ed=iHWLw56vmnY%3D'];
	        });
	        var contactSummaryEndpoint = /\/shim\/ContactSummary\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + contactSummaryEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, _this.contactSummaryJson];
	        });
	        var getContactAndUpdateHistoryEndpoint = /\/contact\/(\d+)\?updateHistory=[false,true]/i;
	        $httpBackend.whenGET(getContactAndUpdateHistoryEndpoint).respond(function (method, url, data, headers) {
	            var id = null;
	            var matches = getContactAndUpdateHistoryEndpoint.exec(url);
	            if (matches && matches.length > 1) {
	                try {
	                    id = parseInt(matches[1]);
	                }
	                catch (e) {
	                }
	                if (!id)
	                    return [400];
	                if (matches[1] == "777") {
	                    return [404, { Error: 'error' }];
	                }
	                if (matches[1].length > 8 && matches[1].length <= 10) {
	                    return [200, _this.getCompanyByIdForApi(id)];
	                }
	                else if (matches[1].length < 4) {
	                    return [200, _this.getPeopleByIdWithPicturesForApi(id)];
	                }
	                else if (matches[1].length > 10) {
	                    return [200, _this.getCompanyByIdWithPicturesForApi(id)];
	                }
	                return [200, _this.getPeopleByIdForApi(id)];
	            }
	        });
	        var updateHistoryEndpoint = /\/contact\/\d+\/updateHistory/i;
	        $httpBackend.whenPOST(updateHistoryEndpoint).respond(function (method, url, data, headers) {
	            return [200];
	        });
	        var getHistoryEndpoint = /\/contact\/history/i;
	        $httpBackend.whenGET(getHistoryEndpoint).respond(function (method, url, data, headers) {
	            if (url.indexOf('$top=1') > -1) {
	                // last contact logic
	                var id = _this.temporaryApiContact.ContactId;
	                return [200, _this.getPeopleByIdForApi(id)];
	            }
	            return [200, _this.contactHistory];
	        });
	    };
	    // Adding this to handle the delete customer scenario.
	    contacts.prototype.getPeopleById = function (id) {
	        var responseData = this.temporaryContact.baseContact;
	        this.temporaryContact = angular.copy(this.contactsList);
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/contacts.getPeopleById was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        responseData.Id = id.toString();
	        responseData.Name.First = this.contactsList.availableFirstNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableFirstNames.length)];
	        responseData.Name.Last = this.contactsList.availableLastNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableLastNames.length)];
	        return responseData;
	    };
	    contacts.prototype.getPeopleByIdForApi = function (id) {
	        var responseData = this.temporaryApiContact;
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/contacts.getPeopleById was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        responseData.ContactId = id;
	        responseData.FirstName = this.contactsList.availableFirstNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableFirstNames.length)];
	        responseData.LastName = this.contactsList.availableLastNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableLastNames.length)];
	        return responseData;
	    };
	    contacts.prototype.getPeopleByIdWithPictures = function (id) {
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/contacts.getPeopleById was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        var imgUrl = imageServerUrl + '/images/contact.jpg';
	        var contact = angular.copy(this.contactsList.baseContact);
	        contact.Id = id.toString();
	        contact.Name.First = this.contactsList.availableFirstNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableFirstNames.length)];
	        contact.Name.Last = this.contactsList.availableLastNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableLastNames.length)];
	        contact.ImgUrl = imgUrl;
	        return contact;
	    };
	    contacts.prototype.getPeopleByIdWithPicturesForApi = function (id) {
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/contacts.getPeopleById was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        var imgId = 123;
	        var contact = angular.copy(this.individual);
	        contact.ContactId = id;
	        contact.FirstName = this.contactsList.availableFirstNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableFirstNames.length)];
	        contact.LastName = this.contactsList.availableLastNames[seededNumberGenerator.generateSeededNumber(0, this.contactsList.availableLastNames.length)];
	        contact.ImageFileId = imgId;
	        return contact;
	    };
	    contacts.prototype.getCompanyById = function (id) {
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/companies.getPeopleById was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        var company = angular.copy(this.companiesList.baseCompany);
	        company.Id = id.toString();
	        company.Name = this.companiesList.availableNames[seededNumberGenerator.generateSeededNumber(0, this.companiesList.availableNames.length)];
	        return company;
	    };
	    contacts.prototype.getCompanyByIdForApi = function (id) {
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/companies.getCompanyByIdForApi was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        var company = angular.copy(this.company);
	        company.ContactId = id;
	        company.CompanyName = this.companiesList.availableNames[seededNumberGenerator.generateSeededNumber(0, this.companiesList.availableNames.length)];
	        return company;
	    };
	    contacts.prototype.getCompanyByIdWithPictures = function (id) {
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/companies.getPeopleById was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        var imgUrl = imageServerUrl + '/images/company.png';
	        var company = angular.copy(this.companiesList.baseCompany);
	        company.Id = id.toString();
	        company.CompanyName = this.companiesList.availableNames[seededNumberGenerator.generateSeededNumber(0, this.companiesList.availableNames.length)];
	        company.ImgUrl = imgUrl;
	        return company;
	    };
	    contacts.prototype.getCompanyByIdWithPicturesForApi = function (id) {
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/companies.getCompanyByIdWithPicturesForApi was called without a valid id!');
	        var seededNumberGenerator = new SeededNumberGeneratorFactory(id);
	        var imgId = 123;
	        var company = angular.copy(this.company);
	        company.ContactId = id;
	        company.CompanyName = this.companiesList.availableNames[seededNumberGenerator.generateSeededNumber(0, this.companiesList.availableNames.length)];
	        company.ImageFileId = imgId;
	        return company;
	    };
	    return contacts;
	}());
	module.exports = contacts;


/***/ },

/***/ 764:
/***/ function(module, exports) {

	"use strict";
	var SeededNumberGeneratorFactory = (function () {
	    function SeededNumberGeneratorFactory(seed) {
	        this.seed = seed;
	    }
	    SeededNumberGeneratorFactory.prototype.generateSeededNumber = function (min, max) {
	        min = min || 0;
	        max = max || 1;
	        this.seed = (this.seed * 9301 + 49297) % 233280;
	        var rnd = this.seed / 233280;
	        return Math.round(min + rnd * (max - min));
	    };
	    return SeededNumberGeneratorFactory;
	}());
	module.exports = SeededNumberGeneratorFactory;
	// Usage:
	//var seededNumberGeneratorA = seededNumberGeneratorFactory(111);
	//var num1 = seededNumberGeneratorA.generateSeededNumber(0, 1000); // always 637
	//var num2 = seededNumberGeneratorA.generateSeededNumber(0, 1000); // always 495
	//
	//var seededNumberGeneratorB = seededNumberGeneratorFactory(222);
	//var num3 = seededNumberGeneratorB.generateSeededNumber(0, 1000); // always 63
	//var num4 = seededNumberGeneratorB.generateSeededNumber(0, 1000); // always 281
	//
	//var seededNumberGeneratorC = seededNumberGeneratorFactory(111);
	//var num5 = seededNumberGeneratorC.generateSeededNumber(0, 1000); // always 637
	//var num6 = seededNumberGeneratorC.generateSeededNumber(0, 1000); // always 495


/***/ },

/***/ 765:
/***/ function(module, exports) {

	module.exports = {
		"baseCompany": {
			"Id": "",
			"SiteId": 154,
			"Address": {
				"$type": "Address",
				"Address1": "1234 Dreary Lane",
				"Address2": "2345 Mulberry Street",
				"Address3": "",
				"City": "Sandy",
				"State": "UT",
				"PostalCode": "84060",
				"County": "Salt Lake",
				"Country": "USA",
				"isComplete": false
			},
			"Email": [
				{
					"$type": "Email",
					"Type": "Personal",
					"Address": "testEmail@emaill.com",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": {
					"UserName": "FacebookUser"
				},
				"Twitter": "Tweet",
				"LinkedIn": null
			},
			"Note": "This is a special note",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": {
				"value": "1001",
				"text": "Walk In"
			},
			"Status": {
				"value": "328",
				"text": "Active"
			},
			"ContactType": {
				"value": "1000",
				"text": "Prospect"
			},
			"ContactSubtype": {
				"value": "700",
				"text": "Hot (1-3 weeks)"
			},
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"$type": "Organization",
			"Name": "",
			"PrimaryContact": {
				"First": "First",
				"Friendly": "",
				"Middle": "Middle",
				"Last": "Last"
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Main": {
					"$type": "Phone",
					"Number": "1(231) 231-2312",
					"Extension": null,
					"Preferred": false
				},
				"TollFree": {
					"$type": "Phone",
					"Number": "1(231) 231-2312",
					"Extension": null,
					"Preferred": false
				},
				"Fax": null
			},
			"Website": "www.thiscompanyrox.com",
			"ExternalRefIds": []
		},
		"availableNames": [
			"Maxine",
			"Kelsey",
			"Eden",
			"Daryl",
			"Daryl",
			"Lane",
			"Callum",
			"Delilah",
			"Stone",
			"Christine",
			"Tobias",
			"Justin",
			"Julian",
			"Amery",
			"Colby",
			"Macaulay",
			"Mark",
			"Amal",
			"Evan",
			"Dane",
			"McKenzie",
			"Zorita",
			"Laith",
			"May",
			"Garth",
			"Nora",
			"Octavius",
			"Karyn",
			"Britanney",
			"Preston",
			"Jaquelyn",
			"Kai",
			"Wendy",
			"Nina",
			"Kasimir",
			"Naomi",
			"Ciara",
			"Imogene",
			"Jolene",
			"Daria",
			"Chaney",
			"Fritz",
			"Kim",
			"Sandra",
			"Fallon",
			"Belle",
			"Anastasia",
			"Risa",
			"Valentine",
			"Christine",
			"Dante",
			"MacKenzie",
			"Blaze",
			"Nehru",
			"Zachary",
			"Raymond",
			"Baker",
			"Aretha",
			"Liberty",
			"Wanda",
			"Scott",
			"Libby",
			"Eleanor",
			"Denton",
			"Ori",
			"Haley",
			"Kenneth",
			"Louis",
			"Aileen",
			"Jakeem",
			"Wesley",
			"Rafael",
			"Aphrodite",
			"Kennan",
			"Scarlet",
			"Brody",
			"Hedda",
			"Hop",
			"Iliana",
			"Freya",
			"Quentin",
			"Fletcher",
			"Conan",
			"Suki",
			"Cole",
			"Asher",
			"Rina",
			"Quynn",
			"Wayne",
			"Jeremy",
			"Eden",
			"Dexter",
			"Flynn",
			"Christen",
			"Rana",
			"Lillith",
			"Lance",
			"Dana",
			"Jesse",
			"Nomlanga"
		]
	};

/***/ },

/***/ 766:
/***/ function(module, exports) {

	module.exports = {
		"baseContact": {
			"Id": "",
			"SiteId": 154,
			"Address": {
				"$type": "Address",
				"Address1": "263 Main St.",
				"Address2": "",
				"Address3": "",
				"City": "Anchorage",
				"State": "",
				"PostalCode": "30011",
				"County": "",
				"Country": "USA",
				"isComplete": false
			},
			"Email": [
				{
					"$type": "Email",
					"Address": "generaladdress@tester.com",
					"Type": "Personal",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "Test note",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "",
				"Middle": "",
				"Last": "",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": {
					"value": "",
					"text": ""
				},
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": {
					"$type": "Phone",
					"Number": "(555) 123-4567",
					"Extension": null,
					"Preferred": false
				},
				"Work": {
					"$type": "Phone",
					"Number": "(666) 234-4567",
					"Extension": null,
					"Preferred": false
				},
				"Mobile": null,
				"Fax": null,
				"Other": null
			},
			"Birthday": "",
			"Gender": "Male",
			"DriversLicense": "",
			"ImgUrl": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": {
				"value": "140",
				"text": "English"
			},
			"ContactType": {
				"value": "305",
				"text": "Prospect"
			},
			"ContactSubtype": {
				"value": "695",
				"text": "Hot (1-3 Weeks)"
			},
			"Source": {
				"value": "1001",
				"text": "Walk In"
			},
			"Status": {
				"value": "328",
				"text": "Active"
			},
			"NeverContactVia": {
				"value": "314",
				"text": ""
			},
			"Income": {
				"value": "109",
				"text": "Blank"
			},
			"HasSSN": false,
			"HasPings": true
		},
		"peopleRefDefs": {
			"Prefix": [
				{
					"value": "101",
					"text": "Mr."
				},
				{
					"value": "102",
					"text": "Ms."
				},
				{
					"value": "103",
					"text": "Mrs."
				},
				{
					"value": "104",
					"text": "Dr."
				},
				{
					"value": "1004063",
					"text": "Dude"
				}
			],
			"PreferredLanguage": [
				{
					"value": "140",
					"text": "English"
				},
				{
					"value": "141",
					"text": "Spanish"
				},
				{
					"value": "142",
					"text": "French"
				},
				{
					"value": "143",
					"text": "German"
				},
				{
					"value": "144",
					"text": "Russian"
				},
				{
					"value": "145",
					"text": "Japanese"
				},
				{
					"value": "146",
					"text": "Mandarin"
				},
				{
					"value": "147",
					"text": "Korean"
				},
				{
					"value": "148",
					"text": "Portuguese"
				}
			],
			"ContactType": [
				{
					"value": "305",
					"text": "Prospect"
				},
				{
					"value": "306",
					"text": "Customer"
				},
				{
					"value": "307",
					"text": "Employee"
				},
				{
					"value": "308",
					"text": "Vendor"
				},
				{
					"value": "309",
					"text": "Partner"
				},
				{
					"value": "250771",
					"text": "Fleet / Commercial"
				},
				{
					"value": "250014",
					"text": "Good Egg"
				},
				{
					"value": "1003015",
					"text": "ISP"
				}
			],
			"Source": [
				{
					"value": "1001",
					"text": "Walk In"
				},
				{
					"value": "1002",
					"text": "Web"
				},
				{
					"value": "1003",
					"text": "General Referral"
				},
				{
					"value": "1004",
					"text": "Sales Floor Referral"
				},
				{
					"value": "1005",
					"text": "Service Referral"
				},
				{
					"value": "1011",
					"text": "Contact Referral"
				},
				{
					"value": "1007",
					"text": "Dealer Mgmt Sys"
				},
				{
					"value": "1008",
					"text": "List Import"
				},
				{
					"value": "1009",
					"text": "Manufacturer"
				},
				{
					"value": "1010",
					"text": "Phone"
				},
				{
					"value": "250202",
					"text": "Radio"
				},
				{
					"value": "250203",
					"text": "TV"
				},
				{
					"value": "250204",
					"text": "Print"
				},
				{
					"value": "1002923",
					"text": "CoBuyer"
				},
				{
					"value": "1004612",
					"text": "Massey Buying Vehicle"
				},
				{
					"value": "1004637",
					"text": "Spellens Refferal"
				}
			],
			"Status": [
				{
					"value": "328",
					"text": "Active"
				},
				{
					"value": "330",
					"text": "Cancelled"
				}
			],
			"NeverContactVia": [
				{
					"value": "314",
					"text": ""
				},
				{
					"value": "315",
					"text": "Email"
				},
				{
					"value": "316",
					"text": "Home Phone"
				},
				{
					"value": "317",
					"text": "Work Phone"
				},
				{
					"value": "318",
					"text": "Mobile Number"
				},
				{
					"value": "219",
					"text": "Don't Contact (Internal)"
				},
				{
					"value": "319",
					"text": "Text Message"
				},
				{
					"value": "4004",
					"text": "Written Permission (Internal)"
				},
				{
					"value": "4000",
					"text": "DNC List - Don't Contact"
				},
				{
					"value": "4001",
					"text": "DNC List - Current Customer"
				},
				{
					"value": "4002",
					"text": "DNC List - Current Prospect"
				},
				{
					"value": "4003",
					"text": "DNC List - Written Permission"
				}
			],
			"Income": [
				{
					"value": "109",
					"text": "Blank"
				},
				{
					"value": "110",
					"text": "10,000-20,000"
				},
				{
					"value": "111",
					"text": "21,000-50,000"
				},
				{
					"value": "112",
					"text": "51,000-100,000"
				},
				{
					"value": "113",
					"text": "101,000-200,000"
				},
				{
					"value": "114",
					"text": "201,000 - over"
				}
			]
		},
		"subTypeRefList": [
			{
				"value": 695,
				"text": "Hot (1-3 Weeks)"
			},
			{
				"value": 696,
				"text": "Medium (4-6 Weeks)"
			},
			{
				"value": 697,
				"text": "Cold (3-6 Months)"
			},
			{
				"value": 1004055,
				"text": "Audi Silver"
			},
			{
				"value": 1004056,
				"text": "Audi Gold"
			},
			{
				"value": 1004057,
				"text": "Audi Bronze"
			}
		],
		"availableFirstNames": [
			"Maxine",
			"Kelsey",
			"Eden",
			"Daryl",
			"Daryl",
			"Lane",
			"Callum",
			"Delilah",
			"Stone",
			"Christine",
			"Tobias",
			"Justin",
			"Julian",
			"Amery",
			"Colby",
			"Macaulay",
			"Mark",
			"Amal",
			"Evan",
			"Dane",
			"McKenzie",
			"Zorita",
			"Laith",
			"May",
			"Garth",
			"Nora",
			"Octavius",
			"Karyn",
			"Britanney",
			"Preston",
			"Jaquelyn",
			"Kai",
			"Wendy",
			"Nina",
			"Kasimir",
			"Naomi",
			"Ciara",
			"Imogene",
			"Jolene",
			"Daria",
			"Chaney",
			"Fritz",
			"Kim",
			"Sandra",
			"Fallon",
			"Belle",
			"Anastasia",
			"Risa",
			"Valentine",
			"Christine",
			"Dante",
			"MacKenzie",
			"Blaze",
			"Nehru",
			"Zachary",
			"Raymond",
			"Baker",
			"Aretha",
			"Liberty",
			"Wanda",
			"Scott",
			"Libby",
			"Eleanor",
			"Denton",
			"Ori",
			"Haley",
			"Kenneth",
			"Louis",
			"Aileen",
			"Jakeem",
			"Wesley",
			"Rafael",
			"Aphrodite",
			"Kennan",
			"Scarlet",
			"Brody",
			"Hedda",
			"Hop",
			"Iliana",
			"Freya",
			"Quentin",
			"Fletcher",
			"Conan",
			"Suki",
			"Cole",
			"Asher",
			"Rina",
			"Quynn",
			"Wayne",
			"Jeremy",
			"Eden",
			"Dexter",
			"Flynn",
			"Christen",
			"Rana",
			"Lillith",
			"Lance",
			"Dana",
			"Jesse",
			"Nomlanga"
		],
		"availableLastNames": [
			"Abbott",
			"Chambers",
			"Woodard",
			"Cline",
			"Mcgee",
			"Levy",
			"Stafford",
			"Medina",
			"Barr",
			"Wilcox",
			"Lowe",
			"Langley",
			"Ramos",
			"Fitzgerald",
			"Torres",
			"Wiley",
			"Lang",
			"Johnston",
			"Slater",
			"Alford",
			"Bird",
			"Morse",
			"Harrell",
			"Irwin",
			"Joyner",
			"Grimes",
			"Delacruz",
			"Morin",
			"Bishop",
			"Levine",
			"Russell",
			"Rowe",
			"George",
			"Erickson",
			"Gallagher",
			"Rice",
			"Cunningham",
			"Rasmussen",
			"Rosa",
			"Craft",
			"Gardner",
			"Herring",
			"Blair",
			"Bennett",
			"Wheeler",
			"Gallagher",
			"Melendez",
			"Luna",
			"Chaney",
			"Sims",
			"Rush",
			"Levy",
			"Peters",
			"Anderson",
			"Harrison",
			"Bartlett",
			"Carroll",
			"Fuentes",
			"Schwartz",
			"Fowler",
			"Duran",
			"Castillo",
			"Ford",
			"Short",
			"Levine",
			"Lucas",
			"Soto",
			"Willis",
			"Villarreal",
			"Fry",
			"Stout",
			"Valentine",
			"Fischer",
			"Wood",
			"Stevenson",
			"Carroll",
			"Roman",
			"Montoya",
			"Ferrell",
			"Griffith",
			"Calderon",
			"Fletcher",
			"Stanley",
			"Hatfield",
			"Alexander",
			"Acosta",
			"Glass",
			"Donovan",
			"Haney",
			"Berger",
			"Byers",
			"Tanner",
			"Richards",
			"Collier",
			"Morton",
			"Banks",
			"Martin",
			"Stanley",
			"Lynch",
			"Vaughan"
		]
	};

/***/ },

/***/ 767:
/***/ function(module, exports) {

	module.exports = [
		{
			"Id": "1264439",
			"Name": {
				"$type": "PersonName",
				"First": "Test",
				"Middle": "",
				"Last": "Tester",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": null,
				"Suffix": ""
			},
			"Address": {
				"$type": "Address",
				"Address1": "12456 Test Lane",
				"Address2": "",
				"Address3": "",
				"City": "Youngstown",
				"State": "FL",
				"PostalCode": "",
				"County": "",
				"Country": "",
				"isComplete": false
			},
			"Email": [
				{
					"$type": "Email",
					"Type": "Personal",
					"Address": "testtester@testing.not",
					"Preferred": false
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": null,
			"Status": null,
			"ContactType": null,
			"ContactSubtype": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"GmInfo": {
				"GmState": null,
				"SurrogateId": null
			},
			"HasPings": false,
			"$type": "Person",
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": {
					"$type": "Phone",
					"Number": "(123) 456-7890",
					"Extension": null,
					"Preferred": false
				},
				"Work": {
					"$type": "Phone",
					"Number": "(234) 567-8909",
					"Extension": null,
					"Preferred": false
				},
				"Mobile": {
					"$type": "Phone",
					"Number": "(345) 678-9098",
					"Extension": null,
					"Preferred": false
				},
				"Fax": null,
				"Other": null,
				"DncOption": ""
			},
			"Birthday": "",
			"Gender": "",
			"DriversLicense": "",
			"CompanyName": "",
			"CompanyId": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": null,
			"NeverContactVia": null,
			"Income": null,
			"HasSSN": false
		}
	];

/***/ },

/***/ 768:
/***/ function(module, exports) {

	module.exports = {
		"ContactId": 1990209,
		"SiteId": 154,
		"Gender": "M",
		"FirstName": "",
		"MiddleName": "",
		"LastName": "",
		"FriendlyName": "",
		"Address": {
			"Address1": "263 Main St.",
			"Address2": "",
			"Address3": "",
			"City": "Anchorage",
			"State": "AK",
			"PostalCode": "30011",
			"County": "",
			"Country": "US  ",
			"IsComplete": false
		},
		"Email": "generaladdress@tester.com",
		"SocialMedia": {
			"Other": null,
			"Facebook": null,
			"Twitter": null,
			"LinkedIn": null
		},
		"Note": "Test note",
		"ImageFileId": 0,
		"Connections": [],
		"IsActive": true,
		"IsDeleted": false,
		"Created": "2016-08-12T23:40:18.16+00:00",
		"Source": {
			"Key": 1001,
			"Value": "Walk In"
		},
		"Type": {
			"Key": 2,
			"Value": "Individual"
		},
		"Status": {
			"Key": 328,
			"Value": "Active"
		},
		"ContactType": {
			"Key": 305,
			"Value": "Prospect"
		},
		"ContactSubType": {
			"Key": 695,
			"Value": "Hot (1-3 Weeks)"
		},
		"LastModified": "2016-08-12T23:40:18.16+00:00",
		"CreatedBy": {
			"UserId": 211399,
			"UserName": "akalam",
			"FirstName": "A",
			"LastName": "kalam"
		},
		"LastModifiedBy": {
			"UserId": 211399,
			"UserName": "akalam",
			"FirstName": "A",
			"LastName": "kalam"
		},
		"ExternalReferences": [],
		"GmInfo": {
			"GmState": "2",
			"SurrogateId": null
		},
		"HasPings": true,
		"PrimaryContactId": null,
		"Website": "",
		"Birthday": null,
		"DriversLicense": "",
		"PreferredLanguage": {
			"Key": 140,
			"Value": "English"
		},
		"NeverContactVia": {
			"Key": 314,
			"Value": ""
		},
		"HasSSN": false,
		"Income": {
			"Key": 109,
			"Value": "Blank"
		},
		"Salutation": {
			"Key": 0,
			"Value": ""
		},
		"CompanyName": "",
		"ContactVia": {
			"Key": 304,
			"Value": "Any Type"
		},
		"WorkNumber": "(666) 234-4567",
		"MobileNumber": "",
		"FaxNumber": "",
		"OtherNumber": "(555) 123-4567",
		"LastTouchedDate": "2016-08-13T07:15:34.54+00:00"
	};

/***/ },

/***/ 769:
/***/ function(module, exports) {

	module.exports = [
		{
			"ContactId": 1225998,
			"SiteId": 154,
			"Gender": "M",
			"FirstName": "Burt",
			"MiddleName": "",
			"LastName": "Macklin",
			"FriendlyName": "",
			"Address": {
				"Address1": "66613 Avenida Loca",
				"Address2": "",
				"Address3": "",
				"City": "Rancho Santa Margarita",
				"State": "CA",
				"PostalCode": "",
				"County": "",
				"Country": "",
				"IsComplete": false
			},
			"Email": "selgram@dealersocket.com",
			"SocialMedia": {
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImageFileId": 0,
			"Connections": [],
			"IsActive": true,
			"IsDeleted": false,
			"Created": "2016-08-12T23:40:18.16+00:00",
			"Source": {
				"Key": 1002850,
				"Value": "Fresh Up"
			},
			"Type": {
				"Key": 2,
				"Value": "Individual"
			},
			"Status": {
				"Key": 328,
				"Value": "Active"
			},
			"ContactType": {
				"Key": 0,
				"Value": ""
			},
			"ContactSubType": {
				"Key": 0,
				"Value": ""
			},
			"LastModified": "2016-08-12T23:40:18.16+00:00",
			"CreatedBy": {
				"UserId": 211399,
				"UserName": "akalam",
				"FirstName": "A",
				"LastName": "kalam"
			},
			"LastModifiedBy": {
				"UserId": 211399,
				"UserName": "akalam",
				"FirstName": "A",
				"LastName": "kalam"
			},
			"ExternalReferences": [],
			"GmInfo": {
				"GmState": "2",
				"SurrogateId": null
			},
			"HasPings": false,
			"PrimaryContactId": null,
			"Website": "",
			"Birthday": null,
			"DriversLicense": "",
			"PreferredLanguage": {
				"Key": 140,
				"Value": "English"
			},
			"NeverContactVia": {
				"Key": 314,
				"Value": ""
			},
			"HasSSN": false,
			"Income": {
				"Key": 109,
				"Value": ""
			},
			"Salutation": {
				"Key": 0,
				"Value": ""
			},
			"CompanyName": "",
			"ContactVia": {
				"Key": 304,
				"Value": "Any Type"
			},
			"WorkNumber": "(888) 965-1212",
			"MobileNumber": "(949) 395-1782",
			"FaxNumber": "",
			"OtherNumber": "(123) 456-7890",
			"LastTouchedDate": "2016-08-13T07:15:34.54+00:00"
		},
		{
			"ContactId": 1264436,
			"SiteId": 154,
			"Gender": "M",
			"FirstName": "Zedd",
			"MiddleName": "",
			"LastName": "Jones",
			"FriendlyName": "",
			"Address": {
				"Address1": "",
				"Address2": "",
				"Address3": "",
				"City": "",
				"State": "UT  ",
				"PostalCode": "",
				"County": "",
				"Country": "US  ",
				"IsComplete": false
			},
			"Email": "",
			"SocialMedia": {
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImageFileId": 0,
			"Connections": [],
			"IsActive": true,
			"IsDeleted": false,
			"Created": "2016-08-12T23:40:18.16+00:00",
			"Source": {
				"Key": 1002850,
				"Value": "Fresh Up"
			},
			"Type": {
				"Key": 2,
				"Value": "Individual"
			},
			"Status": {
				"Key": 328,
				"Value": "Active"
			},
			"ContactType": {
				"Key": 0,
				"Value": ""
			},
			"ContactSubType": {
				"Key": 0,
				"Value": ""
			},
			"LastModified": "2016-08-12T23:40:18.16+00:00",
			"CreatedBy": {
				"UserId": 211399,
				"UserName": "akalam",
				"FirstName": "A",
				"LastName": "kalam"
			},
			"LastModifiedBy": {
				"UserId": 211399,
				"UserName": "akalam",
				"FirstName": "A",
				"LastName": "kalam"
			},
			"ExternalReferences": [],
			"GmInfo": {
				"GmState": "2",
				"SurrogateId": null
			},
			"HasPings": false,
			"PrimaryContactId": null,
			"Website": "",
			"Birthday": null,
			"DriversLicense": "",
			"PreferredLanguage": {
				"Key": 140,
				"Value": "English"
			},
			"NeverContactVia": {
				"Key": 314,
				"Value": ""
			},
			"HasSSN": false,
			"Income": {
				"Key": 109,
				"Value": ""
			},
			"Salutation": {
				"Key": 0,
				"Value": ""
			},
			"CompanyName": "",
			"ContactVia": {
				"Key": 304,
				"Value": "Any Type"
			},
			"WorkNumber": "",
			"MobileNumber": "",
			"FaxNumber": "",
			"OtherNumber": "(345) 345-3455",
			"LastTouchedDate": "2016-08-13T07:15:34.54+00:00"
		},
		{
			"ContactId": 1264437,
			"SiteId": 154,
			"Gender": "M",
			"FirstName": "Duke",
			"MiddleName": "",
			"LastName": "Silver",
			"FriendlyName": "",
			"Address": {
				"Address1": "",
				"Address2": "",
				"Address3": "",
				"City": "",
				"State": "UT  ",
				"PostalCode": "",
				"County": "",
				"Country": "US  ",
				"IsComplete": false
			},
			"Email": "ds@gmail.com",
			"SocialMedia": {
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImageFileId": 0,
			"Connections": [],
			"IsActive": true,
			"IsDeleted": false,
			"Created": "2016-08-12T23:40:18.16+00:00",
			"Source": {
				"Key": 1002850,
				"Value": "Fresh Up"
			},
			"Type": {
				"Key": 2,
				"Value": "Individual"
			},
			"Status": {
				"Key": 328,
				"Value": "Active"
			},
			"ContactType": {
				"Key": 0,
				"Value": ""
			},
			"ContactSubType": {
				"Key": 0,
				"Value": ""
			},
			"LastModified": "2016-08-12T23:40:18.16+00:00",
			"CreatedBy": {
				"UserId": 211399,
				"UserName": "akalam",
				"FirstName": "A",
				"LastName": "kalam"
			},
			"LastModifiedBy": {
				"UserId": 211399,
				"UserName": "akalam",
				"FirstName": "A",
				"LastName": "kalam"
			},
			"ExternalReferences": [],
			"GmInfo": {
				"GmState": "2",
				"SurrogateId": null
			},
			"HasPings": false,
			"PrimaryContactId": null,
			"Website": "",
			"Birthday": null,
			"DriversLicense": "",
			"PreferredLanguage": {
				"Key": 140,
				"Value": "English"
			},
			"NeverContactVia": {
				"Key": 314,
				"Value": ""
			},
			"HasSSN": false,
			"Income": {
				"Key": 109,
				"Value": ""
			},
			"Salutation": {
				"Key": 0,
				"Value": ""
			},
			"CompanyName": "",
			"ContactVia": {
				"Key": 304,
				"Value": "Any Type"
			},
			"WorkNumber": "",
			"MobileNumber": "(345) 589-5333",
			"FaxNumber": "",
			"OtherNumber": "",
			"LastTouchedDate": "2016-08-13T07:15:34.54+00:00"
		}
	];

/***/ },

/***/ 770:
/***/ function(module, exports) {

	module.exports = {
		"ContactId": 1990209,
		"SiteId": 154,
		"Gender": "M",
		"FirstName": "",
		"MiddleName": "",
		"LastName": "",
		"FriendlyName": "",
		"Address": {
			"Address1": "1234 Dreary Lane",
			"Address2": "2345 Mulberry Street",
			"Address3": "",
			"City": "Sandy",
			"State": "UT",
			"PostalCode": "84060",
			"County": "Salt Lake",
			"Country": "US  ",
			"IsComplete": false
		},
		"Email": "testEmail@emaill.com",
		"SocialMedia": {
			"Other": null,
			"Facebook": "FacebookUser",
			"Twitter": "Tweet",
			"LinkedIn": null
		},
		"Note": "This is a special note",
		"ImageFileId": 0,
		"Connections": [
			1264436
		],
		"IsActive": true,
		"IsDeleted": false,
		"Created": "2016-08-12T23:40:18.16+00:00",
		"Source": {
			"Key": 1001,
			"Value": "Walk In"
		},
		"Type": {
			"Key": 1,
			"Value": "Organization"
		},
		"Status": {
			"Key": 328,
			"Value": "Active"
		},
		"ContactType": {
			"Key": 1000,
			"Value": "Prospect"
		},
		"ContactSubType": {
			"Key": 700,
			"Value": "Hot (1-3 weeks)"
		},
		"LastModified": "2016-08-12T23:40:18.16+00:00",
		"CreatedBy": {
			"UserId": 211399,
			"UserName": "akalam",
			"FirstName": "A",
			"LastName": "kalam"
		},
		"LastModifiedBy": {
			"UserId": 211399,
			"UserName": "akalam",
			"FirstName": "A",
			"LastName": "kalam"
		},
		"ExternalReferences": [],
		"GmInfo": {
			"GmState": "2",
			"SurrogateId": null
		},
		"HasPings": false,
		"PrimaryContactId": null,
		"Website": "",
		"Birthday": null,
		"DriversLicense": "",
		"PreferredLanguage": {
			"Key": 140,
			"Value": "English"
		},
		"NeverContactVia": {
			"Key": 314,
			"Value": ""
		},
		"HasSSN": false,
		"Income": {
			"Key": 109,
			"Value": ""
		},
		"Salutation": {
			"Key": 0,
			"Value": ""
		},
		"CompanyName": "",
		"ContactVia": {
			"Key": 304,
			"Value": "Any Type"
		},
		"WorkNumber": "(666) 234-4567",
		"MobileNumber": "",
		"FaxNumber": "",
		"OtherNumber": "(555) 123-4567",
		"LastTouchedDate": "2016-08-13T07:15:34.54+00:00"
	};

/***/ },

/***/ 771:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var salesOpportunitiesJson = __webpack_require__(772);
	var salesOpportunityPermissionsJson = __webpack_require__(773);
	var salesOpportunityMergeErrorJson = __webpack_require__(774);
	var salesOpportunityMergeSuccessJson = __webpack_require__(775);
	var createOppRefDefsJson = __webpack_require__(776);
	var viewSingleSalesOpportunityJson = __webpack_require__(777);
	var createdNewSalesOpportunityJson = __webpack_require__(778);
	var statusJson = __webpack_require__(779);
	var statusUpdatedSalesOppJson = __webpack_require__(780);
	var addSelectedJson = __webpack_require__(781);
	var viewSingleSalesOpportunityNoCoBuyerJson = __webpack_require__(782);
	var recapPermissionsJson = __webpack_require__(783);
	var recapRefDefsJson = __webpack_require__(784);
	var salesRecapJson = __webpack_require__(785);
	var viewSoldSalesOpportunityNoCobuyerJson = __webpack_require__(786);
	var viewSingleSalesOpportunityCannotBeSavedJson = __webpack_require__(787);
	var salesOpportunities = (function () {
	    function salesOpportunities() {
	        this.salesOppList = __webpack_require__(772);
	        //This is to be used below to bring in a different json.
	        this.activitySalesOpp = __webpack_require__(777);
	    }
	    salesOpportunities.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex, $q, apiBaseUrlRegex) {
	        var _this = this;
	        var statusEndpoint = /\/shim\/SalesOpportunityStatus\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + statusEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, statusJson];
	        });
	        // This is an endpoint to be called after a status is updated from a sales opportunity
	        var statusUpdateSalesOpp = /\/shim\/SalesOpportunities\/(\d+)\/(\d+)/i;
	        $httpBackend.whenPUT(new RegExp(shimBaseUrlRegex.source + statusUpdateSalesOpp.source)).respond(function (method, url, data, headers) {
	            var matches = statusUpdateSalesOpp.exec(url);
	            if (matches && matches.length > 2) {
	                if (matches[2] == "777") {
	                    return [412, { Error: 'Quote record was updated by another user while you were editing this record.' }];
	                }
	            }
	            return [200, statusUpdatedSalesOppJson];
	        });
	        var filterByStoreVisitAndSold = /\/shim\/SalesOpportunitySummaries\/(\d+)\?\$countby=Status\/text&\$filter=Status\/text(\s|%20)eq(\s|%20)('|%27)2(\s|%20)-(\s|%20)Store(\s|%20)Visit('|%27)&\$filter=Status\/text(\s|%20)eq(\s|%20)'6(\s|%20)-(\s|%20)Sold'&\$orderby=Id/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + filterByStoreVisitAndSold.source)).respond(function (method, url, data, headers) {
	            var salesOpps = angular.copy(_this.salesOppList);
	            salesOpps.data[0].VehiclesOfInterest[0].Make = "Filtered By Store Visit And Sold";
	            salesOpps.data[0].VehiclesOfInterest[0].Model = "";
	            salesOpps.data[0].VehiclesOfInterest[0].Year = "";
	            salesOpps.data[0].Type.text = "";
	            return [200, salesOpps];
	        });
	        var filterByStoreVisit = /\/shim\/SalesOpportunitySummaries\/(\d+)\?\$countby=Status\/text&\$filter=Status\/text(\s|%20)eq(\s|%20)('|%27)2(\s|%20)-(\s|%20)Store(\s|%20)Visit('|%27)&\$orderby=Id(\s|%20)desc/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + filterByStoreVisit.source)).respond(function (method, url, data, headers) {
	            var salesOpps = angular.copy(_this.salesOppList);
	            salesOpps.data[0].VehiclesOfInterest[0].Make = "Filtered By Store Visit";
	            salesOpps.data[0].VehiclesOfInterest[0].Model = "";
	            salesOpps.data[0].VehiclesOfInterest[0].Year = "";
	            salesOpps.data[0].Type.text = "";
	            return [200, salesOpps];
	        });
	        //http://localhost:8082/shim/SalesOpportunities/1011?$countby=Status/text&$orderby=Id
	        var salesOrderById = /\/shim\/SalesOpportunitySummaries\/(\d+)\?\$countby=Status\/text&\$orderby=Id(\s|%20)desc$/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + salesOrderById.source)).respond(function (method, url, data, headers) {
	            var salesOpps = angular.copy(_this.salesOppList);
	            salesOpps.data[0].VehiclesOfInterest[0].Make = "Sorted By ID or Date Added Newest First";
	            salesOpps.data[0].VehiclesOfInterest[0].Model = "";
	            salesOpps.data[0].VehiclesOfInterest[0].Year = "";
	            salesOpps.data[0].Type.text = "";
	            return [200, salesOpps];
	        });
	        var salesOpportunitiesEndpoint = /\/shim\/SalesOpportunitySummaries\/(\d+)$/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + salesOpportunitiesEndpoint.source)).respond(function (method, url, data, headers) {
	            var responseData = {
	                "aggregations": {
	                    "Status/text": {
	                        "6 - Sold": 3,
	                        "3 - Goals Proof": 1,
	                        "7 - Lost": 1
	                    }
	                },
	                "data": salesOpportunitiesJson
	            };
	            return [200, JSON.stringify(responseData)];
	        });
	        var salesOpportunityDeleteEndpoint = /\/shim\/SalesOpportunities\/(\d+)\/(\d+)/i;
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + salesOpportunityDeleteEndpoint.source)).respond(function (method, url, data, headers) {
	            return [204, {}];
	        });
	        var salesOpportunityPermissionEndpoint = /\/shim\/SalesOpportunityPermissions\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + salesOpportunityPermissionEndpoint.source)).respond(function (method, url, data, headers) {
	            return [204, salesOpportunityPermissionsJson];
	        });
	        //Errors merging first vehicle(sold) into others
	        //var mergeErrorEndpointFirstVehicle = /\/shim\/SalesOpportunityMerge\/(\d+)\/2753333\/(2753332|28873|299534)/i;
	        var mergeErrorEndpointFirstVehicle = /\/shim\/SalesOpportunityMerge\/(\d+)\/2753333\/(8675341)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + mergeErrorEndpointFirstVehicle.source)).respond(function (method, url, data, headers) {
	            return [204, salesOpportunityMergeErrorJson];
	        });
	        var mergeErrorEndpointFirstVehicle = /\/shim\/SalesOpportunityMerge\/(\d+)\/2753333\/(299534)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + mergeErrorEndpointFirstVehicle.source)).respond(function (method, url, data, headers) {
	            return [200, salesOpportunityMergeErrorJson];
	        });
	        // Errors merging third vehicle(nonsold) into others
	        var mergeErrorEndpointThirdVehicle = /\/shim\/SalesOpportunityMerge\/(\d+)\/299534\/(2753333)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + mergeErrorEndpointThirdVehicle.source)).respond(function (method, url, data, headers) {
	            return [200, salesOpportunityMergeErrorJson];
	        });
	        var salesOpportunitySuccessEndpoint = /\/shim\/SalesOpportunityMerge\/(\d+)\/2753333\/151299/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + salesOpportunitySuccessEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, salesOpportunityMergeSuccessJson];
	        });
	        var createOppRefDefsEndpoint = /\/shim\/RefDefs\/SalesOpportunityAdd\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + createOppRefDefsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, createOppRefDefsJson];
	        });
	        var addSelected = /\/shim\/RefDefs\/SalesOpportunityAdd\/selected\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + addSelected.source)).respond(function (method, url, data, headers) {
	            return [200, addSelectedJson];
	        });
	        var viewSingleSalesOpportunity = /\/salesOpportunity\/getSalesOpportunity\?(.*)=(\d+)&(.*)=(\d+)/i;
	        $httpBackend.whenGET(new RegExp(apiBaseUrlRegex.source + viewSingleSalesOpportunity.source)).respond(function (method, url, data, headers) {
	            // $httpBackend.whenGET(viewSingleSalesOpportunity).respond((method, url, data, headers) => {
	            //This is to pull a different activity json if the event ID is equal to 1 character.
	            var matches = viewSingleSalesOpportunity.exec(url);
	            if (matches[2].length == 1) {
	                var salesOpps = angular.copy(_this.activitySalesOpp);
	                salesOpps.Id = "8";
	                return [200, salesOpps];
	            }
	            if (matches[2].length == 2) {
	                return [200, viewSoldSalesOpportunityNoCobuyerJson];
	            }
	            if (matches[2].length >= 10) {
	                return [200, viewSingleSalesOpportunityNoCoBuyerJson];
	            }
	            if (matches[2] == "777") {
	                return [200, viewSingleSalesOpportunityCannotBeSavedJson];
	            }
	            return [200, viewSingleSalesOpportunityJson];
	        });
	        var createSalesOpportunity = /\/shim\/SalesOpportunities\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + createSalesOpportunity.source)).respond(function (method, url, data, headers) {
	            var matches = createSalesOpportunity.exec(url);
	            if (matches[1].length == 1) {
	                return [200, 8];
	            }
	            return [200, createdNewSalesOpportunityJson];
	        });
	        var soldRecapPermissionsEndpoint = /\/shim\/salesopportunities\/recap\/permissions\/sales\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + soldRecapPermissionsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, recapPermissionsJson];
	        });
	        var soldRecapGrossPermissions = /\/shim\/salesopportunities\/recap\/permissions\/gross\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + soldRecapGrossPermissions.source)).respond(function (method, url, data, headers) {
	            return [200, recapPermissionsJson];
	        });
	        var soldRecapRefDefs = /\/shim\/salesopportunities\/recap\/refdefs\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + soldRecapRefDefs.source)).respond(function (method, url, data, headers) {
	            return [200, recapRefDefsJson];
	        });
	        var soldRecapSave = /\/shim\/salesopportunities\/recap\/(\d+)\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + soldRecapSave.source)).respond(function (method, url, data, headers) {
	            return [200, data];
	        });
	        var getSoldRecap = /\/shim\/salesopportunities\/recap\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + getSoldRecap.source)).respond(function (method, url, data, headers) {
	            return [200, salesRecapJson];
	        });
	        var salesOpportunityCreditAppEndpoint = /\/shim\/creditapp\/(\d+)\?source=salesOpportunity&eventId=(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + salesOpportunityCreditAppEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200];
	        });
	    };
	    return salesOpportunities;
	}());
	module.exports = salesOpportunities;


/***/ },

/***/ 772:
/***/ function(module, exports) {

	module.exports = {
		"aggregations": {
			"Status/text": {
				"7 - Lost": 1,
				"6 - Sold": 3,
				"2 - Store Visit": 1
			}
		},
		"data": [
			{
				"$type": "SalesOpportunity",
				"Id": "2753333",
				"BuyerId": "165461",
				"BuyerContacts": [
					{
						"$type": "TypedReference<Contact>",
						"Id": "165461",
						"Types": [
							"Buyer"
						]
					}
				],
				"AssignedUsers": [
					{
						"value": "fsgagen",
						"text": "George Sagen"
					},
					{
						"text": "",
						"value": ""
					},
					{
						"text": "",
						"value": ""
					}
				],
				"VehiclesOfInterest": [
					{
						"$type": "VehicleOfInterest",
						"Id": "20",
						"StockNumber": "",
						"Vin": "556671",
						"Make": "Subaru",
						"Model": "Jungler",
						"Year": "1992",
						"PurchasedDate": null,
						"Miles": null,
						"Status": false,
						"Engine": "",
						"Transmission": "",
						"Style": null,
						"FuelEfficiency": null,
						"Odometer": "0",
						"LastServiced": null,
						"ServiceEvents": null,
						"GlobalId": null,
						"Created": null,
						"LastModified": null,
						"CreatedBy": null,
						"LastModifiedBy": null,
						"Preferred": true,
						"Price": "$250,000",
						"ModelCode": "CULT",
						"Class": {
							"value": "-1",
							"text": ""
						},
						"AdditionalOptions": "",
						"Exterior": "Red",
						"Interior": "Yellow",
						"Drivetrain": "",
						"CashDown": "$30,000",
						"LotLocation": "",
						"Franchise": "",
						"FuelType": "",
						"Trim": "",
						"CityMiles": "0",
						"HighwayMiles": "0",
						"Condition": "Used"
					}
				],
				"LastUpdatedOrSoldDate": "1/21/2016",
				"StatusText": "6 - Sold",
				"DealershipId": "154",
				"DmsNumber": "17",
				"Status": {
					"value": "225",
					"text": "6 - Sold"
				},
				"Description": "This is a test event.",
				"Type": {
					"value": "100050",
					"text": "New Vehicle"
				},
				"PurchaseType": {
					"value": "100280",
					"text": "Unknown"
				},
				"Source": {
					"value": "240",
					"text": "Fresh Up"
				},
				"TrackingCode": {
					"value": "0",
					"text": ""
				},
				"Ranking": {
					"value": "230",
					"text": "1 - Hot"
				},
				"ExpectedClose": {
					"value": "100303",
					"text": "Over 2 Months"
				},
				"Franchise": {
					"value": "8",
					"text": "DealerSocket2"
				},
				"ResolutionCode1": {
					"value": "0",
					"text": null
				},
				"ResolutionCode2": {
					"value": "0",
					"text": null
				}
			},
			{
				"$type": "SalesOpportunity",
				"Id": "8675341",
				"BuyerId": "28873",
				"BuyerContacts": [
					{
						"$type": "TypedReference<Contact>",
						"Id": "28873",
						"Types": [
							"Buyer"
						]
					}
				],
				"AssignedUsers": [
					{
						"value": "fsgsagen",
						"text": "George Sagen"
					},
					{
						"text": "",
						"value": ""
					},
					{
						"text": "",
						"value": ""
					}
				],
				"VehiclesOfInterest": [
					{
						"$type": "VehicleOfInterest",
						"Id": "21",
						"StockNumber": "",
						"Vin": "15151515",
						"Make": "Chevrolet",
						"Model": "Golderado",
						"Year": "2008",
						"PurchasedDate": null,
						"Miles": "4",
						"Status": false,
						"Engine": "BIG",
						"Transmission": "Manual",
						"Style": null,
						"FuelEfficiency": null,
						"Odometer": "8",
						"LastServiced": null,
						"ServiceEvents": null,
						"GlobalId": null,
						"Created": null,
						"LastModified": null,
						"CreatedBy": null,
						"LastModifiedBy": null,
						"Preferred": true,
						"Price": "$200",
						"ModelCode": "RAD",
						"Class": {
							"value": "3",
							"text": "Pickup Truck"
						},
						"AdditionalOptions": "None",
						"Exterior": "White",
						"Interior": "Black",
						"Drivetrain": "",
						"CashDown": "$50",
						"LotLocation": "112",
						"Franchise": "",
						"FuelType": "Gas",
						"Trim": "Base",
						"CityMiles": "4",
						"HighwayMiles": "6",
						"Condition": "Used"
					}
				],
				"LastUpdatedOrSoldDate": "1/21/2012",
				"StatusText": "6 - Sold",
				"DealershipId": "154",
				"DmsNumber": "17",
				"Status": {
					"value": "225",
					"text": "6 - Sold"
				},
				"Description": "This is a test event.",
				"Type": {
					"value": "100050",
					"text": "New Vehicle"
				},
				"PurchaseType": {
					"value": "100280",
					"text": "Unknown"
				},
				"Source": {
					"value": "240",
					"text": "Fresh Up"
				},
				"TrackingCode": {
					"value": "0",
					"text": ""
				},
				"Ranking": {
					"value": "230",
					"text": "1 - Hot"
				},
				"ExpectedClose": {
					"value": "100303",
					"text": "Over 2 Months"
				},
				"Franchise": {
					"value": "8",
					"text": "DealerSocket2"
				},
				"ResolutionCode1": {
					"value": "0",
					"text": null
				},
				"ResolutionCode2": {
					"value": "0",
					"text": null
				}
			},
			{
				"$type": "SalesOpportunity",
				"Id": "299534",
				"BuyerId": "165461",
				"BuyerContacts": [
					{
						"$type": "TypedReference<Contact>",
						"Id": "165461",
						"Types": [
							"Buyer"
						]
					}
				],
				"AssignedUsers": [
					{
						"value": "fsgsagen",
						"text": "George Sagen"
					},
					{
						"text": "",
						"value": ""
					},
					{
						"text": "",
						"value": ""
					}
				],
				"VehiclesOfInterest": [
					{
						"$type": "VehicleOfInterest",
						"Id": "22",
						"StockNumber": "",
						"Vin": "",
						"Make": "",
						"Model": "",
						"Year": "",
						"PurchasedDate": null,
						"Miles": null,
						"Status": false,
						"Engine": "",
						"Transmission": "",
						"Style": null,
						"FuelEfficiency": null,
						"Odometer": "0",
						"LastServiced": null,
						"ServiceEvents": null,
						"GlobalId": null,
						"Created": null,
						"LastModified": null,
						"CreatedBy": null,
						"LastModifiedBy": null,
						"Preferred": true,
						"Price": "$",
						"ModelCode": "",
						"Class": {
							"value": "-1",
							"text": ""
						},
						"AdditionalOptions": "",
						"Exterior": "",
						"Interior": "",
						"Drivetrain": "",
						"CashDown": "$",
						"LotLocation": "",
						"Franchise": "",
						"FuelType": "",
						"Trim": "",
						"CityMiles": "0",
						"HighwayMiles": "0",
						"Condition": "Used"
					}
				],
				"LastUpdatedOrSoldDate": "1/21/2013",
				"StatusText": "2 - Store Visit",
				"DealershipId": "154",
				"DmsNumber": "17",
				"Status": {
					"value": "227",
					"text": "2 - Store Visit"
				},
				"Description": "This is a test event.",
				"Type": {
					"value": "100050",
					"text": "New Vehicle"
				},
				"PurchaseType": {
					"value": "100280",
					"text": "Unknown"
				},
				"Source": {
					"value": "240",
					"text": "Fresh Up"
				},
				"TrackingCode": {
					"value": "0",
					"text": ""
				},
				"Ranking": {
					"value": "230",
					"text": "1 - Hot"
				},
				"ExpectedClose": {
					"value": "100303",
					"text": "Over 2 Months"
				},
				"Franchise": {
					"value": "8",
					"text": "DealerSocket2"
				},
				"ResolutionCode1": {
					"value": "0",
					"text": null
				},
				"ResolutionCode2": {
					"value": "0",
					"text": null
				}
			},
			{
				"$type": "SalesOpportunity",
				"Id": "2753332",
				"BuyerId": "165461",
				"BuyerContacts": [
					{
						"$type": "TypedReference<Contact>",
						"Id": "165461",
						"Types": [
							"Buyer"
						]
					}
				],
				"AssignedUsers": [
					{
						"value": "fsgsagen",
						"text": "George Sagen"
					},
					{
						"text": "",
						"value": ""
					},
					{
						"text": "",
						"value": ""
					}
				],
				"VehiclesOfInterest": [
					{
						"$type": "VehicleOfInterest",
						"Id": "19",
						"StockNumber": "",
						"Vin": "",
						"Make": "Subaru",
						"Model": "Star Car",
						"Year": "1975",
						"PurchasedDate": null,
						"Miles": null,
						"Status": false,
						"Engine": "",
						"Transmission": "",
						"Style": null,
						"FuelEfficiency": null,
						"Odometer": "0",
						"LastServiced": null,
						"ServiceEvents": null,
						"GlobalId": null,
						"Created": null,
						"LastModified": null,
						"CreatedBy": null,
						"LastModifiedBy": null,
						"Preferred": true,
						"Price": "$2,599",
						"ModelCode": "BAM",
						"Class": {
							"value": "-1",
							"text": ""
						},
						"AdditionalOptions": "",
						"Exterior": "Purple",
						"Interior": "Yellow",
						"Drivetrain": "",
						"CashDown": "$",
						"LotLocation": "",
						"Franchise": "",
						"FuelType": "",
						"Trim": "",
						"CityMiles": "0",
						"HighwayMiles": "0",
						"Condition": "Used"
					}
				],
				"LastUpdatedOrSoldDate": "1/20/1976",
				"StatusText": "7 - Lost",
				"DealershipId": "154",
				"DmsNumber": "17",
				"Status": {
					"value": "226",
					"text": "7 - Lost"
				},
				"Description": "This is a test event.",
				"Type": {
					"value": "100050",
					"text": "New Vehicle"
				},
				"PurchaseType": {
					"value": "100280",
					"text": "Unknown"
				},
				"Source": {
					"value": "240",
					"text": "Fresh Up"
				},
				"TrackingCode": {
					"value": "1305",
					"text": "2-Brand Loyalty Hond"
				},
				"Ranking": {
					"value": "230",
					"text": "1 - Hot"
				},
				"ExpectedClose": {
					"value": "100303",
					"text": "Over 2 Months"
				},
				"Franchise": {
					"value": "8",
					"text": "DealerSocket2"
				},
				"ResolutionCode1": {
					"value": "292",
					"text": "Bad apple"
				},
				"ResolutionCode2": {
					"value": "371",
					"text": "Follow Up"
				}
			},
			{
				"$type": "SalesOpportunity",
				"Id": "151299",
				"BuyerId": "165461",
				"BuyerContacts": [
					{
						"$type": "TypedReference<Contact>",
						"Id": "165461",
						"Types": [
							"Buyer"
						]
					}
				],
				"AssignedUsers": [
					{
						"value": "fsgsagen",
						"text": "George Sagen"
					},
					{
						"text": "",
						"value": ""
					},
					{
						"text": "",
						"value": ""
					}
				],
				"VehiclesOfInterest": [
					{
						"$type": "VehicleOfInterest",
						"Id": "18",
						"StockNumber": "",
						"Vin": "125125125",
						"Make": "Ford",
						"Model": "Cool Car",
						"Year": "1995",
						"PurchasedDate": null,
						"Miles": null,
						"Status": false,
						"Engine": "Big",
						"Transmission": "Very missiony",
						"Style": null,
						"FuelEfficiency": null,
						"Odometer": "18",
						"LastServiced": null,
						"ServiceEvents": null,
						"GlobalId": null,
						"Created": null,
						"LastModified": null,
						"CreatedBy": null,
						"LastModifiedBy": null,
						"Preferred": true,
						"Price": "$25,000",
						"ModelCode": "Aab",
						"Class": {
							"value": "2",
							"text": "Sedan"
						},
						"AdditionalOptions": "All the options",
						"Exterior": "Red",
						"Interior": "Blue",
						"Drivetrain": "It does",
						"CashDown": "$12",
						"LotLocation": "111",
						"Franchise": "112",
						"FuelType": "Dinosaur",
						"Trim": "Best Trim",
						"CityMiles": "100",
						"HighwayMiles": "120",
						"Condition": "Used"
					}
				],
				"LastUpdatedOrSoldDate": "1/20/2016",
				"StatusText": "6 - Sold",
				"DealershipId": "154",
				"DmsNumber": "17",
				"Status": {
					"value": "225",
					"text": "6 - Sold"
				},
				"Description": "This is a test event.",
				"Type": {
					"value": "100050",
					"text": "New Vehicle"
				},
				"PurchaseType": {
					"value": "100280",
					"text": "Unknown"
				},
				"Source": {
					"value": "241",
					"text": "Phone Up"
				},
				"TrackingCode": {
					"value": "0",
					"text": ""
				},
				"Ranking": {
					"value": "230",
					"text": "1 - Hot"
				},
				"ExpectedClose": {
					"value": "100303",
					"text": "Over 2 Months"
				},
				"Franchise": {
					"value": "8",
					"text": "DealerSocket2"
				},
				"ResolutionCode1": {
					"value": "0",
					"text": null
				},
				"ResolutionCode2": {
					"value": "0",
					"text": null
				}
			}
		]
	};

/***/ },

/***/ 773:
/***/ function(module, exports) {

	module.exports = {
		"$type": "SalesOpportunityPermissions",
		"addSalesOpportunity": true,
		"removeSalesOpportunity": true,
		"mergeSalesOpportunity": true,
		"pushToDms": true,
		"setSalesSold": true
	};

/***/ },

/***/ 774:
/***/ function(module, exports) {

	module.exports = {
		"body": "Cannot merge sold event into another event or non-sold event into a sold event when non-sold insert date is greater than sold insert date by more than 45 days",
		"statusCode": 501
	};

/***/ },

/***/ 775:
/***/ function(module, exports) {

	module.exports = {
		"response": {
			"statusCode": 200,
			"body": "\n<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n<html>\n<head>\n    <link rel=\"shortcut icon\" type=\"image/ico\" href=\"../images/dealersocket.ico\">\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n    <title>Contact Dashboard - Sales Tab</title>\n    <link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"../stylesheet/reset.css\">\n    <link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"../stylesheet/uistyle.css\">\n    <style media=\"screen\" type=\"text/css\">\n        #cdBottomSales\n        {\n            width: 842px;\n            height: 213px; \n            display: block;\n        }\n        #content\n        {\n            margin-top: 10px;\n        }\n        .module-body\n        {\n            padding-left: 0px;\n            padding-top: 0px;\n        }\n        #objGrid\n        {\n            width: 100%;\n        }\n        .large-grid-footer\n        {\n            vertical-align: bottom;\n        }\n        \n        #div_grid\n        {\n            width: 840px;\n            height: 213px;\n        }\n        input[type=\"checkbox\"]\n        {\n            float: none !important;\n        }\n    </style>\n    <script language=\"javascript\" type=\"text/javascript\" src=\"../javascript/jquery-1.4.2.min.js\"></script>\n    <script language=\"javascript\" type=\"text/javascript\" src=\"../javascript/dealersocket.js\"></script>\n    <script language=\"javascript\" type=\"text/javascript\" src=\"../javascript/misc.js\"></script>\n    <script language=\"javascript\" type=\"text/javascript\">\n\t\t\t<!-- \n\t\t\tif (window == top) top.location.href = \"../cd_main.aspx?SiteId=3&EntityId=917197\";\n\t\n\t\t\tfor (i = 0; i < document.forms.length; i++)\n\t\t\t{\n\t\t\t\tif (!document[document.forms[i].name]) document[document.forms[i].name] = document.forms[i];\n\t\t\t}\n\n\t\t\tfunction do_Post(sAction) {\n\t\t\t  if (sAction == \"new\") {\n\t\t\t\t var iId = parent.cd_demo_indi.getEntity(); //document.salesEvent.Entity.value;\n\t\t\t\t if (iId == \"0\") {\n\t\t\t\t\tshowError(\"You Must Save the Individual/Company Record Before Creating a Sales Event\");\n\t\t\t\t\treturn;\n\t\t\t\t }\n\t\t\t\t //parent.parent.location =\"cd_sales.aspx?SiteId=\" + 3 + \"&EventId=0&EntityId=\" + iId ;\n\t\t\t\t parent.parent.location =\"cd_sales.aspx?EventId=0&EntityId=\" + iId;\n\t\t\t   }\n\t\t\t  else if (sAction == \"delete\") {\n\t\t\t   if (document.salesEvent.toDelete.value != \"\") {\n\t\t\t\t var strArg = \"SiteId=\" + 3 + \"&EntityId=\" + 917197 + \"&del=\" + document.salesEvent.toDelete.value;\n\t\t\t\t //var strArg = \"SiteId=\" + 3 + \"&EntityId=\" + 917197 + \"&del=\" + document.salesEvent.toDelete.value;\n\t\t\t\t //parent.location.href = \"xt_delete.aspx?\" + strArg;\n\t\t\t\t location.href = \"xt_delete.aspx?\" + strArg;\n\t\t\t\t}\n\t\t\t  }\t  \n\t\t\t}\n\t\n\t\t\tfunction clickChk(f) {\n\t\t\t\tvar i = 0;\n\t\t\t\tvar newDelete = \"\";\n\t\t\t\tfor (i=0; i < document.salesEvent.length; i++) {\n\t\t\t\t\tif (document.salesEvent.elements[i].type == 'checkbox') {\n\t\t\t\t\t\tif (document.salesEvent.elements[i].checked) {\n\t\t\t\t\t\t\tnewDelete += document.salesEvent.elements[i].value + \";\"; \n\t\t\t\t\t\t} \n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tdocument.salesEvent.toDelete.value = newDelete;\n\t\t\t\treturn;\n\t\t\t}\n\t\n\t\t\tfunction showMerge(iMrgeTypeId) {\n\n\t\t\t\tvar sHREF = window.location.href;\n\t\t\t\tvar sProtocol = window.location.protocol;\n\t\t\t\tvar sLocation ;\n\n\t\t\t\tsLocation = \"../search/cd_search_list_Event_merge_frame.aspx?MrgTyp=\" + iMrgeTypeId + \"&\" + \"SiteId=3&EntityId=917197\";\n\t\t\t\tlocation.href = sLocation ;\n\n\t\t\t}\t\t\n\t\t\tfunction doLink(EventId,EntityId,Key){\n\t\t\t\t\t\tif (Key == \"ToDo\"){\n\t\t\t\t\t\t\tvar mmEntity = parent.mEntity;\n\t\t\t\t\t\t\tvar mmEvent = parent.mEvent;\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tvar features = \"dialogWidth:950px;dialogHeight:600px;Help:no;Status=no;Scroll=Auto\";\n\t\t\t\t\t\t\tvar sURL=\"Reports/dsTotalActivities.aspx?EventId=\" +  EventId;\n\t\t\t\t\t\t\ttop.ShowModalDialog(sURL,'null',features,doLinkCAllback);\t\n\t\t\t\t\t\t}else{\t\n\t\t\t\t\t\t\tvar iEvt = EventId;\n\t\t\t\t\t\t\tvar iOwner = EntityId;\n\t\t\t\t\t\t\tvar iType = 1;\n\t\t\t\t\t\t\tif (iEvt == '') { iEvt = 0;}\t\t\n\t\t\t\t\t\t\tif (iOwner == '') { iOwner = 0;}\n\t\t\t\t\t\t\tif (iType == '') {iType = 1;}\n\t\t\t\t\t\n\t\t\t\t\t\t\tvar sURL = \"activity/ed_notes.aspx?Eventid=\" + iEvt + \"&EntityId=\" + iOwner + \"&CatId=\" + iType;\n\t\t\t\t\t\t\tvar features = \"dialogWidth:630px;dialogHeight:399px;Help:no;Status=no;Scroll=no\";\t\n\t\t\t\t\t\t\ttop.ShowModalDialog(sURL,null,features,doLinkCAllback); \n\t\t\t\t\t\t\t//window.open(sURL,null,features); \n\t\t\t\t\t\n\t\t\t\t\t\t}\n\t\t\t\t\t\t\n\t\t\t\t\t}\n                    \n            function doLinkCAllback(strReturn) {\n                 try\n                 {\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\t\t\t\n                 catch(err)\n                 {\n                 }\n            }\t\t\t\n\t\t\t//-->\n    </script>\n</head>\n<body onload=\"showError('');\">\n    <form name=\"salesEvent\" method=\"post\" action=\"cd_bottom_sales.aspx?SiteId=3&amp;EntityId=917197&amp;errMsg=\" id=\"salesEvent\">\r\n<div>\r\n<input type=\"hidden\" name=\"__EVENTTARGET\" id=\"__EVENTTARGET\" value=\"\" />\r\n<input type=\"hidden\" name=\"__EVENTARGUMENT\" id=\"__EVENTARGUMENT\" value=\"\" />\r\n<input type=\"hidden\" name=\"__VIEWSTATE\" id=\"__VIEWSTATE\" value=\"et0JPHuOKDSO6FQNAkwJVHRlkQctuqTNzJSkYT4kJMM/B0OwywMaChWljTBF057nziVbOFiged1lBL2qyTtDDph1D2YUf7vYt/gj0isOTKCiUVzcBX9qvtKohKNLl6QXc99UQydbcAtQ8b081oyLfJxKz/C2h5Kct5mPzlG93QWF14y2DKTUMnjfD7Pkz6clvm/pJsYSl0xIAHli4ifKdRxq/7eZmaeDebCyNw96KIijZRlm02yvL07lWRahZZ8pRbgu4tadOoSmooc/HB0CQUPKiI2Op4sAp4MHFs/L631xSZfmQ/uxOAhlR2l3pL+wb4z4hfT19l+HCeWD7NcnNNUAmzK4OGU1TADwBEJGkFURj/Nkjm9lvYTPT3IvXaqF/ROEbY5E+2M3Zrowdss1WfRQdmDhEBSVF5kIc3M9qGJRNyXrlIrcUxizGdaAIuTFUxFT8yoU4rNKRXy4cvJVcXFByjR8X7oqhHMWkDZ0BAoYPwxZVSRELUHkTS1pFkKc58LXKp5GDZEIukxefo9tjP+lQvNW4bz1+KAXQDzIJx9rkux8qXGoSYZsa2aNtKnjTZnhxCJWyP8QTRmopFmqE077x3Yf1RA+T2jhVKA9TpuGrCVwo/noPuqRdVyIyTng3AugFlDQKpBmcwkolVIssht47ZuzjLEcW/8yUxoq4KtppQ5F2oFpz7bSCoSXCm9nx8wB7lMAxjnFLX7OfhPtuYnp0CtEntQh5TCq/ihHdE5KjtwVGKUBtFDlo2kYG5jes7psx7ioONLv9qeEx3Px7knutKlPLSKswGpLUvjDvZx224K+AVjMwlC9xc6JwCHTlmdPASBMJgZMJ2Pgp+5pBPo0ISjXtSsl1MqNzJuA+dvZjo7CsWKTkSgB8DCfs1UiaFKDC4H+ocJguXWyi497aklyhIbMS9vzHuAZO2pk2upxknyYUHqw8Pl/EHugvQYeOOHRu6S4IUELM9esKdVQseXd2s3juHF/tNlQWAy/ckwbuSvpuQY3UsVT08JL4iQCl1eAIsOzaaeaoh5s4DLZhcSfDX8mFppOVovq0P/oujw5Pi3TB/UNFMPOGHseEP8K2hj0asvF4yu4jLt/v17aeeweBQoZ2XbQyxubBteJQW/K4EoCAShcmO3LsFhpCvGPFXtRMaIcj8FwHU+8GdbOjGK3uQZPnBS3bnftcU37TneKsN1G10RzCetoKZIkS2NzwgMlad6qE4EOU38vN8rGSfrW3XbiiC66S19yIfgCgyS6jybSM5wHwUZMABWiUPqlA+SJwz94M4WIpsH1rYhHstqnfo5OT8sPyg+GJPAUjtEDAe29kSFCb6PF04TcRwu+/coSJy/ix6myIdaaq/3DDuYHWyazrlDpUSDFQ5agpQcCdI8ZD/+m5X/ECgt+pIyxlLugIJMk+eNT1cPD6OtWoQgya47KrtdvE0519w==\" />\r\n</div>\r\n\r\n<script type=\"text/javascript\">\r\n//<![CDATA[\r\nvar theForm = document.forms['salesEvent'];\r\nif (!theForm) {\r\n    theForm = document.salesEvent;\r\n}\r\nfunction __doPostBack(eventTarget, eventArgument) {\r\n    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {\r\n        theForm.__EVENTTARGET.value = eventTarget;\r\n        theForm.__EVENTARGUMENT.value = eventArgument;\r\n        theForm.submit();\r\n    }\r\n}\r\n//]]>\r\n</script>\r\n\r\n\r\n<div>\r\n\r\n\t<input type=\"hidden\" name=\"__VIEWSTATEGENERATOR\" id=\"__VIEWSTATEGENERATOR\" value=\"F1585B03\" />\r\n</div>\n    <input name=\"SocketId\" type=\"hidden\" id=\"SocketId\" value=\"3\" />\n    <input name=\"Entity\" type=\"hidden\" id=\"Entity\" value=\"917197\" />\n    <input name=\"toDelete\" type=\"hidden\" id=\"toDelete\" />\n    <div id=\"content\">\n        <div id=\"cdBottomSales\" class=\"module\">\n            <div class=\"module-controls\">\n                <div class=\"shelf\">\n                    <div class=\"shelf-left\">\n                    </div>\n                    <div id=\"cdBottomSalesShelf\" class=\"shelf-mid\">\n                        <a id=\"addNew\" title=\"New Sales Event\" class=\"shelf-button shelf-button-add\" href=\"javascript:do_Post(&#39;new&#39;);\">New Sales Event</a>\n                        <a id=\"Delete\" title=\"Delete Sales Event\" class=\"shelf-button shelf-button-trash\" href=\"javascript:do_Post(&#39;delete&#39;);\">Delete Sales Event</a>\n                        <a id=\"Merge\" title=\"Merge Sales Events\" class=\"shelf-button shelf-button-merge\" href=\"javascript:showMerge(1);\">Merge Sales Events</a>\n                    </div>\n                    <div id=\"cdBottomSalesTabs\" class=\"module-tabs\">\n                        <a id=\"tabSales\" class=\"tab-static tab-module\" target=\"_self\"><span class=\"tab-left\"></span><span class=\"tab-mid\">Sales</span><span class=\"tab-right\"></span></a>\n                        <a id=\"tabVehicle\" class=\"tab tab-module\" href=\"../vehicle/cd_bottom_vehicle.aspx?SiteId=3&amp;EntityId=917197\" target=\"_self\"><span class=\"tab-left\"></span><span class=\"tab-mid\">Vehicles</span><span class=\"tab-right\"></span></a>\n                        <a id=\"tabService\" class=\"tab tab-module\" href=\"../service/cd_bottom_service.aspx?SiteId=3&amp;EntityId=917197\" target=\"_self\"><span class=\"tab-left\"></span><span class=\"tab-mid\">Service</span><span class=\"tab-right\"></span></a>\n                        <a id=\"tabQA\" class=\"tab tab-module\" href=\"../qa/cd_bottom_qa.aspx?SiteId=3&amp;EntityId=917197\" target=\"_self\"><span class=\"tab-left\"></span><span class=\"tab-mid\">QA</span><span class=\"tab-right\"></span></a>\n                        <a id=\"tabMarket\" class=\"tab tab-module\" href=\"../market/cd_bottom_marketing.aspx?SiteId=3&amp;EntityId=917197\" target=\"_self\"><span class=\"tab-left\"></span><span class=\"tab-mid\">Marketing</span><span class=\"tab-right\"></span></a>\n                        <a id=\"tabTouches\" class=\"tab tab-module\" href=\"../touches/cd_bottom_touches.aspx?SiteId=3&amp;EntityId=917197\" target=\"_self\"><span class=\"tab-left\"></span><span class=\"tab-mid\">Touches</span><span class=\"tab-right\"></span></a>\n                        <a id=\"tabSurvey\" class=\"tab tab-module\" href=\"../survey/cd_bottom_survey.aspx?SiteId=3&amp;EntityId=917197\" target=\"_self\"><span class=\"tab-left\"></span><span class=\"tab-mid\">Surveys</span><span class=\"tab-right\"></span></a>\n                        \n                    </div>\n                    <div class=\"shelf-right\">\n                    </div>\n                </div>\n            </div>\n            <div class=\"module-content\">\n                <div class=\"module-head\">\n                    <div class=\"module-corner module-corner-ul\">\n                    </div>\n                    <div class=\"module-mid\">\n                    </div>\n                    <div class=\"module-corner module-corner-ur\">\n                    </div>\n                </div>\n                <div class=\"module-body\">\n                    <div>\n                        <span id=\"msg\" name=\"msg\"></span></div>\n                    <div id=\"div_grid\" class=\"div-scrollable\">\n                        <table class=\"small-grid\" cellspacing=\"0\" CurrentSortExpression=\"\" border=\"0\" id=\"objGrid\" style=\"border-collapse:collapse;\">\r\n\t<tr class=\"small-grid-header\" align=\"center\" style=\"height:20px;\">\r\n\t\t<td>&nbsp;</td><td>Info.</td><td title=\"Sort by: iEventId\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl10&#39;,&#39;&#39;)\">Deal#</a><span class=\"sort\"></span></td><td title=\"Sort by: iEventType\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl11&#39;,&#39;&#39;)\">Type</a><span class=\"sort\"></span></td><td title=\"Sort by: iSourceId\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl12&#39;,&#39;&#39;)\">Source</a><span class=\"sort\"></span></td><td title=\"Sort by: vchModel\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl13&#39;,&#39;&#39;)\">Vehicle</a><span class=\"sort\"></span></td><td title=\"Sort by: iStatusId\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl14&#39;,&#39;&#39;)\">Status</a><span class=\"sort\"></span></td><td title=\"Sort by: FullName\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl15&#39;,&#39;&#39;)\">Assign To</a><span class=\"sort\"></span></td><td title=\"Sort by: vchCoBuyerName\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl16&#39;,&#39;&#39;)\">Co-Buyer</a><span class=\"sort\"></span></td><td title=\"Sort by: dtUpdateDate\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl18&#39;,&#39;&#39;)\">Update or Sold</a><span class=\"sort\"></span></td><td title=\"Sort by: chUpdateBy\"><a href=\"javascript:__doPostBack(&#39;objGrid$ctl01$ctl19&#39;,&#39;&#39;)\">Update By</a><span class=\"sort\"></span></td>\r\n\t</tr><tr class=\"small-grid-row gradient\" align=\"center\" style=\"height:20px;\">\r\n\t\t<td align=\"center\">\n                                        <input name=\"objGrid$ctl02$chkBox\" type=\"Checkbox\" id=\"objGrid_ctl02_chkBox\" class=\"checkbox\" onclick=\"clickChk(this.form);\" value=\"2753420\" />\n                                    </td><td align=\"center\" style=\"width:30px;\">\n                                        <a id=\"objGrid_ctl02_DETAIL\" href=\"javascript:doLink(2753420,&quot;917197&quot;,&quot;WorkNote&quot;);\"><img src=\"../images/doodads/info_small.png\" alt=\"\" style=\"border-width:0px;\" /></a>\n                                    </td><td align=\"center\">\n                                        <a id=\"objGrid_ctl02_DealId\" Class=\"GridLink\" SortExpression=\"iEventId\" href=\"../sales/cd_sales.aspx?SiteId=3&amp;EntityId=917197&amp;EventId=2753420&amp;CustomerType=0\" target=\"main\">2753420</a>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl02_Type\">New CRM</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl02_Source\">PROSPECTING - PHONE</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl02_Vehicle\">Murano</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl02_Status\">6 - Sold</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl02_Assign\">George Sagen</span>\n                                    </td><td>\n                                        <a id=\"objGrid_ctl02_Hyperlink1\" Class=\"GridLink\" SortExpression=\"iEventId\" target=\"main\"> </a>\n                                    </td><td align=\"center\">\n                                        <span id=\"objGrid_ctl02_LstUpdate\">11/13/2015</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl02_UpdateBy\">George Sagen</span>\n                                    </td>\r\n\t</tr><tr class=\"small-grid-row gradient\" align=\"center\" style=\"height:20px;\">\r\n\t\t<td align=\"center\">\n                                        <input name=\"objGrid$ctl03$chkBox\" type=\"Checkbox\" id=\"objGrid_ctl03_chkBox\" class=\"checkbox\" onclick=\"clickChk(this.form);\" value=\"2753413\" />\n                                    </td><td align=\"center\" style=\"width:30px;\">\n                                        <a id=\"objGrid_ctl03_DETAIL\" href=\"javascript:doLink(2753413,&quot;917197&quot;,&quot;WorkNote&quot;);\"><img src=\"../images/doodads/info_small.png\" alt=\"\" style=\"border-width:0px;\" /></a>\n                                    </td><td align=\"center\">\n                                        <a id=\"objGrid_ctl03_DealId\" Class=\"GridLink\" SortExpression=\"iEventId\" href=\"../sales/cd_sales.aspx?SiteId=3&amp;EntityId=917197&amp;EventId=2753413&amp;CustomerType=0\" target=\"main\">2753413</a>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl03_Type\"><--Choose Product--></span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl03_Source\">PROSPECTING - PHONE</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl03_Vehicle\">Expedition EL</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl03_Status\">6 - Sold</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl03_Assign\">George Sagen</span>\n                                    </td><td>\n                                        <a id=\"objGrid_ctl03_Hyperlink1\" Class=\"GridLink\" SortExpression=\"iEventId\" target=\"main\"> </a>\n                                    </td><td align=\"center\">\n                                        <span id=\"objGrid_ctl03_LstUpdate\">11/12/2015</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl03_UpdateBy\">George Sagen</span>\n                                    </td>\r\n\t</tr><tr class=\"small-grid-row gradient\" align=\"center\" style=\"height:20px;\">\r\n\t\t<td align=\"center\">\n                                        <input name=\"objGrid$ctl04$chkBox\" type=\"Checkbox\" id=\"objGrid_ctl04_chkBox\" class=\"checkbox\" onclick=\"clickChk(this.form);\" value=\"2753386\" />\n                                    </td><td align=\"center\" style=\"width:30px;\">\n                                        <a id=\"objGrid_ctl04_DETAIL\" href=\"javascript:doLink(2753386,&quot;917197&quot;,&quot;WorkNote&quot;);\"><img src=\"../images/doodads/info_small.png\" alt=\"\" style=\"border-width:0px;\" /></a>\n                                    </td><td align=\"center\">\n                                        <a id=\"objGrid_ctl04_DealId\" Class=\"GridLink\" SortExpression=\"iEventId\" href=\"../sales/cd_sales.aspx?SiteId=3&amp;EntityId=917197&amp;EventId=2753386&amp;CustomerType=0\" target=\"main\">2753386</a>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl04_Type\"><--Choose Product--></span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl04_Source\">PROSPECTING - PHONE</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl04_Vehicle\">Silverado 2500HD</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl04_Status\">6 - Sold</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl04_Assign\">George Sagen</span>\n                                    </td><td>\n                                        <a id=\"objGrid_ctl04_Hyperlink1\" Class=\"GridLink\" SortExpression=\"iEventId\" target=\"main\"> </a>\n                                    </td><td align=\"center\">\n                                        <span id=\"objGrid_ctl04_LstUpdate\">1/9/2015</span>\n                                    </td><td>\n                                        <span id=\"objGrid_ctl04_UpdateBy\">George Sagen</span>\n                                    </td>\r\n\t</tr>\r\n</table>\n                    </div>\n                </div>\n                <div class=\"module-foot\">\n                    <div class=\"module-corner module-corner-ll\">\n                    </div>\n                    <div class=\"module-mid\">\n                    </div>\n                    <div class=\"module-corner module-corner-lr\">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    </form>\n    \n\n<script type=\"text/javascript\">\n    var _gaq = _gaq || [];\n    _gaq.push(['_setAccount', 'UA-3743008-9']);\n    _gaq.push(['_setCustomVar', 1, 'SiteId', '3']);\n    _gaq.push(['_trackPageview']);\n\n    (function () {\n        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n    })(); \n    \n</script>\n\n</body>\n</html>\n",
			"headers": {
				"cache-control": "private",
				"content-type": "text/html; charset=utf-8",
				"set-cookie": [
					"EX_SITE=3; domain=.nightly.dealersocket.com; path=/; secure; HttpOnly",
					"NSC_JO55rtxfbnafhxfeua5misbq2xzdkcm=ffffffff096cd43f45525d5f4f58455e445a4a423660;expires=Sat, 14-Nov-2015 01:09:37 GMT;path=/;secure;httponly"
				],
				"p3p": "CP=\"ADMa DEVa OUR NOR DSP NON COR\"",
				"x-server": "WEB.us.slc.nightly.dealersocket.net",
				"date": "Fri, 13 Nov 2015 21:09:37 GMT",
				"content-length": "19373"
			},
			"request": {
				"uri": {
					"protocol": "https:",
					"slashes": true,
					"auth": null,
					"host": "nightly.dealersocket.com",
					"port": 443,
					"hostname": "nightly.dealersocket.com",
					"hash": null,
					"search": "?SiteId=3&EntityId=917197&errMsg=",
					"query": "SiteId=3&EntityId=917197&errMsg=",
					"pathname": "/CRM/sales/cd_bottom_sales.aspx",
					"path": "/CRM/sales/cd_bottom_sales.aspx?SiteId=3&EntityId=917197&errMsg=",
					"href": "https://nightly.dealersocket.com/CRM/sales/cd_bottom_sales.aspx?SiteId=3&EntityId=917197&errMsg="
				},
				"method": "GET",
				"headers": {
					"connection": "keep-alive",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
					"accept-language": "en-US,en;q=0.8,es-419;q=0.6,es;q=0.4",
					"cookie": "idsrv.xsrf=AAEAAHXYG0NSB1gfgIJTkOTMqmmtoJkw-oWWRSZELApatJNtNbxyfiYEjDA70yDlTZq6OPbqLaSaPYPy92HT1EQ2OxF0jiy7x3EpCZY3eNOQYDdiRQ2Jjigmdtt1XPE9tNR-mTu1Dy4VQuV4zcMinL3KpbZITLtIO8BEe14maUHevUbEIvTub7ORrR0B9lVLP6zzwGFaFgyGrMoXOeiX2y4PlabgHoJqH7yixFy9ecB9fHd_25xamMPOhMwaB2_9EJBQRH3MwgiBkrzYuK_uN6coC-uD_xxxO06NWqeojx9_pBfb2Bp7wWnaPV0uSStA7yGhsFh8Zp_nS9UvtHgGcMWNcV23c9hQ9uB1x9gFeIGiSQd0pkakq8Y8Q96ADcvRgQSuXQABAACbc01bWFB3qB-KIPhfFgJG63xUsAc-MWVmh9neMqVt5MWG_9j_TAshD4WWVwOo6j8Y_PrVlM7kO4pikUfSblcRA9Vy2K9DkZYfWIMV_a1Mj2q-8BNaJQTmw2QRe955CySvAalNJr51ubIKkTmgylI73jCtkdPOJuFFIXNHU9r_w86w_4900pX10amrPoXpAyws6Sng7Qr4PyKfwI9DCbKdHt4y5xx0e7VhwPlhGzTnsUgg2iQwWhs0HH2Of80Pb9GvVturqBS5tpxmx_1kk7aqwuN4H21TF2M9wfeWSH9FaffoMtdHmRt4JVNXjvCU7PmZUBJwyPKUSBqdc1ZBH14-IAAAALNfMMnAV43BJiJBTpAX21UksKEbhpmpl8g9_gYx1ALb; _ga=GA1.1.780078088.1438804030; SignInMessage.65ad7906f38d13524052dfa9c497e6af=AAEAAIYI0UgmN7_XFJW4vYq0QPH-9qVvBVBZqGyxQkwk-ZsPqT4KhBkIjSs2lF1iAFf9Fwgribt2SHKrdS5dD5LI9Kl2YVyi3wlLfJ2R206jMOyChSrcG7M6FwmMl8_PC6uQ_A1xW3M6zA6udn3CEZrozGH66eUh9uwKaphTXp49a51VKkq6ypStcelIar4-oiyd5aMRw9B5rFbn2WG6IlLyrIApqHNige8H6fyVwOxVtj8pV5txPUucfjl9GMUoozNhd0EfcDWXB0dnZGQPYEO_RL234C3YaKOsto41OQf2qHuwDEVISTYsOwFGoRk0C76WAUF7885NVzxZr3BBF5En3EK3c9hQ9uB1x9gFeIGiSQd0pkakq8Y8Q96ADcvRgQSuXQABAACzEeFZoOViJFqx2q9mnlFeVnDdvzES6Su3FfRTbksyOXDcRJHVzCb3gmL7752Ck-Qriaj--l3Ypb6Kf5Tg7RKjWSjjw8qcIFJc6Fx_sD3RZOEdfbFRQY0JhA6Ma54St47gPFwFsjOTghz83wg0UFFt6Ob5JlA5A3JxDYenqRgheZx_lT-Z7WD4oaQNddD14VUUxpGHJI2wLBE2L0jWPZQkGfNN2WFCBaIyQYkWaRgFEsvYKke2Fsd0MXOOFc_qgGrlcxYbnWOaOAPuMrbpiRG0nmKu34-3bHn5i3vWkMnomB3ObdFi16FugMIbDrgq3MoPCEB3lEHZVLdq8pL_6XggoAEAACL6BJPHkufe8mU7y0X5DrSXF5fsnuRLrZNxZZKpKH8M6rvSn7U-i5nn5RQMsQnFwJAOrc2bH6LbCYfvozVd3OFMsUkrLAwhnvUbkHtHuMri_GZGt_QMEl5iWlllFebishspKnqZUhme0tVPC_LjBFlO6uerYhmHCM7Koh_ExmcwHi5YlI6U3ufMwvXFRuJyXAfQY-Tt54fP3cmz-TNMsnlKiL_sX4Fwvg2BP_bTfAWn6ypAcyo9_xBsxvT5Az4RFaHDiH2C5oEfULs0TuLX9Oz8lR0r2ZCEwI2IzodINFO-wdJ7mQt72Wzkw0PbyXOhEUAcf6jgyqMj-nrVjs9qK50x_NZUYkd8quU6XYHyD9O3s75E0DTzUKhQbF3t6cCT2Ta4oML4MFbi04JIGwEYNa8FXLQ-flPc3cTgz_id_xgcg3lnEBTqkN1K4EFQQ1VyuOn71Um-jU17YWHpxI1GgjEDyKN5xdcqm9lXHLNqZfoi1rIGpYsGR97cQ96WJx9exl5Ac5ygjUMsqU5OS5LKvwvJSWjqXaraQUqKFwHAdeXb; SignInMessage.91d53c75eb2b89b5d7d744539107a1ee=AAEAAC3CZOJnfoieGIpnBM2UMeeW9FuauzE8KCRNcH3EcdLjR_vb3We5D5oR0kX2JIwos4QfsSHtShsap5hU3BZJMok7vTaPIJXEjgq7htrBLp3FoEAoXh-obdS8xHUJ7x5lL89CLdhcXzmFV9LZZWpyzaQqfA7mThzki7U_-4XHNKgdUngRNTL6ZPzpBzLlNMHxyOvwV3L_obZ7eX0PersA9UMwW_hBTmJqjof--TJRLdwRiq2dBu04Im0ztvyCxLwKgMFzyZfppNwh-afvWWfa7ajac7ChXvFa-AbVinJ02IUXB7_am5wg-wKzYJfi8GLJZ_s33y5gcQkq5ofWM2gbpeq3c9hQ9uB1x9gFeIGiSQd0pkakq8Y8Q96ADcvRgQSuXQABAABnBYazS8gG3jjpuzlXUwVNJkz9I3o4Dmo9_O3hS8vfMM7Gyne2PTPxhQyuw2sizv3waGoLj1fQx1G1g8l0yLCzFpVOcb_gkM61sktiKQ8BbHSYrupxuy_IxT_QC3PAQSGYtUc46FvM_DcUUUQ3yZ2Po6rWmTaAI1WPhzKo4SXdS5bGNOQ2G2sxUY3SbdCqKVFfW4PxqQblQB0MA_0lDuaKnaGjUirOhp2vtcEE_B6dn0EofiTpAeCwAaPaKJje-xcEd9DQCWVLrLZG2zitUh4OG2mqxVTmZbOO8MWp5ZkESwWVxxFvVXYLZyUqnNHbcUBNKjkaTgg7Gx2arPH03c8XkAEAAD0HHIl5e1gzlnDCAbKoy1koDlgZdKyNPNSe16x3XNG5HgdUa8uP19DwILl2Tgr4dhHa617huGB8m1efFCEXG9IAQyO8zI-nxHs8W4wH7USy-4iB-yAdksDBeeCqpLlgBlX88ZleGubYoGXOYxdpnRnP_1DsIAjBYWRZtGtxCu1WSltWaDcyXGc-v5BPGFgS0Em_PX68yp35wZJaxJalPoPGDm8tWMgM-_NFymjAsUpmlB6fNZxGSEr_Jkg2ri_1A-W3jAxsyEcIuj4LosxNkw5CB_KjhVvQOu-59fs1Gkb8h0gQuxN6U6mMVFSg6yRNxCPRRPJ-lIWkp_zyxZGAYY4IUfROKCUpVUdZRZSV-RTxqEP54Q0uPJSSrm1hsdYoaEHyU9WN_REUwDNqnZwyKrhAhSCKt24aoZKR6WOBwKhp3RBVJyE6_RPXrzMdbDjR0yzapU7wtjKWerapQCiJHcQYI2V8eclyqUrwotqH5grNuld3YpNnUXSa1st6ISK-n2Kob1ROL0w3bPx2ROV6cFE; idsvr.username=AAEAABbnAAKCSF-o169uFWAiP2Q1q6hyr_ddI88KcBwWArU7P_y42JrevWU9hiA1BlpnGJ0GiyNKYP-0O5svawTbAiHhogym1HvSmxaGt4cJuO8TaKC2FcWB_P5OgxZ9hz-siNMcVP9P42KL-bi_3HcKi7hZAMFNZ5HT54zATCN_R7s827XsbXZ10IrBkIyMnTkCVuQzA9hASbHgsGihfrF3XZmi7LlVu_4J440nmYThBUyhQHIionG19DjTwSnqw31YCOA7AZXUCCtWxErnsyRlhDMAkuB6zIEF6zN9iHybAcgBP3TuNr2ym560SEyAGz0MZzJu-4-29pPMgn13DnA3X-e3c9hQ9uB1x9gFeIGiSQd0pkakq8Y8Q96ADcvRgQSuXQABAAAPslB8TYC2dNXIULq7vePyqgtaqQ_HzuDzMi4UKSDA7aGBa23vz-NSRToz3rZYr2wez2g2OnPZuJSWJrsmHhUFpAPnWN1DlpJSw2cmQDE05JhYv2GlqZm86F-X8pxISy9zrRFM6Jztoamvh8QHnmdJ0gbEU3X_nlrZyDrOdjDBSl1F5Jpr9xJNjPxAr0rT101_ffGpy06RcyTTF72VX-s3bUhTmOVb2siITnZjIAhQzKITNDZNSJUV2ugaeLtvloebhWmci0kA6S7hgHCISpGd800tOVCRCiJmO8fl6CcVfZi-VRk3x3dIglSRUqta6ZiVI4DQsPzVEUmrmaVpiPlsEAAAAMNVHTKx-WErbYVhQIwdyDw; SignInMessage.e446dcb668924276df38a252702abca8=AAEAALQlGbPw18dxBLgQ_kQieG-3gDLDuTJKlHWf1C6-6u9lfjfuw7iox3YldXvx1_i7xweYr7QENGx7t7LujY9Xg7wCk-sFSkLSbUTEVwtZK8YfJNYai0thwkYuMiNoHvukKG5ekxMRV4DC0YIyGMDHiWvlLmlUvFCrh7ZMscMhuij75HXYPnsI02FzJxqj21j9oOc_aRJYAF678kZk6CQ-R-a8x1YhL65GukjhoSFYZ6baiQv1Dki21aIyiUq_-dwKs8FQNdSVLTGRFaOn2CbXC719Of6iFDSsV_EFpaytGUjmZrZtfhTEe348tCkstMq1oFRGpFjsWZEry_KYFHdybJ-3c9hQ9uB1x9gFeIGiSQd0pkakq8Y8Q96ADcvRgQSuXQABAACpbQbBgtUpOO4Y5W_sKOVbvLoehFtnmrrly0CCB2uBnU_sey9fyw6YjosYPJKloxRTwi2eI1PDDb4-9-f8_d4dHw-4ABOxsj4H3685bcWKySRstCE0UN0P7wYMoi_vV_7wGYtwQfnPvukhTmzBKmOab_uET8vZZ5Y3qvA1TTm3svlJbkxWTWauPDl4wcsFOR5U8apzJBlAgWpAl18NvIco1WgCKCZ1sGTRfUdat4mdkT5Fk5K9O6j1Hg9liK2Txuq8tl23rcg_SHFC4ZCegsNfZAYKzYZnmHXVGMTdlW73R8Ykdiprf35sueXPfhbNPYR4criJZTJW6uuTjskh3AdzoAEAAHvfju51y_iqMy_e4LhUgPDKDZJjScBrH-fmkWGrP3TbaHXt5Zt2aw-NppAs7Ko7mqSzGI6RarKBgB6pYL18ESfTeQDkWO7gUFQ4FkSwTgmDeVmi4HTCWao-PhIqW5UOkq72hBhiCZmqZwRVyH2Bj0ouHOm792m8HPyEd4tb4Nz4kTs59a6gYtcNFX0rLBMkpTaABK22fC8BnIVd7VW_ITQMeHfXpEP2AwSUoWzyoAgY7dYFvPw2_if7ngkb2EEY52pcXqXwUYQemiQraVlfjUGmV4j9P0ATZErNebLCf3J-3YOs-Qh-FE6nl_JHBjhJUUXkxY1zcIo7tffqVgNk9nwFP9v9Kmir_1cGcn-VfA1ysFTa61xh5VgaBWA-4SGMnOhNHDYsj8SN-q8-jzgIRm1_jKRXT-Uosto1vD7Gu1ApkYMxV8P6loyXJByIFifUQ42wXUCe_X1GjS1z6tgKXysszFt3AweiFT5i_PjZnQVWjTtZVIqn1OPjDFnVKG3mCw_A-vkOD3lt6H5Eda5piv_OOS_p6wzwnbRMITM4PP8a; SignInMessage.d058e80440dd7dab9bb0a885b229bdee=AAEAAHUe6A4ipQJqdTIFVAObm-rlY3Zi5sUR4kY9hKCAa9zDlM20lmcFRTLuLtnzxjrEThFoqqNCXvSY0cjbUWcsAOi0zrzztne6gx4zNuS814WNVudRKGCyVPiflvaY58yV9lwbr7u-zX7r_3vwjeu5MEqlOkacRczDytoHP-fWKRccyYvGvttX-DFkJEjfEsQ8OXHLKjpl_N6mPVKxLrLZAR6EdfoF0oafbAPqysfFIQXA7-9zakJhT81qK5ED73jw3HYL_GlfWNiBPI_5pFEljFBs8joWfXEgD9vJl0M__mCZ5XFUZdyaY0XejObuESFFakvCKL4yFTKoZIR4oL00qQ23c9hQ9uB1x9gFeIGiSQd0pkakq8Y8Q96ADcvRgQSuXQABAACJy5rFyl8HW4mdM8WWlCyO8H2wXUDO_6bHgos4UinzQ1auHbMw0NP6K47prFMuf8eu1imBJq6EFL6_QDuA8n2vlR2KADslktTLAkSLP1MXjjFX-XLu1Obri_QWsoAeunaYVWSXV_XzRkQjoSGR7kZkN0kYJ-Ppf3vjZLm8F-lYMzYRtALUaorIierhbre6VhyGUK4JKq8duxcmrS3NFK50-2AQlgJyEvB-yYKpFGEJEP6b7pGIP64aeNpWJF2vKWb1V4e7msG0eQHcLjZb45AGcGqQMSwTld6vxLxY66WILm1KQXbFl2Y5msC4gotreDazUEViu8ACUUiqR5ip9Ap4oAEAAA3W5TBjGfBoodpB7sGG7mxaQbIAZBH-HqSbBEb7J2KJ-CeGG9l8kkYvP7QEIblbJHc1v-8wyigEyLjVEjJCZUa36KRRpAhobFp270-7viGZEQJIme377_1hCHALejw4-omkUxjzHOqDt9jKGVrYJHY2mu4ML-Mzm2o6oViA1p2Ww5Z-4iAsVXoFA2yFx8_QvKO9yj7vEzUXiHNlCoq5-NMlGLAMfDBaJyXso3VDDI5EipDXExYOOgJEEMeKSokIiEk1po86jfcVHfwgSMRCu02uCqSrKnmA-V-SAZepi2BrO3DYgikxqCscKF9EoFdCpxqBexXMElVbgNLL6lq8l8JAs1sXjs-Ox-ohB5VOK_39VRpD2n40KnAaG0lm_rfD9jeL5jiO5ToqtfMVWivm9qXQwLxLFWgwWWWEmGq2hVQWTwZpqJm9Zob81ujG_qlZRVsPawQp3o6MbTiEOq-qfAGX0qYbiHvY6JET1fYGnAtZKNB85CYscrqRfAkq12-R9qZRn19F3FuGmBeOETInqMYo0hVRxTDEklaBngnN5HEl; NSC_JOfqjzcte1omco1ertbxidb2qmt3tdq=ffffffff096cd53e45525d5f4f58455e445a4a423660; ASP.NET_SessionId=0ru4fldyqr0u5sfpb12bzyja; NewSsoReturnUrl=/CRM/Login.aspx; NewSsoState=11/13/2015 1:53:25 PM1172600877; idsvr.session=cdf14324270a7f6190d529c2480d8d3a; idsrv=AAEAAEHZvdOf98jUxU-_kWUYB34q4Hg4QV6Qz8KPqfPilqySFlsmzMDixiL9h7IhydMGfz-J6_TNOODaBqx8_g_e5pnpDRfwyqKtp1cybtYjsm5woG43wy9e-kYYrgo3zErGTMNEZgoRnKZjtSngopPsy9SYKJvJCPRpYjL-U7mMpYdmqN5iJKJvC0-GAtIwjZQNfDaU5t2Wr8acpPaKjz_7cWQ4CDgfz85a983i21KncqvWaUcYj3N0iDzWhj1lOvUasd5ymFY4agewNfQfuae5ABwkCaVpCJ-77zu8B_7mjZcn81sxS3QoV1j7AqU9WrbkV6FCeRV0iECIAzZBwt3hbZq3c9hQ9uB1x9gFeIGiSQd0pkakq8Y8Q96ADcvRgQSuXQABAABxw_uPTB-2r3YVt0oIpaq_e9-D_L0hHCyyBaNkVGfmtGWvmhU7CToTDP42D8OsYEMtvwadBMZE2F2lEJeNtqu_XiHrhM5oT7FWXL4pj7tRQkuE82bIHnDMFGZVdw73o4_AF6gY3p4umNmoRuWAacxB-0IUqvblM6i6f5eZk9obLJ9_scK26ivFtKmHmZtoZZytmFJFqPXsuIDxtogZxyo-WzXKhe_SJjEVZcnhFJMVPaMC8ZhtmkNYd-KNcPK6wFQdkYmD6kUCDwqv7xRbWCqdUFR0AhevsRjC-PHybcXlRXu0k55cTcC_GMlwb5gwYav0kh9jEl3J5RJnz8DxAz5mAAEAAGrUEtVrLGPw2RWexUGLaMfItmv3ikgAdZdPqU62G2KSnlU2bRb4AqkNMnY9Udh3CtL-k7xitefBgBew1fU2vdJAAchCj7lNDFmBE4vYl0_-psQ1KJht_jhYStxjawwcgEIhrzTL1dfGGyoPhvU6b670Cja6pQxaWyA2V8W-WUk_h2t1gmiXYrUMi0ya3fg4sm9CpHHgc_Iz5UNk5TkrYoaDyDi8bFxRC1R6GWrG9MnLZWbEczUcVvufwHYqwztouv-nZjVfm4k3u11YFYAtPx0gXJvzJJmNVII0a-cu2wUe7l3BnWuaVuAXxgat7o2cYHLa3GH9RXX2VK3bTdGffOU; id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1UUk5CMlRFaXhsYmp1MXp6cEE2Z1BTVjJMQSIsImtpZCI6Ii1UUk5CMlRFaXhsYmp1MXp6cEE2Z1BTVjJMQSJ9.eyJub25jZSI6Inh5eiIsImlhdCI6MTQ0NzQ0ODAwNywiYXRfaGFzaCI6InRQUmVERUs3STYxcmRoY1lGTF9zdkEiLCJzdWIiOiI5Mjk2OTkzIiwiYW1yIjpbInBhc3N3b3JkIl0sImF1dGhfdGltZSI6MTQ0NzQ0ODAwNywiaWRwIjoiaWRzcnYiLCJpc3MiOiJodHRwczovL25pZ2h0bHkuZGVhbGVyc29ja2V0LmNvbSIsImF1ZCI6ImltcGxpY2l0Y2xpZW50IiwiZXhwIjoxNDQ3NDUxNjA3LCJuYmYiOjE0NDc0NDgwMDd9.GKjckTKSIUKeek5Sot5kuH1aXuFUgJR67LIQhCRwwtR7fNNSbLdXXEW6sZXqONZHyXOXH-NHT1l1a4zwJ9j0xWybTO4L7voRrKMDYZXHG3811IxZWzXs1AmqetBBflFsrqQf5u17TK5bmt81aaE5MR7iq6diWuDjwgJB5s5Qvj0wwgesiawTtjsJPArAZRpdn9H68eg3Z6D7ZYmcNIxOsmG5ScWv64CuCuock0-EhY_AM7yob9KRXo7zL6b3g6t93vM0lZEy9qBtOYcZsgtCvTTghxUvWS7a7_USDrH1ThotJsKJ-6kaJ97XycxFvtEZfoleVo3XgZU17EMz-WVnng; RP_si=3; RP_rp=GEN; RP_dc=1; RP_app=erKMZ9GLjhM=; .aspxAUTH=FC0967BDF515B7BE02E71AF207A99BFE07FAC77752146C5BF31B8F00FEAC4300BEF1A7AC004FCF1ADBA7322C5B4983DA466546A903C3742927738A90A50818EE07066806C126E374D54FDD54; Flex-Language=en_US; EX_SITE=3; NSC_JOm40b4zdmi2titcregchfcz2slwrdq=ffffffff096cd43f45525d5f4f58455e445a4a423660",
					"if-none-match": "W/\"7b9e-OgPiQhQ32sBgGsOFWL9kBA\"",
					"referer": "https://nightly.dealersocket.com/CRM/sales/cd_bottom_sales.aspx?SiteId=3&EntityId=917197&errMsg="
				}
			}
		},
		"body": "Success",
		"statusCode": 200
	};

/***/ },

/***/ 776:
/***/ function(module, exports) {

	module.exports = {
		"Types": [
			{
				"value": "100050",
				"text": "New"
			},
			{
				"value": "100051",
				"text": "Additional/Renewal"
			},
			{
				"value": "250122",
				"text": "OEM Relationship"
			},
			{
				"value": "100055",
				"text": "Unknown"
			}
		],
		"PurchaseTypes": [
			{
				"value": "100280",
				"text": "DealerSocket"
			},
			{
				"value": "1003049",
				"text": "Sales Module"
			},
			{
				"value": "250161",
				"text": "Service Module"
			},
			{
				"value": "250008",
				"text": "Survey Module"
			},
			{
				"value": "1002851",
				"text": "Desking"
			}
		],
		"SalesSources": [
			{
				"value": "1008006",
				"text": "DJ test source"
			},
			{
				"value": "1003057",
				"text": "PROSPECTING - WALK IN"
			},
			{
				"value": "1003058",
				"text": "WEBSITE"
			},
			{
				"value": "1003059",
				"text": "MAILER"
			},
			{
				"value": "250018",
				"text": "INTERNAL REF"
			},
			{
				"value": "1003965",
				"text": "Territory Consultant"
			},
			{
				"value": "242",
				"text": "Web"
			},
			{
				"value": "951",
				"text": "PARTNER/MANUF"
			},
			{
				"value": "1009511",
				"text": "RevenueRadar"
			}
		],
		"TrackingCodes": [
			{
				"value": "1574",
				"text": "1- Automotive News M"
			},
			{
				"value": "1584",
				"text": "1- Fixed Ops Magazin"
			},
			{
				"value": "1707",
				"text": "1- Info USA Email Bl"
			},
			{
				"value": "1595",
				"text": "1- NADA             "
			},
			{
				"value": "1573",
				"text": "1- Wards Magazine Ad"
			},
			{
				"value": "1592",
				"text": "1- Website          "
			},
			{
				"value": "2131",
				"text": "102                 "
			},
			{
				"value": "2132",
				"text": "103                 "
			}
		],
		"Rankings": [
			{
				"value": "230",
				"text": "1 - Hot"
			},
			{
				"value": "231",
				"text": "2 - Medium"
			},
			{
				"value": "232",
				"text": "3 - Cold"
			},
			{
				"value": "233",
				"text": "4 - Disqualified"
			}
		],
		"CloseDates": [
			{
				"value": "1008007",
				"text": "DJ test Forecast"
			},
			{
				"value": "1002927",
				"text": "Need Co-Signer"
			},
			{
				"value": "1002925",
				"text": "No Qualify"
			},
			{
				"value": "100301",
				"text": "60 Days"
			},
			{
				"value": "100302",
				"text": "90 Days"
			}
		],
		"Franchises": [
			{
				"value": "8",
				"text": "Ken Garff Honda"
			},
			{
				"value": "29",
				"text": "Acura Franchise1"
			}
		],
		"PrimaryAssigned": [
			{
				"value": "fsajenkins",
				"text": "Aaron Jenkins"
			},
			{
				"value": "fsajohnson",
				"text": "Aaron Johnson"
			},
			{
				"value": "fsamcbride",
				"text": "Aaron McBride"
			},
			{
				"value": "fsadaniel",
				"text": "Adam Daniel"
			},
			{
				"value": "fsanichols",
				"text": "Adam Nichols"
			}
		],
		"SecondaryAssigned": [
			{
				"value": "fsajenkins",
				"text": "Aaron Jenkins"
			},
			{
				"value": "fsajohnson",
				"text": "Aaron Johnson"
			},
			{
				"value": "fsamcbride",
				"text": "Aaron McBride"
			},
			{
				"value": "fsahobby",
				"text": "Amos Hobby"
			},
			{
				"value": "fszbarge",
				"text": "Zeke Barge"
			}
		],
		"BDCAssigned": [
			{
				"value": "fsajenkins",
				"text": "Aaron Jenkins"
			},
			{
				"value": "fsajohnson",
				"text": "Aaron Johnson"
			},
			{
				"value": "fsamcbride",
				"text": "Aaron McBride"
			},
			{
				"value": "fsadaniel",
				"text": "Adam Daniel"
			}
		],
		"ResolutionCode1": [
			{
				"value": "1004510",
				"text": "Future Interest"
			},
			{
				"value": "290",
				"text": "Price/Value"
			},
			{
				"value": "291",
				"text": "Fit/Features"
			},
			{
				"value": "292",
				"text": "Selling Skills"
			},
			{
				"value": "295",
				"text": "No Response"
			},
			{
				"value": "296",
				"text": "Disqualified"
			},
			{
				"value": "297",
				"text": "Lost To Competitor"
			},
			{
				"value": "298",
				"text": "Other"
			},
			{
				"value": "200084",
				"text": "Turned to BDC"
			}
		],
		"ResolutionCode2": {
			"290": [
				{
					"value": "320",
					"text": "Discount"
				},
				{
					"value": "321",
					"text": "Monthly Payment"
				},
				{
					"value": "322",
					"text": "Down Payment"
				},
				{
					"value": "323",
					"text": "Finance/Lease Rate"
				},
				{
					"value": "324",
					"text": "Trade In"
				}
			],
			"291": [
				{
					"value": "364",
					"text": "Performance"
				},
				{
					"value": "365",
					"text": "Economy"
				},
				{
					"value": "366",
					"text": "Safety"
				},
				{
					"value": "327",
					"text": "Color"
				},
				{
					"value": "328",
					"text": "Options"
				},
				{
					"value": "325",
					"text": "Availability"
				},
				{
					"value": "326",
					"text": "Package"
				},
				{
					"value": "329",
					"text": "Model"
				},
				{
					"value": "363",
					"text": "Brand"
				}
			],
			"292": [
				{
					"value": "370",
					"text": "Relationship"
				},
				{
					"value": "371",
					"text": "Follow Up"
				},
				{
					"value": "372",
					"text": "Objections"
				}
			],
			"296": [
				{
					"value": "380",
					"text": "Budget"
				},
				{
					"value": "381",
					"text": "Bad Credit"
				},
				{
					"value": "382",
					"text": "Negative Equity"
				}
			],
			"297": [
				{
					"value": "367",
					"text": "Same Make"
				},
				{
					"value": "368",
					"text": "Other Make"
				}
			],
			"298": [
				{
					"value": "200368",
					"text": "Invalid Number"
				},
				{
					"value": "200369",
					"text": "Invalid Email"
				},
				{
					"value": "200370",
					"text": "Not in Market"
				}
			],
			"200084": [
				{
					"value": "200086",
					"text": "Hot"
				},
				{
					"value": "200087",
					"text": "Medium"
				},
				{
					"value": "200088",
					"text": "Cold"
				}
			],
			"200400": [
				{
					"value": "200401",
					"text": "Bad Contact"
				},
				{
					"value": "200402",
					"text": "Bad Phone #"
				},
				{
					"value": "200403",
					"text": "Bad Email"
				}
			]
		},
		"StatusSteps": [
			{
				"value": "220",
				"text": "0 - Unqualified"
			},
			{
				"value": "221",
				"text": "1 - Up/Contacted"
			},
			{
				"value": "227",
				"text": "2 - Store Visit"
			},
			{
				"value": "222",
				"text": "3 - Demo Vehicle"
			},
			{
				"value": "223",
				"text": "4 - Write-Up"
			},
			{
				"value": "224",
				"text": "5 - Pending F&I"
			},
			{
				"value": "228"
			},
			{
				"value": "225",
				"text": "6 - Sold"
			},
			{
				"value": "226",
				"text": "7 - Lost"
			}
		]
	};

/***/ },

/***/ 777:
/***/ function(module, exports) {

	module.exports = {
		"$type": "SalesOpportunity",
		"Id": "1008",
		"BuyerId": "165461",
		"CoBuyerId": "1265446",
		"BuyerContacts": [
			{
				"$type": "TypedReference<Contact>",
				"Types": [
					"Buyer"
				],
				"Contact": {
					"Id": "165461",
					"Address": {
						"$type": "Address",
						"Address1": "4071 MINUET COURT",
						"Address2": "",
						"Address3": "",
						"City": "WEST VALLEY CITY",
						"State": "UT",
						"PostalCode": "84119",
						"County": "",
						"Country": "USA",
						"isComplete": true
					},
					"Email": [],
					"SocialMedia": {
						"$type": "SocialMediaCollection",
						"Other": null,
						"Facebook": null,
						"Twitter": null,
						"LinkedIn": null
					},
					"Note": "",
					"ImgUrl": "",
					"Connections": null,
					"Active": false,
					"Deleted": false,
					"Created": null,
					"Source": {
						"value": "1002851",
						"text": "Phone Up"
					},
					"Status": {
						"value": "328",
						"text": "Active"
					},
					"ContactType": {
						"value": "306",
						"text": "Customer"
					},
					"ContactSubtype": {
						"value": "698",
						"text": "Platinum"
					},
					"LastModified": null,
					"CreatedBy": null,
					"LastModifiedBy": null,
					"GlobalId": null,
					"ExternalReferences": [],
					"GmInfo": {
						"GmState": "0",
						"SurrogateId": null
					},
					"$type": "Person",
					"Name": {
						"$type": "PersonName",
						"First": "Deloris",
						"Middle": "",
						"Last": "Gilbert",
						"Friendly": "",
						"Phonetic": "",
						"Prefix": {
							"value": "",
							"text": ""
						},
						"Suffix": ""
					},
					"Phones": {
						"$type": "PersonPhoneCollection",
						"Home": {
							"$type": "Phone",
							"Number": "8019687483",
							"Extension": null,
							"Preferred": false
						},
						"Work": null,
						"Mobile": null,
						"Fax": null,
						"Other": null,
						"DncOption": ""
					},
					"Birthday": "",
					"Gender": "Male",
					"DriversLicense": "",
					"CompanyName": null,
					"ExternalReferenceId": "",
					"PreferredLanguage": {
						"value": "140",
						"text": "English"
					},
					"NeverContactVia": {
						"value": "314",
						"text": ""
					},
					"Income": {
						"value": "109",
						"text": "Blank"
					},
					"HasSSN": false
				}
			},
			{
				"$type": "TypedReference<Contact>",
				"Types": [
					"CoBuyer"
				],
				"Contact": {
					"Id": "1265446",
					"Address": {
						"$type": "Address",
						"Address1": "First Line",
						"Address2": "Second Line",
						"Address3": "",
						"City": "Orem",
						"State": "UT",
						"PostalCode": "84097",
						"County": "Utah",
						"Country": "USA",
						"isComplete": true
					},
					"Email": [
						{
							"$type": "Email",
							"Type": "Personal",
							"Address": "test@test.com",
							"Preferred": true
						}
					],
					"SocialMedia": {
						"$type": "SocialMediaCollection",
						"Other": null,
						"Facebook": {
							"UserName": "FB"
						},
						"Twitter": {
							"UserName": "TW"
						},
						"LinkedIn": null
					},
					"Note": "Danger",
					"ImgUrl": "",
					"Connections": null,
					"Active": false,
					"Deleted": false,
					"Created": null,
					"Source": {
						"value": "1002850",
						"text": "Fresh Up"
					},
					"Status": {
						"value": "328",
						"text": "Active"
					},
					"ContactType": {
						"value": "305",
						"text": "Prospect"
					},
					"ContactSubtype": {
						"value": "944",
						"text": "Credit"
					},
					"LastModified": null,
					"CreatedBy": null,
					"LastModifiedBy": null,
					"GlobalId": null,
					"ExternalReferences": [
						{
							"$type": "ExternalReference",
							"Id": "9",
							"ExternalReferenceId": "undefined",
							"Franchise": ""
						}
					],
					"GmInfo": {
						"GmState": "0",
						"SurrogateId": null
					},
					"$type": "Person",
					"Name": {
						"$type": "PersonName",
						"First": "Will",
						"Middle": "M",
						"Last": "Robinson",
						"Friendly": "Rob",
						"Phonetic": "",
						"Prefix": {
							"value": "",
							"text": ""
						},
						"Suffix": ""
					},
					"Phones": {
						"$type": "PersonPhoneCollection",
						"Home": {
							"$type": "Phone",
							"Number": "1212121211",
							"Extension": null,
							"Preferred": false
						},
						"Work": {
							"$type": "Phone",
							"Number": "8018675309",
							"Extension": null,
							"Preferred": false
						},
						"Mobile": {
							"$type": "Phone",
							"Number": "3333333333",
							"Extension": null,
							"Preferred": false
						},
						"Fax": null,
						"Other": null,
						"DncOption": ""
					},
					"Birthday": "09/11/1965",
					"Gender": "Male",
					"DriversLicense": "121516",
					"CompanyName": "Century Fox",
					"ExternalReferenceId": "",
					"PreferredLanguage": {
						"text": null
					},
					"NeverContactVia": {
						"value": "314",
						"text": "Don&apos;t Contact (Internal)"
					},
					"Income": {
						"value": "304",
						"text": "Blank"
					},
					"HasSSN": true
				}
			}
		],
		"AssignedUsers": [
			{
				"value": "kgapehrson",
				"text": "DealerSocket Automation"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			}
		],
		"VehiclesOfInterest": [
			{
				"$type": "VehicleOfInterest",
				"Id": "21",
				"StockNumber": "25",
				"Vin": "456",
				"Make": "Bugatti",
				"Model": "Veyron",
				"Trim": "Base",
				"Year": "2015",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "BIG",
				"Transmission": "Manual",
				"Style": null,
				"FuelEfficiency": null,
				"ChromeStyleId": "12345",
				"Odometer": "8",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/bugatti-veyron-super-sport-.jpg?itok=CwYkkjOl"
				],
				"Preferred": true,
				"MSRP": "$1000",
				"Price": "$200",
				"ModelCode": "RAD",
				"Class": {
					"value": "3",
					"text": "Pickup Truck"
				},
				"AdditionalOptions": "None",
				"ExteriorColor": "White",
				"InteriorColor": "Black",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$50",
				"LotLocation": "112",
				"Franchise": "DealerSocket",
				"FuelType": "Gas",
				"CityMiles": "4",
				"HighwayMiles": "6",
				"Condition": "Used",
				"DaysOnLot": "12"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": "888007",
				"StockNumber": null,
				"Vin": "2CNFLEEW0A6413830",
				"Make": "Chevrolet",
				"Model": "Equinox",
				"Trim": "LT w/1LT",
				"Year": "2010",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": "Automatic",
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://content.homenetiol.com/2000464/2078698/640x480/stock_images/5/2010CHE007a_640/2010CHE007a_640_01.jpg"
				],
				"Preferred": false,
				"MSRP": "$15,000",
				"Price": "$14,998",
				"ModelCode": "1LK26",
				"Class": {
					"value": "6",
					"text": "SUV"
				},
				"AdditionalOptions": "",
				"Exterior": "Cyber Gray Metallic",
				"Interior": "",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$",
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": "Gasoline Fuel",
				"CityMiles": "20",
				"HighwayMiles": "29",
				"Condition": "Used",
				"DaysOnLot": "217"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": 5400747,
				"StockNumber": "GG348012",
				"Vin": "5XYZUDLA8GG348012",
				"Make": "Hyundai",
				"Model": "Santa Fe Sport",
				"Trim": "",
				"Year": "2016",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": null,
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [],
				"Preferred": null,
				"MSRP": "$17,628.00",
				"Price": "$17,000.00",
				"ModelCode": "63442A45",
				"Class": {
					"value": "-1",
					"text": ""
				},
				"AdditionalOptions": "",
				"Exterior": "",
				"Interior": "",
				"Drivetrain": null,
				"CashDown": null,
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": null,
				"CityMiles": null,
				"HighwayMiles": null,
				"Condition": "New",
				"DaysOnLot": "125"
			}
		],
		"LastUpdatedOrSoldDate": "1/21/2012",
		"StatusText": "6 - Sold",
		"DealershipId": "154",
		"DmsNumber": "17",
		"Status": {
			"value": "225",
			"text": "6 - Sold"
		},
		"Description": "I woke up in a new Bugatti",
		"Type": {
			"value": "100050",
			"text": "New Vehicle"
		},
		"PurchaseType": {
			"value": "100280",
			"text": "DealerSocket Purchase Type"
		},
		"Source": {
			"value": "241",
			"text": "DJ test source"
		},
		"TrackingCode": {
			"value": "3168",
			"text": "2-MonsterAd"
		},
		"Ranking": {
			"value": "230",
			"text": "1 - Hot"
		},
		"ExpectedClose": {
			"value": "100303",
			"text": "DJ test Forecast"
		},
		"Franchise": {
			"value": "8",
			"text": "DealerSocket"
		},
		"ResolutionCode1": {
			"value": "290",
			"text": "Price/Value"
		},
		"ResolutionCode2": {
			"value": "322",
			"text": "Down Payment"
		},
		"CompletionDate": "",
		"hasPings": true
	};

/***/ },

/***/ 778:
/***/ function(module, exports) {

	module.exports = {
		"$type": "SalesOpportunity",
		"Id": "8675342",
		"BuyerContacts": [
			{
				"$type": "TypedReference<Contact>",
				"Types": [
					"Buyer"
				],
				"Contact": {
					"Id": "3",
					"Address": {
						"$type": "Address",
						"Address1": "12456 Test Lane",
						"Address2": "",
						"Address3": "",
						"City": "Youngstown",
						"State": "FL",
						"PostalCode": "",
						"County": "",
						"Country": "",
						"isComplete": false
					},
					"Email": [
						{
							"$type": "Email",
							"Type": "Personal",
							"Address": "rteegarden@dealersocket.com",
							"Preferred": false
						}
					],
					"SocialMedia": {
						"$type": "SocialMediaCollection",
						"Other": null,
						"Facebook": null,
						"Twitter": null,
						"LinkedIn": null
					},
					"Note": "",
					"ImgUrl": "",
					"Connections": null,
					"Active": false,
					"Deleted": false,
					"Created": null,
					"Source": null,
					"Status": null,
					"ContactType": null,
					"ContactSubtype": null,
					"LastModified": null,
					"CreatedBy": null,
					"LastModifiedBy": null,
					"GlobalId": null,
					"ExternalReferences": [],
					"GmInfo": {
						"GmState": null,
						"SurrogateId": null
					},
					"$type": "Person",
					"Name": {
						"$type": "PersonName",
						"First": "Test",
						"Middle": "",
						"Last": "Tester",
						"Friendly": "",
						"Phonetic": "",
						"Prefix": null,
						"Suffix": ""
					},
					"Phones": {
						"$type": "PersonPhoneCollection",
						"Home": {
							"$type": "Phone",
							"Number": "(123) 456-7890",
							"Extension": null,
							"Preferred": false
						},
						"Work": {
							"$type": "Phone",
							"Number": "(234) 567-8909",
							"Extension": null,
							"Preferred": false
						},
						"Mobile": {
							"$type": "Phone",
							"Number": "(345) 678-9098",
							"Extension": null,
							"Preferred": false
						},
						"Fax": null,
						"Other": null,
						"DncOption": ""
					},
					"Birthday": "",
					"Gender": "",
					"DriversLicense": "",
					"CompanyName": "",
					"ExternalReferenceId": "",
					"PreferredLanguage": null,
					"NeverContactVia": null,
					"Income": null,
					"HasSSN": false
				}
			}
		],
		"AssignedUsers": [
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"text": "",
				"value": ""
			},
			{
				"text": "",
				"value": ""
			}
		],
		"VehiclesOfInterest": [
			{
				"$type": "VehicleOfInterest",
				"Id": "0",
				"StockNumber": "",
				"Vin": "",
				"Make": "",
				"Model": "",
				"Trim": "",
				"Year": "",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "",
				"Transmission": "",
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "",
				"Cylinders": 0,
				"ExteriorColor": null,
				"InteriorColor": null,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [],
				"Preferred": true,
				"MSRP": "",
				"Price": "",
				"ModelCode": "",
				"Class": {
					"text": null
				},
				"AdditionalOptions": "",
				"Exterior": "",
				"Interior": "",
				"Drivetrain": "",
				"CashDown": "",
				"LotLocation": "",
				"Franchise": "",
				"FuelType": "",
				"CityMiles": "",
				"HighwayMiles": "",
				"Condition": "",
				"DaysOnLot": "-1"
			}
		],
		"LastUpdatedOrSoldDate": "4/25/2016",
		"StatusText": "0 - Unqualified",
		"DealershipId": "154",
		"DmsNumber": "",
		"Status": {
			"value": "220",
			"text": "0 - Unqualified"
		},
		"Description": "",
		"Type": {
			"value": "100050",
			"text": "New Vehicle"
		},
		"PurchaseType": {
			"value": "100280",
			"text": "Unknown"
		},
		"Source": {
			"value": "240",
			"text": "Fresh Up"
		},
		"TrackingCode": {
			"value": "2317",
			"text": "2-Other             "
		},
		"Ranking": {
			"value": "230",
			"text": "1 - Hot"
		},
		"ExpectedClose": {
			"value": "100303",
			"text": "Over 2 Months"
		},
		"Franchise": {
			"value": "8",
			"text": "Ken Garff Honda"
		},
		"ResolutionCode1": {
			"value": "0",
			"text": null
		},
		"ResolutionCode2": {
			"value": "0",
			"text": null
		},
		"CompletionDate": ""
	};

/***/ },

/***/ 779:
/***/ function(module, exports) {

	module.exports = [
		{
			"key": "220",
			"value": "0 - Prospecting"
		},
		{
			"key": "221",
			"value": "1 - Qualified Contact"
		},
		{
			"key": "227",
			"value": "2 - Store Visit"
		},
		{
			"key": "222",
			"value": "3 - Demo"
		},
		{
			"key": "223",
			"value": "4 - Confirmed"
		},
		{
			"key": "224",
			"value": "5 - Proposal"
		},
		{
			"key": "225",
			"value": "6 - Sold"
		},
		{
			"key": "228",
			"value": "7 - Lost"
		}
	];

/***/ },

/***/ 780:
/***/ function(module, exports) {

	module.exports = {
		"$type": "SalesOpportunity",
		"Id": "8675340",
		"BuyerContacts": [
			{
				"$type": "TypedReference<Contact>",
				"Id": "165461",
				"Types": [
					"Buyer"
				]
			}
		],
		"AssignedUsers": [
			{
				"value": "akalam",
				"text": "A kalam"
			},
			{
				"text": "",
				"value": ""
			},
			{
				"text": "",
				"value": ""
			}
		],
		"VehiclesOfInterest": [
			{
				"$type": "VehicleOfInterest",
				"Id": "20",
				"Preferred": true,
				"VehiclePrice": "$250,000",
				"Vin": "556671",
				"Year": "1992",
				"Make": "Subaru",
				"Model": "Jungler",
				"ModelCode": "CULT",
				"Class": {
					"value": "-1",
					"text": ""
				},
				"AdditionalOptions": "",
				"Exterior": "Red",
				"Interior": "Yellow",
				"Drivetrain": "",
				"CashDown": "$30,000",
				"LotLocation": "",
				"Franchise": "",
				"Engine": "",
				"FuelType": "",
				"Transmission": "",
				"Trim": "",
				"CityMiles": "0",
				"HighwayMiles": "0",
				"Odometer": "0",
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null
			}
		],
		"LastUpdatedOrSoldDate": "1/21/2016",
		"StatusText": "5 - Pending F&I",
		"DealershipId": "154",
		"DmsNumber": "",
		"Status": {
			"value": "224",
			"text": "5 - Pending F&I"
		},
		"Description": "",
		"Type": {
			"value": "100050",
			"text": "New Vehicle"
		},
		"PurchaseType": {
			"value": "100280",
			"text": "Unknown"
		},
		"Source": {
			"value": "240",
			"text": "Fresh Up"
		},
		"TrackingCode": {
			"value": "0",
			"text": ""
		},
		"Ranking": {
			"value": "230",
			"text": "1 - Hot"
		},
		"ExpectedClose": {
			"value": "100303",
			"text": "Over 2 Months"
		},
		"Franchise": {
			"value": "8",
			"text": "Ken Garff Honda"
		},
		"ResolutionCode1": {
			"value": "0",
			"text": null
		},
		"ResolutionCode2": {
			"value": "0",
			"text": null
		},
		"CompletionDate": ""
	};

/***/ },

/***/ 781:
/***/ function(module, exports) {

	module.exports = {
		"Type": {
			"value": "100050",
			"text": "New Vehicle"
		},
		"PurchaseType": {
			"value": "100280",
			"text": "Unknown"
		},
		"SalesSource": {
			"value": "240",
			"text": "Fresh Up"
		},
		"TrackingCode": {
			"value": "0",
			"text": ""
		},
		"Ranking": {
			"value": "230",
			"text": "1 - Hot"
		},
		"CloseDate": {
			"value": "100303",
			"text": "Over 2 Months"
		},
		"Franchise": {
			"value": "8",
			"text": "Ken Garff Honda"
		}
	};

/***/ },

/***/ 782:
/***/ function(module, exports) {

	module.exports = {
		"$type": "SalesOpportunity",
		"Id": "1008",
		"BuyerId": 123,
		"BuyerContacts": [
			{
				"$type": "TypedReference<Contact>",
				"Types": [
					"Buyer"
				],
				"Contact": {
					"Id": "165461",
					"Address": {
						"$type": "Address",
						"Address1": "4071 MINUET COURT",
						"Address2": "",
						"Address3": "",
						"City": "WEST VALLEY CITY",
						"State": "UT",
						"PostalCode": "84119",
						"County": "",
						"Country": "USA",
						"isComplete": true
					},
					"Email": [],
					"SocialMedia": {
						"$type": "SocialMediaCollection",
						"Other": null,
						"Facebook": null,
						"Twitter": null,
						"LinkedIn": null
					},
					"Note": "",
					"ImgUrl": "",
					"Connections": null,
					"Active": false,
					"Deleted": false,
					"Created": null,
					"Source": {
						"value": "1002851",
						"text": "Phone Up"
					},
					"Status": {
						"value": "328",
						"text": "Active"
					},
					"ContactType": {
						"value": "306",
						"text": "Customer"
					},
					"ContactSubtype": {
						"value": "698",
						"text": "Platinum"
					},
					"LastModified": null,
					"CreatedBy": null,
					"LastModifiedBy": null,
					"GlobalId": null,
					"ExternalReferences": [],
					"GmInfo": {
						"GmState": "0",
						"SurrogateId": null
					},
					"$type": "Person",
					"Name": {
						"$type": "PersonName",
						"First": "Deloris",
						"Middle": "",
						"Last": "Gilbert",
						"Friendly": "",
						"Phonetic": "",
						"Prefix": {
							"value": "",
							"text": ""
						},
						"Suffix": ""
					},
					"Phones": {
						"$type": "PersonPhoneCollection",
						"Home": {
							"$type": "Phone",
							"Number": "8019687483",
							"Extension": null,
							"Preferred": false
						},
						"Work": null,
						"Mobile": null,
						"Fax": null,
						"Other": null,
						"DncOption": ""
					},
					"Birthday": "",
					"Gender": "Male",
					"DriversLicense": "",
					"CompanyName": null,
					"ExternalReferenceId": "",
					"PreferredLanguage": {
						"value": "140",
						"text": "English"
					},
					"NeverContactVia": {
						"value": "314",
						"text": ""
					},
					"Income": {
						"value": "109",
						"text": "Blank"
					},
					"HasSSN": false
				}
			}
		],
		"AssignedUsers": [
			{
				"value": "kgapehrson",
				"text": "DealerSocket Automation"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			}
		],
		"VehiclesOfInterest": [
			{
				"$type": "VehicleOfInterest",
				"Id": "21",
				"StockNumber": "25",
				"Vin": "456",
				"Make": "Bugatti",
				"Model": "Veyron",
				"Trim": "Base",
				"Year": "2015",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "BIG",
				"Transmission": "Manual",
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "8",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/bugatti-veyron-super-sport-.jpg?itok=CwYkkjOl"
				],
				"Preferred": true,
				"MSRP": "$1000",
				"Price": "$200",
				"ModelCode": "RAD",
				"Class": {
					"value": "3",
					"text": "Pickup Truck"
				},
				"AdditionalOptions": "None",
				"ExteriorColor": "White",
				"InteriorColor": "Black",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$50",
				"LotLocation": "112",
				"Franchise": "DealerSocket",
				"FuelType": "Gas",
				"CityMiles": "4",
				"HighwayMiles": "6",
				"Condition": "Used",
				"DaysOnLot": "12"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": "888007",
				"StockNumber": "R022840A",
				"Vin": "2CNFLEEW0A6413830",
				"Make": "Chevrolet",
				"Model": "Equinox",
				"Trim": "LT w/1LT",
				"Year": "2010",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": "Automatic",
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://content.homenetiol.com/2000464/2078698/640x480/stock_images/5/2010CHE007a_640/2010CHE007a_640_01.jpg"
				],
				"Preferred": false,
				"MSRP": "$15,000",
				"Price": "$14,998",
				"ModelCode": "1LK26",
				"Class": {
					"value": "6",
					"text": "SUV"
				},
				"AdditionalOptions": "",
				"Exterior": "Cyber Gray Metallic",
				"Interior": "",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$",
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": "Gasoline Fuel",
				"CityMiles": "20",
				"HighwayMiles": "29",
				"Condition": "Used",
				"DaysOnLot": "217"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": 5400747,
				"StockNumber": "GG348012",
				"Vin": "5XYZUDLA8GG348012",
				"Make": "Hyundai",
				"Model": "Santa Fe Sport",
				"Trim": "",
				"Year": "2016",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": null,
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [],
				"Preferred": null,
				"MSRP": "$17,628.00",
				"Price": "$17,000.00",
				"ModelCode": "63442A45",
				"Class": {
					"value": "-1",
					"text": ""
				},
				"AdditionalOptions": "",
				"Exterior": "",
				"Interior": "",
				"Drivetrain": null,
				"CashDown": null,
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": null,
				"CityMiles": null,
				"HighwayMiles": null,
				"Condition": "New",
				"DaysOnLot": "125"
			}
		],
		"LastUpdatedOrSoldDate": "1/21/2012",
		"StatusText": "5 - Pending F&I",
		"DealershipId": "154",
		"DmsNumber": "17",
		"Status": {
			"value": "224",
			"text": "5 - Pending F&I"
		},
		"Description": "I woke up in a new Bugatti",
		"Type": {
			"value": "100050",
			"text": "New Vehicle"
		},
		"PurchaseType": {
			"value": "100280",
			"text": "DealerSocket Purchase Type"
		},
		"Source": {
			"value": "241",
			"text": "DJ test source"
		},
		"TrackingCode": {
			"value": "3168",
			"text": "2-MonsterAd"
		},
		"Ranking": {
			"value": "230",
			"text": "0 - Unknown"
		},
		"ExpectedClose": {
			"value": "100303",
			"text": "DJ test Forecast"
		},
		"Franchise": {
			"value": "8",
			"text": "DealerSocket"
		},
		"ResolutionCode1": {
			"value": "290",
			"text": "Price/Value"
		},
		"ResolutionCode2": {
			"value": "322",
			"text": "Down Payment"
		},
		"CompletionDate": ""
	};

/***/ },

/***/ 783:
/***/ function(module, exports) {

	module.exports = {
		"view": true,
		"edit": true
	};

/***/ },

/***/ 784:
/***/ function(module, exports) {

	module.exports = {
		"SalesInfo": {
			"PrimaryAssigned": [
				{
					"value": "akalam",
					"text": "A kalam"
				},
				{
					"value": "kgaharper",
					"text": "Adam Harper"
				},
				{
					"value": "kgakramer",
					"text": "Al Kramer"
				},
				{
					"value": "kgallic",
					"text": "Alli Cerruti"
				},
				{
					"value": "testentity",
					"text": "AlohaQA test"
				},
				{
					"value": "kgATest",
					"text": "Alpana Wadhwa"
				},
				{
					"value": "ame3",
					"text": "Ameeta kghqa"
				},
				{
					"value": "asaxena",
					"text": "Ameeta Saxena"
				},
				{
					"value": "kgawysst",
					"text": "Andrea Test (KG)"
				},
				{
					"value": "kgawyss",
					"text": "Andrea Wyss (KG)"
				},
				{
					"value": "kgandy",
					"text": "Andy Test"
				},
				{
					"value": "kgapehrson",
					"text": "Angie Pehrson"
				},
				{
					"value": "kgbarneyc",
					"text": "Barney Carlson"
				},
				{
					"value": "kgbcarpent",
					"text": "Bill Carpenter"
				},
				{
					"value": "kgbtest",
					"text": "Boyce Test (KGH)"
				},
				{
					"value": "kgbcrapo",
					"text": "Brandon Crapo"
				},
				{
					"value": "kgbhopkins",
					"text": "Brett Hopkins"
				},
				{
					"value": "kgbgeorge",
					"text": "Brian George"
				},
				{
					"value": "kgbfathers",
					"text": "Bruce Fathers"
				},
				{
					"value": "kgcdimond",
					"text": "Carolyn Dimond"
				},
				{
					"value": "kgccarmody",
					"text": "Chris Carmody"
				},
				{
					"value": "kgchrisl",
					"text": "Chris Lenker"
				},
				{
					"value": "testent01",
					"text": "D07508 Test"
				},
				{
					"value": "testent012",
					"text": "D7508 test"
				},
				{
					"value": "kgdavidl",
					"text": "David Lytle"
				},
				{
					"value": "kgdavel",
					"text": "David Lytle"
				},
				{
					"value": "kgdel",
					"text": "Delete Queue"
				},
				{
					"value": "fsadhawal",
					"text": "Dhawal J"
				},
				{
					"value": "kgdking",
					"text": "Don King"
				},
				{
					"value": "kgejeppson",
					"text": "Eddie Jeppson"
				},
				{
					"value": "kgedr",
					"text": "Edgar Reporter"
				},
				{
					"value": "kgewilson",
					"text": "Erin Wilson"
				},
				{
					"value": "fake",
					"text": "Fake Fake"
				},
				{
					"value": "finster",
					"text": "Finbarr Kiely"
				},
				{
					"value": "kggartha",
					"text": "Garth Allred"
				},
				{
					"value": "kgiqueue",
					"text": "Internet Queue"
				},
				{
					"value": "kgjframpto",
					"text": "Jason Frampton"
				},
				{
					"value": "kgjclawson",
					"text": "Jeremy Clawson"
				},
				{
					"value": "jimh",
					"text": "Jim Hutson"
				},
				{
					"value": "jblow",
					"text": "Joe Blow"
				},
				{
					"value": "kgjuryan",
					"text": "Joel Uryan"
				},
				{
					"value": "testfinan",
					"text": "John Tester"
				},
				{
					"value": "johntest",
					"text": "Johnny Test"
				},
				{
					"value": "kgjulied",
					"text": "Julie Dougall"
				},
				{
					"value": "kgkhewtest",
					"text": "Kimball Hewtest"
				},
				{
					"value": "kgkvreeken",
					"text": "Kris Vreeken"
				},
				{
					"value": "kgKrishna",
					"text": "Krishna Ashok"
				},
				{
					"value": "kglschomak",
					"text": "Lance Schomaker"
				},
				{
					"value": "kglmcelrea",
					"text": "Laurie McElreath"
				},
				{
					"value": "kgljones",
					"text": "Leland Jones"
				},
				{
					"value": "kgmboehlen",
					"text": "Mark Boehlen"
				},
				{
					"value": "kgmarkm",
					"text": "Mark Mamulski"
				},
				{
					"value": "kgmterry",
					"text": "Mike Terry"
				},
				{
					"value": "kgOEMTeste",
					"text": "OEM Tester"
				},
				{
					"value": "pldrosa",
					"text": "Paulo L Rosa"
				},
				{
					"value": "puser",
					"text": "phantom user"
				},
				{
					"value": "kgphillj",
					"text": "Phillip Johnson"
				},
				{
					"value": "kgwho",
					"text": "Phone Queue"
				},
				{
					"value": "154QA",
					"text": "QA Queue"
				},
				{
					"value": "raj",
					"text": "raj samy"
				},
				{
					"value": "kgrcook",
					"text": "Rebecca Cook Anderson"
				},
				{
					"value": "kgrec",
					"text": "Receptionist Receptionist"
				},
				{
					"value": "kgrprows",
					"text": "Rhett Prows"
				},
				{
					"value": "kgrjudson",
					"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
				},
				{
					"value": "kgrbrown",
					"text": "Ron Brown"
				},
				{
					"value": "kgrbales",
					"text": "Russ Bales"
				},
				{
					"value": "154Sales",
					"text": "Sales Queue"
				},
				{
					"value": "kgshewett",
					"text": "Sarah Hewtest (KGH)"
				},
				{
					"value": "kgsburgess",
					"text": "Scott Burgess"
				},
				{
					"value": "ckSElgram",
					"text": "Scott Elgram (CK)"
				},
				{
					"value": "kgSElgram",
					"text": "Scott Elgram (KG)"
				},
				{
					"value": "kgslayton",
					"text": "Scott Layton"
				},
				{
					"value": "kgsmiles",
					"text": "Scott Miles"
				},
				{
					"value": "kgSTest",
					"text": "Scott Test"
				},
				{
					"value": "154Service",
					"text": "Service Queue"
				},
				{
					"value": "kgshenriqu",
					"text": "Sherice Henriquez"
				},
				{
					"value": "kgsblum",
					"text": "Slater Blum"
				},
				{
					"value": "kgstuser1",
					"text": "SocketTalk User1"
				},
				{
					"value": "kgstuser2",
					"text": "SocketTalk User2"
				},
				{
					"value": "kgstuser3",
					"text": "SocketTalk User3"
				},
				{
					"value": "kgsschubac",
					"text": "Stan Schubach"
				},
				{
					"value": "kgspolityk",
					"text": "Steve Polityka"
				},
				{
					"value": "kgsbales",
					"text": "Surr Bales"
				},
				{
					"value": "taratest",
					"text": "Tara Turkzadeh"
				},
				{
					"value": "kgtaylorj",
					"text": "Taylor Johnson"
				},
				{
					"value": "kgtblock",
					"text": "Therese Block"
				},
				{
					"value": "kgtwilkins",
					"text": "Trevor Wilkins"
				},
				{
					"value": "kgwpeterse",
					"text": "Wayne Petersen"
				}
			],
			"SalesManager": [
				{
					"value": "0",
					"text": "<-- Select -->"
				},
				{
					"value": "akalam",
					"text": "A kalam"
				},
				{
					"value": "kgaharper",
					"text": "Adam Harper"
				},
				{
					"value": "kgakramer",
					"text": "Al Kramer"
				},
				{
					"value": "kgallic",
					"text": "Alli Cerruti"
				},
				{
					"value": "testentity",
					"text": "AlohaQA test"
				},
				{
					"value": "kgATest",
					"text": "Alpana Wadhwa"
				},
				{
					"value": "ame3",
					"text": "Ameeta kghqa"
				},
				{
					"value": "asaxena",
					"text": "Ameeta Saxena"
				},
				{
					"value": "kgawysst",
					"text": "Andrea Test (KG)"
				},
				{
					"value": "kgawyss",
					"text": "Andrea Wyss (KG)"
				},
				{
					"value": "kgandy",
					"text": "Andy Test"
				},
				{
					"value": "kgapehrson",
					"text": "Angie Pehrson"
				},
				{
					"value": "kgbarneyc",
					"text": "Barney Carlson"
				},
				{
					"value": "kgbcarpent",
					"text": "Bill Carpenter"
				},
				{
					"value": "kgbtest",
					"text": "Boyce Test (KGH)"
				},
				{
					"value": "kgbcrapo",
					"text": "Brandon Crapo"
				},
				{
					"value": "kgbhopkins",
					"text": "Brett Hopkins"
				},
				{
					"value": "kgbgeorge",
					"text": "Brian George"
				},
				{
					"value": "kgbfathers",
					"text": "Bruce Fathers"
				},
				{
					"value": "kgcdimond",
					"text": "Carolyn Dimond"
				},
				{
					"value": "kgccarmody",
					"text": "Chris Carmody"
				},
				{
					"value": "kgchrisl",
					"text": "Chris Lenker"
				},
				{
					"value": "testent01",
					"text": "D07508 Test"
				},
				{
					"value": "testent012",
					"text": "D7508 test"
				},
				{
					"value": "kgdavidl",
					"text": "David Lytle"
				},
				{
					"value": "kgdavel",
					"text": "David Lytle"
				},
				{
					"value": "kgdel",
					"text": "Delete Queue"
				},
				{
					"value": "fsadhawal",
					"text": "Dhawal J"
				},
				{
					"value": "kgdking",
					"text": "Don King"
				},
				{
					"value": "kgejeppson",
					"text": "Eddie Jeppson"
				},
				{
					"value": "kgedr",
					"text": "Edgar Reporter"
				},
				{
					"value": "kgewilson",
					"text": "Erin Wilson"
				},
				{
					"value": "fake",
					"text": "Fake Fake"
				},
				{
					"value": "finster",
					"text": "Finbarr Kiely"
				},
				{
					"value": "kggartha",
					"text": "Garth Allred"
				},
				{
					"value": "kgiqueue",
					"text": "Internet Queue"
				},
				{
					"value": "kgjframpto",
					"text": "Jason Frampton"
				},
				{
					"value": "kgjclawson",
					"text": "Jeremy Clawson"
				},
				{
					"value": "jimh",
					"text": "Jim Hutson"
				},
				{
					"value": "jblow",
					"text": "Joe Blow"
				},
				{
					"value": "kgjuryan",
					"text": "Joel Uryan"
				},
				{
					"value": "testfinan",
					"text": "John Tester"
				},
				{
					"value": "johntest",
					"text": "Johnny Test"
				},
				{
					"value": "kgjulied",
					"text": "Julie Dougall"
				},
				{
					"value": "kgkhewtest",
					"text": "Kimball Hewtest"
				},
				{
					"value": "kgkvreeken",
					"text": "Kris Vreeken"
				},
				{
					"value": "kgKrishna",
					"text": "Krishna Ashok"
				},
				{
					"value": "kglschomak",
					"text": "Lance Schomaker"
				},
				{
					"value": "kglmcelrea",
					"text": "Laurie McElreath"
				},
				{
					"value": "kgljones",
					"text": "Leland Jones"
				},
				{
					"value": "kgmboehlen",
					"text": "Mark Boehlen"
				},
				{
					"value": "kgmarkm",
					"text": "Mark Mamulski"
				},
				{
					"value": "kgmterry",
					"text": "Mike Terry"
				},
				{
					"value": "kgOEMTeste",
					"text": "OEM Tester"
				},
				{
					"value": "pldrosa",
					"text": "Paulo L Rosa"
				},
				{
					"value": "puser",
					"text": "phantom user"
				},
				{
					"value": "kgphillj",
					"text": "Phillip Johnson"
				},
				{
					"value": "kgwho",
					"text": "Phone Queue"
				},
				{
					"value": "154QA",
					"text": "QA Queue"
				},
				{
					"value": "raj",
					"text": "raj samy"
				},
				{
					"value": "kgrcook",
					"text": "Rebecca Cook Anderson"
				},
				{
					"value": "kgrec",
					"text": "Receptionist Receptionist"
				},
				{
					"value": "kgrprows",
					"text": "Rhett Prows"
				},
				{
					"value": "kgrjudson",
					"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
				},
				{
					"value": "kgrbrown",
					"text": "Ron Brown"
				},
				{
					"value": "kgrbales",
					"text": "Russ Bales"
				},
				{
					"value": "154Sales",
					"text": "Sales Queue"
				},
				{
					"value": "kgshewett",
					"text": "Sarah Hewtest (KGH)"
				},
				{
					"value": "kgsburgess",
					"text": "Scott Burgess"
				},
				{
					"value": "ckSElgram",
					"text": "Scott Elgram (CK)"
				},
				{
					"value": "kgSElgram",
					"text": "Scott Elgram (KG)"
				},
				{
					"value": "kgslayton",
					"text": "Scott Layton"
				},
				{
					"value": "kgsmiles",
					"text": "Scott Miles"
				},
				{
					"value": "kgSTest",
					"text": "Scott Test"
				},
				{
					"value": "154Service",
					"text": "Service Queue"
				},
				{
					"value": "kgshenriqu",
					"text": "Sherice Henriquez"
				},
				{
					"value": "kgsblum",
					"text": "Slater Blum"
				},
				{
					"value": "kgstuser1",
					"text": "SocketTalk User1"
				},
				{
					"value": "kgstuser2",
					"text": "SocketTalk User2"
				},
				{
					"value": "kgstuser3",
					"text": "SocketTalk User3"
				},
				{
					"value": "kgsschubac",
					"text": "Stan Schubach"
				},
				{
					"value": "kgspolityk",
					"text": "Steve Polityka"
				},
				{
					"value": "kgsbales",
					"text": "Surr Bales"
				},
				{
					"value": "taratest",
					"text": "Tara Turkzadeh"
				},
				{
					"value": "kgtaylorj",
					"text": "Taylor Johnson"
				},
				{
					"value": "kgtblock",
					"text": "Therese Block"
				},
				{
					"value": "kgtwilkins",
					"text": "Trevor Wilkins"
				},
				{
					"value": "kgwpeterse",
					"text": "Wayne Petersen"
				}
			],
			"FiManager": [
				{
					"value": "0",
					"text": "<-- Select -->"
				},
				{
					"value": "akalam",
					"text": "A kalam"
				},
				{
					"value": "kgaharper",
					"text": "Adam Harper"
				},
				{
					"value": "kgakramer",
					"text": "Al Kramer"
				},
				{
					"value": "kgallic",
					"text": "Alli Cerruti"
				},
				{
					"value": "testentity",
					"text": "AlohaQA test"
				},
				{
					"value": "kgATest",
					"text": "Alpana Wadhwa"
				},
				{
					"value": "ame3",
					"text": "Ameeta kghqa"
				},
				{
					"value": "asaxena",
					"text": "Ameeta Saxena"
				},
				{
					"value": "kgawysst",
					"text": "Andrea Test (KG)"
				},
				{
					"value": "kgawyss",
					"text": "Andrea Wyss (KG)"
				},
				{
					"value": "kgandy",
					"text": "Andy Test"
				},
				{
					"value": "kgapehrson",
					"text": "Angie Pehrson"
				},
				{
					"value": "kgbarneyc",
					"text": "Barney Carlson"
				},
				{
					"value": "kgbcarpent",
					"text": "Bill Carpenter"
				},
				{
					"value": "kgbtest",
					"text": "Boyce Test (KGH)"
				},
				{
					"value": "kgbcrapo",
					"text": "Brandon Crapo"
				},
				{
					"value": "kgbhopkins",
					"text": "Brett Hopkins"
				},
				{
					"value": "kgbgeorge",
					"text": "Brian George"
				},
				{
					"value": "kgbfathers",
					"text": "Bruce Fathers"
				},
				{
					"value": "kgcdimond",
					"text": "Carolyn Dimond"
				},
				{
					"value": "kgccarmody",
					"text": "Chris Carmody"
				},
				{
					"value": "kgchrisl",
					"text": "Chris Lenker"
				},
				{
					"value": "testent01",
					"text": "D07508 Test"
				},
				{
					"value": "testent012",
					"text": "D7508 test"
				},
				{
					"value": "kgdavidl",
					"text": "David Lytle"
				},
				{
					"value": "kgdavel",
					"text": "David Lytle"
				},
				{
					"value": "kgdel",
					"text": "Delete Queue"
				},
				{
					"value": "fsadhawal",
					"text": "Dhawal J"
				},
				{
					"value": "kgdking",
					"text": "Don King"
				},
				{
					"value": "kgejeppson",
					"text": "Eddie Jeppson"
				},
				{
					"value": "kgedr",
					"text": "Edgar Reporter"
				},
				{
					"value": "kgewilson",
					"text": "Erin Wilson"
				},
				{
					"value": "fake",
					"text": "Fake Fake"
				},
				{
					"value": "finster",
					"text": "Finbarr Kiely"
				},
				{
					"value": "kggartha",
					"text": "Garth Allred"
				},
				{
					"value": "kgiqueue",
					"text": "Internet Queue"
				},
				{
					"value": "kgjframpto",
					"text": "Jason Frampton"
				},
				{
					"value": "kgjclawson",
					"text": "Jeremy Clawson"
				},
				{
					"value": "jimh",
					"text": "Jim Hutson"
				},
				{
					"value": "jblow",
					"text": "Joe Blow"
				},
				{
					"value": "kgjuryan",
					"text": "Joel Uryan"
				},
				{
					"value": "testfinan",
					"text": "John Tester"
				},
				{
					"value": "johntest",
					"text": "Johnny Test"
				},
				{
					"value": "kgjulied",
					"text": "Julie Dougall"
				},
				{
					"value": "kgkhewtest",
					"text": "Kimball Hewtest"
				},
				{
					"value": "kgkvreeken",
					"text": "Kris Vreeken"
				},
				{
					"value": "kgKrishna",
					"text": "Krishna Ashok"
				},
				{
					"value": "kglschomak",
					"text": "Lance Schomaker"
				},
				{
					"value": "kglmcelrea",
					"text": "Laurie McElreath"
				},
				{
					"value": "kgljones",
					"text": "Leland Jones"
				},
				{
					"value": "kgmboehlen",
					"text": "Mark Boehlen"
				},
				{
					"value": "kgmarkm",
					"text": "Mark Mamulski"
				},
				{
					"value": "kgmterry",
					"text": "Mike Terry"
				},
				{
					"value": "kgOEMTeste",
					"text": "OEM Tester"
				},
				{
					"value": "pldrosa",
					"text": "Paulo L Rosa"
				},
				{
					"value": "puser",
					"text": "phantom user"
				},
				{
					"value": "kgphillj",
					"text": "Phillip Johnson"
				},
				{
					"value": "kgwho",
					"text": "Phone Queue"
				},
				{
					"value": "154QA",
					"text": "QA Queue"
				},
				{
					"value": "raj",
					"text": "raj samy"
				},
				{
					"value": "kgrcook",
					"text": "Rebecca Cook Anderson"
				},
				{
					"value": "kgrec",
					"text": "Receptionist Receptionist"
				},
				{
					"value": "kgrprows",
					"text": "Rhett Prows"
				},
				{
					"value": "kgrjudson",
					"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
				},
				{
					"value": "kgrbrown",
					"text": "Ron Brown"
				},
				{
					"value": "kgrbales",
					"text": "Russ Bales"
				},
				{
					"value": "154Sales",
					"text": "Sales Queue"
				},
				{
					"value": "kgshewett",
					"text": "Sarah Hewtest (KGH)"
				},
				{
					"value": "kgsburgess",
					"text": "Scott Burgess"
				},
				{
					"value": "ckSElgram",
					"text": "Scott Elgram (CK)"
				},
				{
					"value": "kgSElgram",
					"text": "Scott Elgram (KG)"
				},
				{
					"value": "kgslayton",
					"text": "Scott Layton"
				},
				{
					"value": "kgsmiles",
					"text": "Scott Miles"
				},
				{
					"value": "kgSTest",
					"text": "Scott Test"
				},
				{
					"value": "154Service",
					"text": "Service Queue"
				},
				{
					"value": "kgshenriqu",
					"text": "Sherice Henriquez"
				},
				{
					"value": "kgsblum",
					"text": "Slater Blum"
				},
				{
					"value": "kgstuser1",
					"text": "SocketTalk User1"
				},
				{
					"value": "kgstuser2",
					"text": "SocketTalk User2"
				},
				{
					"value": "kgstuser3",
					"text": "SocketTalk User3"
				},
				{
					"value": "kgsschubac",
					"text": "Stan Schubach"
				},
				{
					"value": "kgspolityk",
					"text": "Steve Polityka"
				},
				{
					"value": "kgsbales",
					"text": "Surr Bales"
				},
				{
					"value": "taratest",
					"text": "Tara Turkzadeh"
				},
				{
					"value": "kgtaylorj",
					"text": "Taylor Johnson"
				},
				{
					"value": "kgtblock",
					"text": "Therese Block"
				},
				{
					"value": "kgtwilkins",
					"text": "Trevor Wilkins"
				},
				{
					"value": "kgwpeterse",
					"text": "Wayne Petersen"
				}
			],
			"SalesType": [
				{
					"value": "100050",
					"text": "New Vehicle"
				},
				{
					"value": "100051",
					"text": "Used Vehicle"
				},
				{
					"value": "100052",
					"text": "Future Model"
				},
				{
					"value": "100053",
					"text": "Factory Order"
				},
				{
					"value": "100055",
					"text": "Unknown"
				},
				{
					"value": "100056",
					"text": "CPO"
				}
			],
			"PurchaseType": [
				{
					"value": "100134",
					"text": "Cash"
				},
				{
					"value": "100136",
					"text": "Finance"
				},
				{
					"value": "100135",
					"text": "Lease"
				},
				{
					"value": "1001370",
					"text": "Balloon"
				}
			]
		},
		"PaymentInfo": {
			"PaymentInterval": [
				{
					"value": "B",
					"text": "Bi-Weekly"
				},
				{
					"value": "M",
					"text": "Monthly"
				},
				{
					"value": "S",
					"text": "Semi-Monthly"
				},
				{
					"value": "W",
					"text": "Weekly"
				}
			]
		},
		"CoBuyer": {
			"State": [
				{
					"value": "AK",
					"text": "AK"
				},
				{
					"value": "AL",
					"text": "AL"
				},
				{
					"value": "AR",
					"text": "AR"
				},
				{
					"value": "AZ",
					"text": "AZ"
				},
				{
					"value": "CA",
					"text": "CA"
				},
				{
					"value": "CO",
					"text": "CO"
				},
				{
					"value": "CT",
					"text": "CT"
				},
				{
					"value": "DC",
					"text": "DC"
				},
				{
					"value": "DE",
					"text": "DE"
				},
				{
					"value": "FL",
					"text": "FL"
				},
				{
					"value": "GA",
					"text": "GA"
				},
				{
					"value": "HI",
					"text": "HI"
				},
				{
					"value": "IA",
					"text": "IA"
				},
				{
					"value": "ID",
					"text": "ID"
				},
				{
					"value": "IL",
					"text": "IL"
				},
				{
					"value": "IN",
					"text": "IN"
				},
				{
					"value": "KS",
					"text": "KS"
				},
				{
					"value": "KY",
					"text": "KY"
				},
				{
					"value": "LA",
					"text": "LA"
				},
				{
					"value": "MA",
					"text": "MA"
				},
				{
					"value": "MD",
					"text": "MD"
				},
				{
					"value": "ME",
					"text": "ME"
				},
				{
					"value": "MI",
					"text": "MI"
				},
				{
					"value": "MN",
					"text": "MN"
				},
				{
					"value": "MO",
					"text": "MO"
				},
				{
					"value": "MS",
					"text": "MS"
				},
				{
					"value": "MT",
					"text": "MT"
				},
				{
					"value": "NC",
					"text": "NC"
				},
				{
					"value": "ND",
					"text": "ND"
				},
				{
					"value": "NE",
					"text": "NE"
				},
				{
					"value": "NH",
					"text": "NH"
				},
				{
					"value": "NJ",
					"text": "NJ"
				},
				{
					"value": "NM",
					"text": "NM"
				},
				{
					"value": "NV",
					"text": "NV"
				},
				{
					"value": "NY",
					"text": "NY"
				},
				{
					"value": "OH",
					"text": "OH"
				},
				{
					"value": "OK",
					"text": "OK"
				},
				{
					"value": "OR",
					"text": "OR"
				},
				{
					"value": "PA",
					"text": "PA"
				},
				{
					"value": "RI",
					"text": "RI"
				},
				{
					"value": "SC",
					"text": "SC"
				},
				{
					"value": "SD",
					"text": "SD"
				},
				{
					"value": "TN",
					"text": "TN"
				},
				{
					"value": "TX",
					"text": "TX"
				},
				{
					"value": "UT",
					"text": "UT"
				},
				{
					"value": "VA",
					"text": "VA"
				},
				{
					"value": "VT",
					"text": "VT"
				},
				{
					"value": "WA",
					"text": "WA"
				},
				{
					"value": "WI",
					"text": "WI"
				},
				{
					"value": "WV",
					"text": "WV"
				},
				{
					"value": "WY",
					"text": "WY"
				},
				{
					"value": "AE",
					"text": "AE"
				},
				{
					"value": "AP",
					"text": "AP"
				},
				{
					"value": "PR",
					"text": "PR"
				},
				{
					"value": "GU",
					"text": "GU"
				}
			]
		}
	};

/***/ },

/***/ 785:
/***/ function(module, exports) {

	module.exports = {
		"PrimaryBuyer": {
			"Name": "Nobuo Uematsu",
			"Email": "DancingMad@test.com",
			"MobilePhone": "9876543210",
			"HomePhone": "3215555555",
			"WorkPhone": "8525555555",
			"Address": "123 Fake St"
		},
		"PurchasedVehicle": {
			"Description": "2012 Nissan Skyline GT-R",
			"StockNumber": "S104856A",
			"Vin": "19XFB2F54CE300591",
			"Series": "GT-R",
			"CurrentOdometer": "123456",
			"Transmission": "Manual",
			"Cylinder": "6"
		},
		"TradesInfo": [
			{
				"Description": "2010 Chevrolet Corvette",
				"Vin": "19XFB2F54CE300591"
			}
		],
		"SalesInfo": {
			"PurchaseDate": "12/12/2012",
			"PrimaryAssigned": {
				"value": "kgaharper",
				"text": "Adam Harper"
			},
			"SalesManager": {
				"value": "kgsblum",
				"text": "Slater Blum"
			},
			"FiManager": {
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			"SalesType": {
				"value": "100051",
				"text": "Used Vehicle"
			},
			"PurchaseType": {
				"value": "100134",
				"text": "Cash"
			},
			"DmsNumber": "8675341"
		},
		"WarrantyPrices": {
			"ExtendedWarranty": 235789,
			"ExistingVcs": 131802430,
			"AhInsurance": 2,
			"Odometer": 123249,
			"Gap": 7378,
			"Life": 0
		},
		"PaymentInfo": {
			"Msrp": 12,
			"ResidualValue": 12,
			"SalePrice": 13,
			"CashDown": 0,
			"Term": "0",
			"AprMf": "0.000000",
			"TermExpiration": "4/23/2043",
			"Payment": 78452.89,
			"NumberOfPayments": "8675309",
			"PaymentInterval": {
				"value": "M",
				"text": "Monthly"
			},
			"Lender": "stefan strangee",
			"Rebate": 11.12,
			"OdometerAllowance": "8"
		},
		"TradeDealRecap": {
			"Allowance": 3882.23,
			"Payoff": 1212
		},
		"CoBuyer": {
			"FirstName": "Cyan",
			"LastName": "Garamonde",
			"Address": "123 Buddy Ave",
			"City": "Doma",
			"State": {
				"value": "WI",
				"text": "WI"
			},
			"ZipCode": "84111",
			"MobilePhone": "5555555",
			"HomePhone": "5555555",
			"Email": "SamuraiGuy@buddy.com",
			"DateOfBirth": "4/5/1956"
		},
		"BankGross": {
			"FinanceReserve": 32342,
			"Gap": 23,
			"Ah": 25,
			"SvcContract": 231,
			"OtherBackGross": 2352,
			"TotalBackGross": 2350
		},
		"FrontGross": 3580,
		"TotalGross": 2359
	};

/***/ },

/***/ 786:
/***/ function(module, exports) {

	module.exports = {
		"$type": "SalesOpportunity",
		"Id": "1008",
		"BuyerId": 123,
		"BuyerContacts": [
			{
				"$type": "TypedReference<Contact>",
				"Types": [
					"Buyer"
				],
				"Contact": {
					"Id": "165461",
					"Address": {
						"$type": "Address",
						"Address1": "4071 MINUET COURT",
						"Address2": "",
						"Address3": "",
						"City": "WEST VALLEY CITY",
						"State": "UT",
						"PostalCode": "84119",
						"County": "",
						"Country": "USA",
						"isComplete": true
					},
					"Email": [],
					"SocialMedia": {
						"$type": "SocialMediaCollection",
						"Other": null,
						"Facebook": null,
						"Twitter": null,
						"LinkedIn": null
					},
					"Note": "",
					"ImgUrl": "",
					"Connections": null,
					"Active": false,
					"Deleted": false,
					"Created": null,
					"Source": {
						"value": "1002851",
						"text": "Phone Up"
					},
					"Status": {
						"value": "328",
						"text": "Active"
					},
					"ContactType": {
						"value": "306",
						"text": "Customer"
					},
					"ContactSubtype": {
						"value": "698",
						"text": "Platinum"
					},
					"LastModified": null,
					"CreatedBy": null,
					"LastModifiedBy": null,
					"GlobalId": null,
					"ExternalReferences": [],
					"GmInfo": {
						"GmState": "0",
						"SurrogateId": null
					},
					"$type": "Person",
					"Name": {
						"$type": "PersonName",
						"First": "Deloris",
						"Middle": "",
						"Last": "Gilbert",
						"Friendly": "",
						"Phonetic": "",
						"Prefix": {
							"value": "",
							"text": ""
						},
						"Suffix": ""
					},
					"Phones": {
						"$type": "PersonPhoneCollection",
						"Home": {
							"$type": "Phone",
							"Number": "8019687483",
							"Extension": null,
							"Preferred": false
						},
						"Work": null,
						"Mobile": null,
						"Fax": null,
						"Other": null,
						"DncOption": ""
					},
					"Birthday": "",
					"Gender": "Male",
					"DriversLicense": "",
					"CompanyName": null,
					"ExternalReferenceId": "",
					"PreferredLanguage": {
						"value": "140",
						"text": "English"
					},
					"NeverContactVia": {
						"value": "314",
						"text": ""
					},
					"Income": {
						"value": "109",
						"text": "Blank"
					},
					"HasSSN": false
				}
			}
		],
		"AssignedUsers": [
			{
				"value": "kgapehrson",
				"text": "DealerSocket Automation"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			}
		],
		"VehiclesOfInterest": [
			{
				"$type": "VehicleOfInterest",
				"Id": "21",
				"StockNumber": "25",
				"Vin": "456",
				"Make": "Bugatti",
				"Model": "Veyron",
				"Trim": "Base",
				"Year": "2015",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "BIG",
				"Transmission": "Manual",
				"Style": null,
				"FuelEfficiency": null,
				"ChromeStyleId": "12345",
				"Odometer": "8",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/bugatti-veyron-super-sport-.jpg?itok=CwYkkjOl"
				],
				"Preferred": true,
				"MSRP": "$1000",
				"Price": "$200",
				"ModelCode": "RAD",
				"Class": {
					"value": "3",
					"text": "Pickup Truck"
				},
				"AdditionalOptions": "None",
				"ExteriorColor": "White",
				"InteriorColor": "Black",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$50",
				"LotLocation": "112",
				"Franchise": "DealerSocket",
				"FuelType": "Gas",
				"CityMiles": "4",
				"HighwayMiles": "6",
				"Condition": "Used",
				"DaysOnLot": "12"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": "888007",
				"StockNumber": "R022840A",
				"Vin": "2CNFLEEW0A6413830",
				"Make": "Chevrolet",
				"Model": "Equinox",
				"Trim": "LT w/1LT",
				"Year": "2010",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": "Automatic",
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://content.homenetiol.com/2000464/2078698/640x480/stock_images/5/2010CHE007a_640/2010CHE007a_640_01.jpg"
				],
				"Preferred": false,
				"MSRP": "$15,000",
				"Price": "$14,998",
				"ModelCode": "1LK26",
				"Class": {
					"value": "6",
					"text": "SUV"
				},
				"AdditionalOptions": "",
				"Exterior": "Cyber Gray Metallic",
				"Interior": "",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$",
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": "Gasoline Fuel",
				"CityMiles": "20",
				"HighwayMiles": "29",
				"Condition": "Used",
				"DaysOnLot": "217"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": 5400747,
				"StockNumber": "GG348012",
				"Vin": "5XYZUDLA8GG348012",
				"Make": "Hyundai",
				"Model": "Santa Fe Sport",
				"Trim": "",
				"Year": "2016",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": null,
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [],
				"Preferred": null,
				"MSRP": "$17,628.00",
				"Price": "$17,000.00",
				"ModelCode": "63442A45",
				"Class": {
					"value": "-1",
					"text": ""
				},
				"AdditionalOptions": "",
				"Exterior": "",
				"Interior": "",
				"Drivetrain": null,
				"CashDown": null,
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": null,
				"CityMiles": null,
				"HighwayMiles": null,
				"Condition": "New",
				"DaysOnLot": "125"
			}
		],
		"LastUpdatedOrSoldDate": "1/21/2012",
		"StatusText": "6 - Sold",
		"DealershipId": "154",
		"DmsNumber": "17",
		"Status": {
			"value": "225",
			"text": "6 - Sold"
		},
		"Description": "I woke up in a new Bugatti",
		"Type": {
			"value": "100050",
			"text": "New Vehicle"
		},
		"PurchaseType": {
			"value": "100280",
			"text": "DealerSocket Purchase Type"
		},
		"Source": {
			"value": "241",
			"text": "DJ test source"
		},
		"TrackingCode": {
			"value": "3168",
			"text": "2-MonsterAd"
		},
		"Ranking": {
			"value": "230",
			"text": "1 - Hot"
		},
		"ExpectedClose": {
			"value": "100303",
			"text": "DJ test Forecast"
		},
		"Franchise": {
			"value": "8",
			"text": "DealerSocket"
		},
		"ResolutionCode1": {
			"value": "290",
			"text": "Price/Value"
		},
		"ResolutionCode2": {
			"value": "322",
			"text": "Down Payment"
		},
		"CompletionDate": ""
	};

/***/ },

/***/ 787:
/***/ function(module, exports) {

	module.exports = {
		"$type": "SalesOpportunity",
		"Id": "777",
		"BuyerId": 165461,
		"CoBuyerId": 1265446,
		"BuyerContacts": [
			{
				"$type": "TypedReference<Contact>",
				"Types": [
					"Buyer"
				],
				"Contact": {
					"Id": "165461",
					"Address": {
						"$type": "Address",
						"Address1": "4071 MINUET COURT",
						"Address2": "",
						"Address3": "",
						"City": "WEST VALLEY CITY",
						"State": "UT",
						"PostalCode": "84119",
						"County": "",
						"Country": "USA",
						"isComplete": true
					},
					"Email": [],
					"SocialMedia": {
						"$type": "SocialMediaCollection",
						"Other": null,
						"Facebook": null,
						"Twitter": null,
						"LinkedIn": null
					},
					"Note": "",
					"ImgUrl": "",
					"Connections": null,
					"Active": false,
					"Deleted": false,
					"Created": null,
					"Source": {
						"value": "1002851",
						"text": "Phone Up"
					},
					"Status": {
						"value": "328",
						"text": "Active"
					},
					"ContactType": {
						"value": "306",
						"text": "Customer"
					},
					"ContactSubtype": {
						"value": "698",
						"text": "Platinum"
					},
					"LastModified": null,
					"CreatedBy": null,
					"LastModifiedBy": null,
					"GlobalId": null,
					"ExternalReferences": [],
					"GmInfo": {
						"GmState": "0",
						"SurrogateId": null
					},
					"$type": "Person",
					"Name": {
						"$type": "PersonName",
						"First": "Deloris",
						"Middle": "",
						"Last": "Gilbert",
						"Friendly": "",
						"Phonetic": "",
						"Prefix": {
							"value": "",
							"text": ""
						},
						"Suffix": ""
					},
					"Phones": {
						"$type": "PersonPhoneCollection",
						"Home": {
							"$type": "Phone",
							"Number": "8019687483",
							"Extension": null,
							"Preferred": false
						},
						"Work": null,
						"Mobile": null,
						"Fax": null,
						"Other": null,
						"DncOption": ""
					},
					"Birthday": "",
					"Gender": "Male",
					"DriversLicense": "",
					"CompanyName": null,
					"ExternalReferenceId": "",
					"PreferredLanguage": {
						"value": "140",
						"text": "English"
					},
					"NeverContactVia": {
						"value": "314",
						"text": ""
					},
					"Income": {
						"value": "109",
						"text": "Blank"
					},
					"HasSSN": false
				}
			},
			{
				"$type": "TypedReference<Contact>",
				"Types": [
					"CoBuyer"
				],
				"Contact": {
					"Id": "1265446",
					"Address": {
						"$type": "Address",
						"Address1": "First Line",
						"Address2": "Second Line",
						"Address3": "",
						"City": "Orem",
						"State": "UT",
						"PostalCode": "84097",
						"County": "Utah",
						"Country": "USA",
						"isComplete": true
					},
					"Email": [
						{
							"$type": "Email",
							"Type": "Personal",
							"Address": "test@test.com",
							"Preferred": true
						}
					],
					"SocialMedia": {
						"$type": "SocialMediaCollection",
						"Other": null,
						"Facebook": {
							"UserName": "FB"
						},
						"Twitter": {
							"UserName": "TW"
						},
						"LinkedIn": null
					},
					"Note": "Danger",
					"ImgUrl": "",
					"Connections": null,
					"Active": false,
					"Deleted": false,
					"Created": null,
					"Source": {
						"value": "1002850",
						"text": "Fresh Up"
					},
					"Status": {
						"value": "328",
						"text": "Active"
					},
					"ContactType": {
						"value": "305",
						"text": "Prospect"
					},
					"ContactSubtype": {
						"value": "944",
						"text": "Credit"
					},
					"LastModified": null,
					"CreatedBy": null,
					"LastModifiedBy": null,
					"GlobalId": null,
					"ExternalReferences": [
						{
							"$type": "ExternalReference",
							"Id": "9",
							"ExternalReferenceId": "undefined",
							"Franchise": ""
						}
					],
					"GmInfo": {
						"GmState": "0",
						"SurrogateId": null
					},
					"$type": "Person",
					"Name": {
						"$type": "PersonName",
						"First": "Will",
						"Middle": "M",
						"Last": "Robinson",
						"Friendly": "Rob",
						"Phonetic": "",
						"Prefix": {
							"value": "",
							"text": ""
						},
						"Suffix": ""
					},
					"Phones": {
						"$type": "PersonPhoneCollection",
						"Home": {
							"$type": "Phone",
							"Number": "1212121211",
							"Extension": null,
							"Preferred": false
						},
						"Work": {
							"$type": "Phone",
							"Number": "8018675309",
							"Extension": null,
							"Preferred": false
						},
						"Mobile": {
							"$type": "Phone",
							"Number": "3333333333",
							"Extension": null,
							"Preferred": false
						},
						"Fax": null,
						"Other": null,
						"DncOption": ""
					},
					"Birthday": "09/11/1965",
					"Gender": "Male",
					"DriversLicense": "121516",
					"CompanyName": "Century Fox",
					"ExternalReferenceId": "",
					"PreferredLanguage": {
						"text": null
					},
					"NeverContactVia": {
						"value": "314",
						"text": "Don&apos;t Contact (Internal)"
					},
					"Income": {
						"value": "304",
						"text": "Blank"
					},
					"HasSSN": true
				}
			}
		],
		"AssignedUsers": [
			{
				"value": "kgapehrson",
				"text": "DealerSocket Automation"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			}
		],
		"VehiclesOfInterest": [
			{
				"$type": "VehicleOfInterest",
				"Id": "21",
				"StockNumber": "25",
				"Vin": "456",
				"Make": "Bugatti",
				"Model": "Veyron",
				"Trim": "Base",
				"Year": "2015",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "BIG",
				"Transmission": "Manual",
				"Style": null,
				"FuelEfficiency": null,
				"ChromeStyleId": "12345",
				"Odometer": "8",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/bugatti-veyron-super-sport-.jpg?itok=CwYkkjOl"
				],
				"Preferred": true,
				"MSRP": "$1000",
				"Price": "$200",
				"ModelCode": "RAD",
				"Class": {
					"value": "3",
					"text": "Pickup Truck"
				},
				"AdditionalOptions": "None",
				"ExteriorColor": "White",
				"InteriorColor": "Black",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$50",
				"LotLocation": "112",
				"Franchise": "DealerSocket",
				"FuelType": "Gas",
				"CityMiles": "4",
				"HighwayMiles": "6",
				"Condition": "Used",
				"DaysOnLot": "12"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": "888007",
				"StockNumber": "R022840A",
				"Vin": "2CNFLEEW0A6413830",
				"Make": "Chevrolet",
				"Model": "Equinox",
				"Trim": "LT w/1LT",
				"Year": "2010",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": "Automatic",
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [
					"http://content.homenetiol.com/2000464/2078698/640x480/stock_images/5/2010CHE007a_640/2010CHE007a_640_01.jpg"
				],
				"Preferred": false,
				"MSRP": "$15,000",
				"Price": "$14,998",
				"ModelCode": "1LK26",
				"Class": {
					"value": "6",
					"text": "SUV"
				},
				"AdditionalOptions": "",
				"Exterior": "Cyber Gray Metallic",
				"Interior": "",
				"Drivetrain": "All Wheel Drive",
				"CashDown": "$",
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": "Gasoline Fuel",
				"CityMiles": "20",
				"HighwayMiles": "29",
				"Condition": "Used",
				"DaysOnLot": "217"
			},
			{
				"$type": "VehicleOfInterest",
				"Id": 5400747,
				"StockNumber": "GG348012",
				"Vin": "5XYZUDLA8GG348012",
				"Make": "Hyundai",
				"Model": "Santa Fe Sport",
				"Trim": "",
				"Year": "2016",
				"PurchasedDate": null,
				"Status": false,
				"Engine": "4 Cylinder Engine",
				"Transmission": null,
				"Style": null,
				"FuelEfficiency": null,
				"Odometer": "0",
				"Cylinders": 0,
				"LastServiced": null,
				"ServiceEvents": null,
				"GlobalId": null,
				"Created": null,
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"ImageUrls": [],
				"Preferred": null,
				"MSRP": "$17,628.00",
				"Price": "$17,000.00",
				"ModelCode": "63442A45",
				"Class": {
					"value": "-1",
					"text": ""
				},
				"AdditionalOptions": "",
				"Exterior": "",
				"Interior": "",
				"Drivetrain": null,
				"CashDown": null,
				"LotLocation": "",
				"Franchise": "Ken Garff Honda",
				"FuelType": null,
				"CityMiles": null,
				"HighwayMiles": null,
				"Condition": "New",
				"DaysOnLot": "125"
			}
		],
		"LastUpdatedOrSoldDate": "1/21/2012",
		"StatusText": "6 - Sold",
		"DealershipId": "154",
		"DmsNumber": "17",
		"Status": {
			"value": "225",
			"text": "6 - Sold"
		},
		"Description": "I woke up in a new Bugatti",
		"Type": {
			"value": "100050",
			"text": "New Vehicle"
		},
		"PurchaseType": {
			"value": "100280",
			"text": "DealerSocket Purchase Type"
		},
		"Source": {
			"value": "241",
			"text": "DJ test source"
		},
		"TrackingCode": {
			"value": "3168",
			"text": "2-MonsterAd"
		},
		"Ranking": {
			"value": "230",
			"text": "1 - Hot"
		},
		"ExpectedClose": {
			"value": "100303",
			"text": "DJ test Forecast"
		},
		"Franchise": {
			"value": "8",
			"text": "DealerSocket"
		},
		"ResolutionCode1": {
			"value": "290",
			"text": "Price/Value"
		},
		"ResolutionCode2": {
			"value": "322",
			"text": "Down Payment"
		},
		"CompletionDate": "",
		"hasPings": true
	};

/***/ },

/***/ 788:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var activitiesJson = __webpack_require__(789);
	var activityRefDefsJson = __webpack_require__(790);
	var activityDeleteJson = __webpack_require__(791);
	var eventStatusPostJson = __webpack_require__(792);
	var eventStatusJson = __webpack_require__(793);
	var appointmentActivityJson = __webpack_require__(794);
	var outboundCallActivityJson = __webpack_require__(795);
	var inboundCallActivityJson = __webpack_require__(796);
	var otherActivityJson = __webpack_require__(797);
	var statusUpdatedSalesOppActivityJson = __webpack_require__(798);
	var statusChangeWarningJson = __webpack_require__(799);
	var salesActivities = (function () {
	    function salesActivities() {
	    }
	    salesActivities.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var appointmentActivity = '/shim/activity/activities/1264439//6888726';
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + appointmentActivity)).respond(function (method, url, data, headers) {
	            return [200, appointmentActivityJson];
	        });
	        var outboundCallActivity = '/shim/activity/activities/45678//6888758';
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + outboundCallActivity)).respond(function (method, url, data, headers) {
	            return [200, outboundCallActivityJson];
	        });
	        var inboundCallActivity = '/shim/activity/activities/45678//688890';
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + inboundCallActivity)).respond(function (method, url, data, headers) {
	            return [200, inboundCallActivityJson];
	        });
	        var otherActivity = '/shim/activity/activities/1264440/45678//688';
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + otherActivity)).respond(function (method, url, data, headers) {
	            return [200, otherActivityJson];
	        });
	        var activitiesEndpoint = /ActivityTimeline\/customer\((\d+)\)\/event\((\d+)\)/i;
	        $httpBackend.whenGET(activitiesEndpoint).respond(function (method, url, data, headers) {
	            //This is for when the event number is 1 character it is pulling no activities.
	            var matches = activitiesEndpoint.exec(url);
	            if (matches[2].length == 1) {
	                return [200, []];
	            }
	            return [200, activitiesJson];
	        });
	        var customerActivitiesEndpoint = /ActivityTimeline\/customer\((\d+)\)/i;
	        $httpBackend.whenGET(customerActivitiesEndpoint).respond(function (method, url, data, headers) {
	            //This is for when the event number is 1 character it is pulling no activities.
	            var matches = customerActivitiesEndpoint.exec(url);
	            if (matches[1].length == 1) {
	                return [200, []];
	            }
	            return [200, activitiesJson];
	        });
	        var statusChangeWarning = /ActivityTimeline\/customer\((\d+)\)\/event\((\d+)\)\?\$filter=year\(LastUpdated\)%20eq%202016%20and%20month\(LastUpdated\)%20eq%208%20and%20day\(LastUpdated\)%20eq%202%20and%20\(Activity\/Type\/Key%20eq%20100123%20or%20EventStatusGroup%20ne%20null\)/i;
	        $httpBackend.whenGET(statusChangeWarning).respond(function (method, url, data, headers) {
	            return [200, statusChangeWarningJson];
	        });
	        var activityCreateEndpoint = /\/shim\/activity\/create\/(\d+)\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + activityCreateEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, data];
	        });
	        var activityUpdateEndpoint = /\/shim\/activity\/update\/(\d+)\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + activityUpdateEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, data];
	        });
	        var activityDeleteEndpoint = /\/shim\/deleteTask/i;
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + activityDeleteEndpoint.source)).respond(function (method, url, data, headers) {
	            return [204, activityDeleteJson];
	        });
	        var activityRefDefsEndpoint = /\/shim\/activity\/refdefs/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + activityRefDefsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, activityRefDefsJson];
	        });
	        var activityCampaignEndpoint = /\/shim\/activity\/activitycampaignsteps\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + activityCampaignEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, undefined];
	            //TODO figure out why this wasn't being imported
	            //return [200, activityCampaignStepsJson];
	        });
	        var eventStatusEndpoint = /\/shim\/eventstatus\/eventstatuses\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + eventStatusEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, eventStatusJson];
	        });
	        var eventStatusPostEndpoint = /\/shim\/eventstatus\/eventstatuses\/(\d+)\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + eventStatusPostEndpoint.source)).respond(function (method, url, data, headers) {
	            return [204, eventStatusPostJson];
	        });
	        var statusUpdateSalesOppActivity = /\/shim\/SalesOpportunities\/(\d+)\/(\d+)\/(\d+)/i;
	        $httpBackend.whenPUT(new RegExp(shimBaseUrlRegex.source + statusUpdateSalesOppActivity.source)).respond(function (method, url, data, headers) {
	            return [200, statusUpdatedSalesOppActivityJson];
	        });
	    };
	    return salesActivities;
	}());
	module.exports = salesActivities;


/***/ },

/***/ 789:
/***/ function(module, exports) {

	module.exports = [
		{
			"EventType": 1,
			"ActivityTimelineId": 6888766,
			"Activity": {
				"ActivityId": 6888766,
				"Comment": "This is a Completed Other Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-23T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100072,
					"Value": "Completed"
				},
				"Type": {
					"Key": 100121,
					"Value": "Other"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100121,
			"Status": 100072,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888765,
			"Activity": {
				"ActivityId": 6888765,
				"Comment": "This is an Open Other Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-19T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-19T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-03-10T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 100121,
					"Value": "Other"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100121,
			"Status": 100070,
			"LastUpdated": "2016-02-19T07:29:09.557+00:00",
			"DateCreated": "2016-02-19T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888764,
			"Activity": {
				"ActivityId": 6888764,
				"Comment": "This is a Completed Send Email Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-22T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100072,
					"Value": "Completed"
				},
				"Type": {
					"Key": 111127,
					"Value": "Send Email"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 111127,
			"Status": 100072,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888763,
			"Activity": {
				"ActivityId": 6888763,
				"Comment": "This is a Completed Outbound Call Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-22T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100072,
					"Value": "Completed"
				},
				"Type": {
					"Key": 100120,
					"Value": "Outbound Call"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [
				{
					"WorkNoteId": 6,
					"Note": "Work Note #1.",
					"Visibility": "I",
					"CreatedBy": {
						"UserId": 15237,
						"UserName": "fsandrewm",
						"FirstName": "Andrew",
						"LastName": "McGary"
					},
					"CreatedDate": "2016-04-07T08:42:37.757+00:00",
					"Type": 1
				},
				{
					"WorkNoteId": 7,
					"Note": "Work Note #2.",
					"Visibility": "I",
					"CreatedBy": {
						"UserId": 15237,
						"UserName": "fsandrewm",
						"FirstName": "Andrew",
						"LastName": "McGary"
					},
					"CreatedDate": "2016-04-07T08:43:04.737+00:00",
					"Type": 1
				},
				{
					"WorkNoteId": 8,
					"Note": "Work Note #3.",
					"Visibility": "I",
					"CreatedBy": {
						"UserId": 15237,
						"UserName": "fsandrewm",
						"FirstName": "Andrew",
						"LastName": "McGary"
					},
					"CreatedDate": "2016-04-07T08:44:04.737+00:00",
					"Type": 1
				}
			],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100120,
			"Status": 100072,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888762,
			"Activity": {
				"ActivityId": 6888762,
				"Comment": "This is an Open Appointment Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 1600,
					"Value": "Unsold Prospect Follow Up"
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-22T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 100123,
					"Value": "Appointment"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100123,
			"Status": 100070,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888761,
			"Activity": {
				"ActivityId": 6888761,
				"Comment": "This is a Completed Appointment Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 1600,
					"Value": "Unsold Prospect Follow Up"
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-16T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100072,
					"Value": "Completed"
				},
				"Type": {
					"Key": 100123,
					"Value": "Appointment"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100123,
			"Status": 100072,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888760,
			"Activity": {
				"ActivityId": 6888760,
				"Comment": "This is an Open Send Email Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 1600,
					"Value": "Unsold Prospect Follow Up"
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-16T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 111123,
					"Value": "Send Email"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 111123,
			"Status": 100070,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888759,
			"Activity": {
				"ActivityId": 6888759,
				"Comment": "This is a Confirmed Appointment Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-20T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100071,
					"Value": "Confirmed"
				},
				"Type": {
					"Key": 100123,
					"Value": "Appointment"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100123,
			"Status": 100071,
			"LastUpdated": "2016-02-19T07:29:09.557+00:00",
			"DateCreated": "2016-02-19T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888758,
			"Activity": {
				"ActivityId": 6888758,
				"Comment": "This is an Open Outbound Call Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-16T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 86,
					"Value": "Test Phone Script"
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 100120,
					"Value": "Outbound Call"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [
				{
					"CustomerCampaignId": 6794944,
					"CampaignId": 379,
					"EventId": 8675338,
					"CampaignName": "*New Prospect",
					"SequenceNumber": 3,
					"MilestoneType": "Activity",
					"ScheduledDate": "2016-07-13T14:37:17.987-06:00",
					"AssignedTo": {
						"UserId": null,
						"UserName": "~AssignedTo~",
						"FirstName": null,
						"LastName": null
					}
				},
				{
					"CustomerCampaignId": 6794944,
					"CampaignId": 379,
					"EventId": 8675338,
					"CampaignName": "*New Prospect",
					"SequenceNumber": 4,
					"MilestoneType": "Activity",
					"ScheduledDate": "2016-07-15T14:37:17.987-06:00",
					"AssignedTo": {
						"UserId": null,
						"UserName": "~AssignedTo~",
						"FirstName": null,
						"LastName": null
					}
				},
				{
					"CustomerCampaignId": 6794944,
					"CampaignId": 379,
					"EventId": 8675338,
					"CampaignName": "*New Prospect",
					"SequenceNumber": 5,
					"MilestoneType": "Activity",
					"ScheduledDate": "2016-07-17T14:37:17.987-06:00",
					"AssignedTo": {
						"UserId": null,
						"UserName": "~AssignedTo~",
						"FirstName": null,
						"LastName": null
					}
				}
			],
			"EventStatuses": [],
			"Type": 100123,
			"Status": 100072,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888757,
			"Activity": {
				"ActivityId": 6888757,
				"Comment": "This is a Completed Inbound Call Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-16T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100072,
					"Value": "Completed"
				},
				"Type": {
					"Key": 200002,
					"Value": "Inbound Call"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 200002,
			"Status": 100072,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888756,
			"Activity": {
				"ActivityId": 6888756,
				"Comment": "This is an Open Email Received Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-16T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 200000,
					"Value": "Email Received"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 200000,
			"Status": 100070,
			"LastUpdated": "2016-02-23T07:29:09.557+00:00",
			"DateCreated": "2016-02-23T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 6888755,
			"Activity": {
				"ActivityId": 6888755,
				"Comment": "This is an Open Web Lead Type activity.",
				"UpdatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-02-17T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-17T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-16T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 230000,
					"UserName": "kgapehrson",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 200001,
					"Value": "Web Lead"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 200001,
			"Status": 100070,
			"LastUpdated": "2016-02-17T07:29:09.557+00:00",
			"DateCreated": "2016-02-17T07:29:09.557+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 1,
			"Activity": null,
			"WorkNote": {
				"WorkNoteId": 1,
				"Note": "Test work note 1",
				"Visibility": "I",
				"CreatedBy": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-19T15:55:34.537+00:00",
				"Type": 1
			},
			"EventStatusGroup": null,
			"EventId": 6,
			"CustomerId": 3,
			"WorkNotes": null,
			"CampaignSteps": [],
			"EventStatuses": null,
			"Type": 0,
			"Status": 0,
			"LastUpdated": "2016-02-19T15:55:34.537+00:00",
			"DateCreated": "2016-02-19T15:55:34.537+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 2,
			"Activity": null,
			"WorkNote": {
				"WorkNoteId": 2,
				"Note": "Test work note 2",
				"Visibility": "I",
				"CreatedBy": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-24T15:55:34.537+00:00",
				"Type": 1
			},
			"EventStatusGroup": null,
			"EventId": 6,
			"CustomerId": 3,
			"WorkNotes": null,
			"CampaignSteps": [],
			"EventStatuses": null,
			"Type": 0,
			"Status": 0,
			"LastUpdated": "2016-02-24T15:55:34.537+00:00",
			"DateCreated": "2016-02-24T15:55:34.537+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 3,
			"Activity": null,
			"WorkNote": {
				"WorkNoteId": 3,
				"Note": "Test work note 3",
				"Visibility": "I",
				"CreatedBy": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-24T15:56:34.537+00:00",
				"Type": 1
			},
			"EventStatusGroup": null,
			"EventId": 6,
			"CustomerId": 3,
			"WorkNotes": null,
			"CampaignSteps": [],
			"EventStatuses": null,
			"Type": 0,
			"Status": 0,
			"LastUpdated": "2016-02-24T15:56:34.537+00:00",
			"DateCreated": "2016-02-24T15:56:34.537+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 4,
			"Activity": null,
			"WorkNote": {
				"WorkNoteId": 4,
				"Note": "Test work note 4",
				"Visibility": "I",
				"CreatedBy": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-25T15:55:34.537+00:00",
				"Type": 1
			},
			"EventStatusGroup": null,
			"EventId": 6,
			"CustomerId": 3,
			"WorkNotes": null,
			"CampaignSteps": [],
			"EventStatuses": null,
			"Type": 0,
			"Status": 0,
			"LastUpdated": "2016-02-25T15:55:34.537+00:00",
			"DateCreated": "2016-02-25T15:55:34.537+00:00"
		},
		{
			"EventType": 1,
			"ActivityTimelineId": 5,
			"Activity": null,
			"WorkNote": {
				"WorkNoteId": 5,
				"Note": "<strong>Email Sent</strong>Subject: This is a sent email card",
				"Visibility": "S",
				"CreatedBy": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-02-10T15:55:34.537+00:00",
				"Type": 1
			},
			"EventStatusGroup": null,
			"EventId": 6,
			"CustomerId": 3,
			"WorkNotes": null,
			"CampaignSteps": [],
			"EventStatuses": null,
			"Type": 0,
			"Status": 0,
			"LastUpdated": "2016-02-10T15:55:34.537+00:00",
			"DateCreated": "2016-02-10T15:55:34.537+00:00"
		},
		{
			"ActivityTimelineId": 6888761,
			"Activity": null,
			"WorkNote": null,
			"EventStatusGroup": {
				"EventStatusGroupId": 1,
				"CreatedBy": {
					"UserId": null,
					"UserName": "fsandrewm",
					"FirstName": null,
					"LastName": null
				},
				"CreatedDate": "2016-01-29T14:58:31.817+00:00"
			},
			"EventId": 10101,
			"EventType": 1,
			"CustomerId": 10101,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [
				{
					"EventStatusId": 23,
					"Status": {
						"Key": 222,
						"Value": null
					}
				},
				{
					"EventStatusId": 24,
					"Status": {
						"Key": 227,
						"Value": null
					}
				},
				{
					"EventStatusId": 25,
					"Status": {
						"Key": 221,
						"Value": null
					}
				}
			],
			"Type": 0,
			"Status": 0,
			"LastUpdated": "2016-01-29T14:58:31.817+00:00",
			"DateCreated": "2016-01-29T14:58:31.817+00:00"
		}
	];

/***/ },

/***/ 790:
/***/ function(module, exports) {

	module.exports = {
		"$type": "ActivityRefdefs",
		"ActivityType": [
			{
				"value": "100120",
				"text": "Outbound Call"
			},
			{
				"value": "100123",
				"text": "Appointment"
			},
			{
				"value": "100125",
				"text": "Run Credit Report"
			},
			{
				"value": "100124",
				"text": "Survey"
			},
			{
				"value": "100122",
				"text": "Escalated"
			},
			{
				"value": "100126",
				"text": "Update Your Event"
			},
			{
				"value": "111127",
				"text": "Send Email"
			},
			{
				"value": "100121",
				"text": "Other"
			},
			{
				"value": "100127",
				"text": "Inventory Search"
			},
			{
				"value": "111126",
				"text": "Read Work Notes"
			},
			{
				"value": "200000",
				"text": "Email Received"
			},
			{
				"value": "200001",
				"text": "Web Lead"
			},
			{
				"value": "200002",
				"text": "Inbound Call"
			},
			{
				"value": "200059",
				"text": "1-on-1"
			},
			{
				"value": "200348",
				"text": "Appt Confirm"
			},
			{
				"value": "200349",
				"text": "Unsold Traffic"
			},
			{
				"value": "200350",
				"text": "No Appt Follow Up"
			},
			{
				"value": "1003541",
				"text": "eBrochure Request"
			},
			{
				"value": "1003552",
				"text": "Service Commitment"
			},
			{
				"value": "1004516",
				"text": "Skate Alert"
			},
			{
				"value": "200004",
				"text": "Price Alert"
			}
		],
		"Status": [
			{
				"value": "100070",
				"text": "Open"
			},
			{
				"value": "100074",
				"text": "Left Message"
			},
			{
				"value": "100075",
				"text": "No Answer"
			},
			{
				"value": "100071",
				"text": "Confirmed"
			},
			{
				"value": "100072",
				"text": "Completed"
			},
			{
				"value": "100078",
				"text": "No Response"
			},
			{
				"value": "100076",
				"text": "Bad Phone #"
			},
			{
				"value": "100073",
				"text": "No Show"
			},
			{
				"value": "100079",
				"text": "Cancelled"
			},
			{
				"value": "100080",
				"text": "Unreported Show"
			},
			{
				"value": "100081",
				"text": "Incomplete"
			},
			{
				"value": "100082",
				"text": "Skipped"
			},
			{
				"value": "200366",
				"text": "Not in Market"
			}
		],
		"Rank": [
			{
				"value": "100060",
				"text": "Low"
			},
			{
				"value": "100061",
				"text": "Medium"
			},
			{
				"value": "100062",
				"text": "High"
			}
		],
		"DueTime": [
			{
				"value": "102110",
				"text": "7:00 AM"
			},
			{
				"value": "100600",
				"text": "7:10 AM"
			},
			{
				"value": "100601",
				"text": "7:20 AM"
			},
			{
				"value": "102111",
				"text": "7:30 AM"
			},
			{
				"value": "100602",
				"text": "7:40 AM"
			},
			{
				"value": "100603",
				"text": "7:50 AM"
			},
			{
				"value": "102112",
				"text": "8:00 AM"
			},
			{
				"value": "100604",
				"text": "8:10 AM"
			},
			{
				"value": "100618",
				"text": "8:20 AM"
			},
			{
				"value": "102113",
				"text": "8:30 AM"
			},
			{
				"value": "100632",
				"text": "8:40 AM"
			},
			{
				"value": "100646",
				"text": "8:50 AM"
			},
			{
				"value": "102114",
				"text": "9:00 AM"
			},
			{
				"value": "100605",
				"text": "9:10 AM"
			},
			{
				"value": "100619",
				"text": "9:20 AM"
			},
			{
				"value": "102115",
				"text": "9:30 AM"
			},
			{
				"value": "100633",
				"text": "9:40 AM"
			},
			{
				"value": "100647",
				"text": "9:50 AM"
			},
			{
				"value": "102116",
				"text": "10:00 AM"
			},
			{
				"value": "100606",
				"text": "10:10 AM"
			},
			{
				"value": "100620",
				"text": "10:20 AM"
			},
			{
				"value": "102117",
				"text": "10:30 AM"
			},
			{
				"value": "100634",
				"text": "10:40 AM"
			},
			{
				"value": "100648",
				"text": "10:50 AM"
			},
			{
				"value": "102118",
				"text": "11:00 AM"
			},
			{
				"value": "100607",
				"text": "11:10 AM"
			},
			{
				"value": "100621",
				"text": "11:20 AM"
			},
			{
				"value": "102119",
				"text": "11:30 AM"
			},
			{
				"value": "100635",
				"text": "11:40 AM"
			},
			{
				"value": "100649",
				"text": "11:50 AM"
			},
			{
				"value": "102120",
				"text": "12:00 PM"
			},
			{
				"value": "200188",
				"text": "12:10 PM"
			},
			{
				"value": "200189",
				"text": "12:20 PM"
			},
			{
				"value": "102121",
				"text": "12:30 PM"
			},
			{
				"value": "200190",
				"text": "12:40 PM"
			},
			{
				"value": "200191",
				"text": "12:50 PM"
			},
			{
				"value": "102122",
				"text": "1:00 PM"
			},
			{
				"value": "100608",
				"text": "1:10 PM"
			},
			{
				"value": "100622",
				"text": "1:20 PM"
			},
			{
				"value": "102123",
				"text": "1:30 PM"
			},
			{
				"value": "100636",
				"text": "1:40 PM"
			},
			{
				"value": "100650",
				"text": "1:50 PM"
			},
			{
				"value": "102124",
				"text": "2:00 PM"
			},
			{
				"value": "100609",
				"text": "2:10 PM"
			},
			{
				"value": "100623",
				"text": "2:20 PM"
			},
			{
				"value": "102125",
				"text": "2:30 PM"
			},
			{
				"value": "100637",
				"text": "2:40 PM"
			},
			{
				"value": "100651",
				"text": "2:50 PM"
			},
			{
				"value": "102126",
				"text": "3:00 PM"
			},
			{
				"value": "100610",
				"text": "3:10 PM"
			},
			{
				"value": "100624",
				"text": "3:20 PM"
			},
			{
				"value": "102127",
				"text": "3:30 PM"
			},
			{
				"value": "100638",
				"text": "3:40 PM"
			},
			{
				"value": "100652",
				"text": "3:50 PM"
			},
			{
				"value": "102128",
				"text": "4:00 PM"
			},
			{
				"value": "100611",
				"text": "4:10 PM"
			},
			{
				"value": "100625",
				"text": "4:20 PM"
			},
			{
				"value": "102129",
				"text": "4:30 PM"
			},
			{
				"value": "100639",
				"text": "4:40 PM"
			},
			{
				"value": "100653",
				"text": "4:50 PM"
			},
			{
				"value": "102130",
				"text": "5:00 PM"
			},
			{
				"value": "100612",
				"text": "5:10 PM"
			},
			{
				"value": "100626",
				"text": "5:20 PM"
			},
			{
				"value": "102131",
				"text": "5:30 PM"
			},
			{
				"value": "100640",
				"text": "5:40 PM"
			},
			{
				"value": "100654",
				"text": "5:50 PM"
			},
			{
				"value": "102132",
				"text": "6:00 PM"
			},
			{
				"value": "100613",
				"text": "6:10 PM"
			},
			{
				"value": "100627",
				"text": "6:20 PM"
			},
			{
				"value": "102133",
				"text": "6:30 PM"
			},
			{
				"value": "100641",
				"text": "6:40 PM"
			},
			{
				"value": "100655",
				"text": "6:50 PM"
			},
			{
				"value": "102134",
				"text": "7:00 PM"
			},
			{
				"value": "100614",
				"text": "7:10 PM"
			},
			{
				"value": "100628",
				"text": "7:20 PM"
			},
			{
				"value": "102135",
				"text": "7:30 PM"
			},
			{
				"value": "100642",
				"text": "7:40 PM"
			},
			{
				"value": "100656",
				"text": "7:50 PM"
			},
			{
				"value": "102136",
				"text": "8:00 PM"
			},
			{
				"value": "100615",
				"text": "8:10 PM"
			},
			{
				"value": "100629",
				"text": "8:20 PM"
			},
			{
				"value": "102137",
				"text": "8:30 PM"
			},
			{
				"value": "100643",
				"text": "8:40 PM"
			},
			{
				"value": "100657",
				"text": "8:50 PM"
			},
			{
				"value": "102138",
				"text": "9:00 PM"
			},
			{
				"value": "200192",
				"text": "12:50 AM"
			},
			{
				"value": "200193",
				"text": "9:45 AM"
			},
			{
				"value": "200194",
				"text": "10:15 AM"
			},
			{
				"value": "200195",
				"text": "10:45 AM"
			},
			{
				"value": "200196",
				"text": "11:15 AM"
			},
			{
				"value": "200197",
				"text": "11:45 AM"
			},
			{
				"value": "200198",
				"text": "12:15 PM"
			},
			{
				"value": "200199",
				"text": "12:45 PM"
			},
			{
				"value": "200200",
				"text": "1:15 PM"
			},
			{
				"value": "200201",
				"text": "1:45 PM"
			},
			{
				"value": "200202",
				"text": "2:15 PM"
			},
			{
				"value": "200203",
				"text": "2:45 PM"
			},
			{
				"value": "200204",
				"text": "3:15 PM"
			},
			{
				"value": "200205",
				"text": "3:45 PM"
			},
			{
				"value": "200206",
				"text": "4:15 PM"
			},
			{
				"value": "200207",
				"text": "4:45 PM"
			},
			{
				"value": "200208",
				"text": "5:15 PM"
			},
			{
				"value": "200209",
				"text": "5:45 PM"
			},
			{
				"value": "200210",
				"text": "6:15 PM"
			},
			{
				"value": "200211",
				"text": "6:45 PM"
			},
			{
				"value": "200212",
				"text": "7:15 PM"
			},
			{
				"value": "200213",
				"text": "7:45 PM"
			},
			{
				"value": "200214",
				"text": "8:15 PM"
			},
			{
				"value": "200215",
				"text": "8:45 PM"
			}
		],
		"AssignedTo": [
			{
				"value": "akalam",
				"text": "A kalam"
			},
			{
				"value": "kgaharper",
				"text": "Adam Harper"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "kgallic",
				"text": "Alli Cerruti"
			},
			{
				"value": "testentity",
				"text": "AlohaQA test"
			},
			{
				"value": "kgATest",
				"text": "Alpana Wadhwa"
			},
			{
				"value": "ame3",
				"text": "Ameeta kghqa"
			},
			{
				"value": "asaxena",
				"text": "Ameeta Saxena"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test (KG)"
			},
			{
				"value": "kgawyss",
				"text": "Andrea Wyss (KG)"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbcarpent",
				"text": "Bill Carpenter"
			},
			{
				"value": "kgbtest",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbgeorge",
				"text": "Brian George"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgcdimond",
				"text": "Carolyn Dimond"
			},
			{
				"value": "kgccarmody",
				"text": "Chris Carmody"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "testent01",
				"text": "D07508 Test"
			},
			{
				"value": "testent012",
				"text": "D7508 test"
			},
			{
				"value": "kgdavidl",
				"text": "David Lytle"
			},
			{
				"value": "kgdavel",
				"text": "David Lytle"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "fsadhawal",
				"text": "Dhawal J"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgedr",
				"text": "Edgar Reporter"
			},
			{
				"value": "kgewilson",
				"text": "Erin Wilson"
			},
			{
				"value": "fake",
				"text": "Fake Fake"
			},
			{
				"value": "finster",
				"text": "Finbarr Kiely"
			},
			{
				"value": "kggartha",
				"text": "Garth Allred"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "kgjclawson",
				"text": "Jeremy Clawson"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "jblow",
				"text": "Joe Blow"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "testfinan",
				"text": "John Tester"
			},
			{
				"value": "johntest",
				"text": "Johnny Test"
			},
			{
				"value": "kgjulied",
				"text": "Julie Dougall"
			},
			{
				"value": "kgkhewtest",
				"text": "Kimball Hewtest"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "kgKrishna",
				"text": "Krishna Ashok"
			},
			{
				"value": "kglschomak",
				"text": "Lance Schomaker"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "kgljones",
				"text": "Leland Jones"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kgOEMTeste",
				"text": "OEM Tester"
			},
			{
				"value": "pldrosa",
				"text": "Paulo L Rosa"
			},
			{
				"value": "puser",
				"text": "phantom user"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "raj",
				"text": "raj samy"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca Cook Anderson"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "kgrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrbales",
				"text": "Russ Bales"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsburgess",
				"text": "Scott Burgess"
			},
			{
				"value": "ckSElgram",
				"text": "Scott Elgram (CK)"
			},
			{
				"value": "kgSElgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgslayton",
				"text": "Scott Layton"
			},
			{
				"value": "kgsmiles",
				"text": "Scott Miles"
			},
			{
				"value": "kgSTest",
				"text": "Scott Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "kgsblum",
				"text": "Slater Blum"
			},
			{
				"value": "kgstuser1",
				"text": "SocketTalk User1"
			},
			{
				"value": "kgstuser2",
				"text": "SocketTalk User2"
			},
			{
				"value": "kgstuser3",
				"text": "SocketTalk User3"
			},
			{
				"value": "kgsschubac",
				"text": "Stan Schubach"
			},
			{
				"value": "kgspolityk",
				"text": "Steve Polityka"
			},
			{
				"value": "kgsbales",
				"text": "Surr Bales"
			},
			{
				"value": "taratest",
				"text": "Tara Turkzadeh"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgtwilkins",
				"text": "Trevor Wilkins"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			}
		],
		"ToDoCode": [
			{
				"value": "1600",
				"text": "Unsold Prospect Follow Up"
			},
			{
				"value": "1601",
				"text": "High Mileage Sales Opportunity"
			},
			{
				"value": "1602",
				"text": "Lease Renewal Opportunity"
			},
			{
				"value": "1603",
				"text": "Sold Customer Follow Up"
			},
			{
				"value": "1604",
				"text": "Sold Customer CSI"
			},
			{
				"value": "1605",
				"text": "Customer Retention"
			},
			{
				"value": "1606",
				"text": "Service Customer CSI  (Blue Oval)"
			},
			{
				"value": "1607",
				"text": "Service Reminder"
			},
			{
				"value": "1608",
				"text": "Extended Warranty Up Sell"
			},
			{
				"value": "1609",
				"text": "Birthday"
			},
			{
				"value": "200357",
				"text": "SOP"
			},
			{
				"value": "200081",
				"text": "Hot Prospect"
			}
		],
		"PhoneScript": [
			{
				"value": "258",
				"text": "Customer in for Service alert"
			},
			{
				"value": "2128",
				"text": "Cash4Clunker Appt Script"
			}
		],
		"InsertedBy": [
			{
				"value": "akalam",
				"text": "A kalam"
			},
			{
				"value": "kgaharper",
				"text": "Adam Harper"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "kgallic",
				"text": "Alli Cerruti"
			},
			{
				"value": "testentity",
				"text": "AlohaQA test"
			},
			{
				"value": "kgATest",
				"text": "Alpana Wadhwa"
			},
			{
				"value": "ame3",
				"text": "Ameeta kghqa"
			},
			{
				"value": "asaxena",
				"text": "Ameeta Saxena"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test (KG)"
			},
			{
				"value": "kgawyss",
				"text": "Andrea Wyss (KG)"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbcarpent",
				"text": "Bill Carpenter"
			},
			{
				"value": "kgbtest",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbgeorge",
				"text": "Brian George"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgcdimond",
				"text": "Carolyn Dimond"
			},
			{
				"value": "kgccarmody",
				"text": "Chris Carmody"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "testent01",
				"text": "D07508 Test"
			},
			{
				"value": "testent012",
				"text": "D7508 test"
			},
			{
				"value": "kgdavidl",
				"text": "David Lytle"
			},
			{
				"value": "kgdavel",
				"text": "David Lytle"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "fsadhawal",
				"text": "Dhawal J"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgedr",
				"text": "Edgar Reporter"
			},
			{
				"value": "kgewilson",
				"text": "Erin Wilson"
			},
			{
				"value": "fake",
				"text": "Fake Fake"
			},
			{
				"value": "finster",
				"text": "Finbarr Kiely"
			},
			{
				"value": "kggartha",
				"text": "Garth Allred"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "kgjclawson",
				"text": "Jeremy Clawson"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "jblow",
				"text": "Joe Blow"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "testfinan",
				"text": "John Tester"
			},
			{
				"value": "johntest",
				"text": "Johnny Test"
			},
			{
				"value": "kgjulied",
				"text": "Julie Dougall"
			},
			{
				"value": "kgkhewtest",
				"text": "Kimball Hewtest"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "kgKrishna",
				"text": "Krishna Ashok"
			},
			{
				"value": "kglschomak",
				"text": "Lance Schomaker"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "kgljones",
				"text": "Leland Jones"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kgOEMTeste",
				"text": "OEM Tester"
			},
			{
				"value": "pldrosa",
				"text": "Paulo L Rosa"
			},
			{
				"value": "puser",
				"text": "phantom user"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "raj",
				"text": "raj samy"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca Cook Anderson"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "kgrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrbales",
				"text": "Russ Bales"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsburgess",
				"text": "Scott Burgess"
			},
			{
				"value": "ckSElgram",
				"text": "Scott Elgram (CK)"
			},
			{
				"value": "kgSElgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgslayton",
				"text": "Scott Layton"
			},
			{
				"value": "kgsmiles",
				"text": "Scott Miles"
			},
			{
				"value": "kgSTest",
				"text": "Scott Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "kgsblum",
				"text": "Slater Blum"
			},
			{
				"value": "kgstuser1",
				"text": "SocketTalk User1"
			},
			{
				"value": "kgstuser2",
				"text": "SocketTalk User2"
			},
			{
				"value": "kgstuser3",
				"text": "SocketTalk User3"
			},
			{
				"value": "kgsschubac",
				"text": "Stan Schubach"
			},
			{
				"value": "kgspolityk",
				"text": "Steve Polityka"
			},
			{
				"value": "kgsbales",
				"text": "Surr Bales"
			},
			{
				"value": "taratest",
				"text": "Tara Turkzadeh"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgtwilkins",
				"text": "Trevor Wilkins"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			}
		]
	};

/***/ },

/***/ 791:
/***/ function(module, exports) {

	module.exports = [
		{
			"contactId": "10101",
			"opportunityId": "10101",
			"deletingTaskId": "6888758",
			"opportunityType": "sales"
		}
	];

/***/ },

/***/ 792:
/***/ function(module, exports) {

	module.exports = [
		221,
		227,
		222,
		223
	];

/***/ },

/***/ 793:
/***/ function(module, exports) {

	module.exports = {
		"eventStatuses": [
			223,
			222
		],
		"$type": "EventStatus"
	};

/***/ },

/***/ 794:
/***/ function(module, exports) {

	module.exports = {
		"$type": "activity",
		"ActivityId": "6974379",
		"EventId": "2898179",
		"DueDate": "4/19/2016",
		"Comment": "",
		"ToDoCode": {
			"text": null
		},
		"PhoneScript": {
			"text": null
		},
		"ActivityType": {
			"text": "Appointment",
			"value": "100123"
		},
		"Status": {
			"text": "Open",
			"value": "100070"
		},
		"Rank": {
			"text": "Low",
			"value": "100060"
		},
		"DueTime": {
			"text": "7:00 AM",
			"value": "102110"
		},
		"AssignedTo": {
			"text": "$Test Aloha Aloha test",
			"value": "ATest12321"
		},
		"InsertedBy": {
			"text": null
		},
		"Transportation": {
			"text": "Loaner2",
			"value": "1009581"
		}
	};

/***/ },

/***/ 795:
/***/ function(module, exports) {

	module.exports = {
		"$type": "activity",
		"ActivityId": "6888758",
		"EventId": "10101",
		"DueDate": "2/19/2016",
		"Comment": "This is an Open Outbound Call Type activity.",
		"AssignedBy": "kgapehrson",
		"AssignDate": "2/19/2016",
		"UpdateBy": "kgapehrson",
		"UpdateDate": "2/19/2016",
		"ActivityType": {
			"text": "Outbound Call",
			"value": "100120"
		},
		"Status": {
			"text": "Open",
			"value": "100070"
		},
		"Rank": {
			"text": "Low",
			"value": "100060"
		},
		"DueTime": {
			"text": "7:00 AM",
			"value": "102110"
		},
		"AssignedTo": {
			"text": "DealerSocket Automation",
			"value": "kgapehrson"
		},
		"ToDoCode": {
			"text": null
		},
		"PhoneScript": {
			"text": "Test Phone Script",
			"value": "86"
		}
	};

/***/ },

/***/ 796:
/***/ function(module, exports) {

	module.exports = {
		"$type": "activity",
		"ActivityId": "6974388",
		"EventId": "2898179",
		"DueDate": "4/21/2016",
		"Comment": "",
		"ToDoCode": {
			"text": null
		},
		"PhoneScript": {
			"text": null
		},
		"ActivityType": {
			"text": "Inbound Call",
			"value": "200002"
		},
		"Status": {
			"text": "Open",
			"value": "100070"
		},
		"Rank": {
			"text": "Low",
			"value": "100060"
		},
		"DueTime": {
			"text": "7:00 AM",
			"value": "102110"
		},
		"AssignedTo": {
			"text": "$Test Aloha Aloha test",
			"value": "ATest12321"
		},
		"InsertedBy": {
			"text": null
		},
		"Transportation": {
			"text": null
		}
	};

/***/ },

/***/ 797:
/***/ function(module, exports) {

	module.exports = {
		"$type": "activity",
		"ActivityId": "688872",
		"EventId": "45678",
		"DueDate": "4/21/2016",
		"Comment": "",
		"ToDoCode": {
			"text": null
		},
		"PhoneScript": {
			"text": null
		},
		"ActivityType": {
			"text": "Other",
			"value": "200002"
		},
		"Status": {
			"text": "Open",
			"value": "100070"
		},
		"Rank": {
			"text": "Low",
			"value": "100060"
		},
		"DueTime": {
			"text": "7:00 AM",
			"value": "102110"
		},
		"AssignedTo": {
			"text": "$Test Aloha Aloha test",
			"value": "ATest12321"
		},
		"InsertedBy": {
			"text": null
		},
		"Transportation": {
			"text": null
		}
	};

/***/ },

/***/ 798:
/***/ function(module, exports) {

	module.exports = {
		"eventId": "2",
		"eventStatusGroupId": "2"
	};

/***/ },

/***/ 799:
/***/ function(module, exports) {

	module.exports = [
		{
			"ActivityTimelineId": 6888762,
			"Activity": {
				"ActivityId": 6888762,
				"Comment": "",
				"UpdatedBy": {
					"UserId": 211399,
					"UserName": "akalam",
					"FirstName": "A",
					"LastName": "kalam"
				},
				"UpdateDate": "2016-02-23T07:30:00.557+00:00",
				"CreatedBy": {
					"UserId": 211399,
					"UserName": "akalam",
					"FirstName": "A",
					"LastName": "kalam"
				},
				"CreatedDate": "2016-02-23T07:30:00.557+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-02-23T07:30:00.557+00:00",
				"AssignedTo": {
					"UserId": 83265,
					"UserName": "kgaharper",
					"FirstName": "Adam",
					"LastName": "Harper"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 200358,
					"Value": "None"
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 100123,
					"Value": "Appointment"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 8675338,
			"EventType": 1,
			"CustomerId": 3,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100123,
			"Status": 100070,
			"LastUpdated": "2016-02-23T07:30:00.557+00:00",
			"DateCreated": "2016-02-23T07:30:00.557+00:00"
		}
	];

/***/ },

/***/ 800:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var tradesPermissionsJson = __webpack_require__(801);
	var tradesJson = __webpack_require__(802);
	var tradesMakesJson = __webpack_require__(803);
	var tradesModelsJson = __webpack_require__(804);
	var tradesTrimsJson = __webpack_require__(805);
	var tradesVinLookupJson = __webpack_require__(806);
	var tradesVinErrorJson = __webpack_require__(807);
	var appraisalBookValuesJson = __webpack_require__(808);
	var tradesModelOptionsJson = __webpack_require__(809);
	var carfaxUrl = "http://www.google.com";
	var Trades = (function () {
	    function Trades() {
	        this.tradesList = tradesJson;
	        this.temporaryTradesList = tradesJson;
	    }
	    Trades.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex, $q, apiBaseUrlRegex) {
	        var _this = this;
	        var carfaxEndpoint = /\/shim\/SalesOpportunity\/Trades\/Integrations\/(\d+)\/(\d+)\/(\d+)\/CarFax\?value=(\w+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + carfaxEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, carfaxUrl];
	        });
	        var tradesEndpoint = /\/site\/customertrade\/GetTrades\?(.*)/i;
	        $httpBackend.whenGET(new RegExp(apiBaseUrlRegex.source + tradesEndpoint.source)).respond(function (method, url, data, headers) {
	            //var trades = angular.copy(this.tradesList);
	            var responseData = _this.temporaryTradesList;
	            _this.temporaryTradesList = _this.tradesList;
	            return [200, responseData];
	        });
	        var tradesPostEndpointUndefined = /\/shim\/SalesOpportunity\/Trades\/(undefined|(\d+))\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + tradesPostEndpointUndefined.source)).respond(function (method, url, data, headers) {
	            return [200, tradesJson];
	        });
	        var tradesPostEndpoint = /\/shim\/SalesOpportunity\/Trades\/(\d+)\/(\d+)/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + tradesPostEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, tradesJson];
	        });
	        var tradesPermissionsEndpoint = /\/shim\/SalesOpportunity\/Trades\/Permissions\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + tradesPermissionsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, tradesPermissionsJson];
	        });
	        // var tradesPermissionsPostEndpoint = /\/api\/permissions/i;
	        // $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + tradesPermissionsPostEndpoint.source)).respond((method, url, data, headers) => {
	        //
	        //     return [200, tradesPermissionsJson];
	        // });
	        // valid vin: WBSPM9C50BE202754
	        var tradesVinLookupEndpoint = /\/shim\/SalesOpportunity\/Trades\/Vehicles\/VinInfo.*vin=([\w\d]+).*/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + tradesVinLookupEndpoint.source)).respond(function (method, url, data, headers) {
	            var match = tradesVinLookupEndpoint.exec(url);
	            // If passed in VIN is 17 chars long, we will return valid vin data
	            if (match && match[1]) {
	                if (match[1].length == 17)
	                    return [200, tradesVinLookupJson];
	                else
	                    return [200, tradesVinErrorJson];
	            }
	        });
	        var tradesMakesEndpoint = /\/shim\/SalesOpportunity\/Trades\/Vehicles\/Makes/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + tradesMakesEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, tradesMakesJson];
	        });
	        var tradesModelsEndpoint = /\/shim\/SalesOpportunity\/Trades\/Vehicles\/Models/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + tradesModelsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, tradesModelsJson];
	        });
	        var tradesTrimsEndpoint = /\/shim\/SalesOpportunity\/Trades\/Vehicles\/Trims/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + tradesTrimsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, tradesTrimsJson];
	        });
	        var redBumperPushSuccess = /\/shim\/SalesOpportunity\/Trades\/Integrations\/(.+)\/(.+)\/(.+)\/RedBumper\?value=/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + redBumperPushSuccess.source)).respond(function (method, url, data, headers) {
	            _this.temporaryTradesList.Trades[0].ModelDescription = "PUSHED";
	            return [200, "Appraisal successfully processed."];
	        });
	        // shim/SalesOpportunity/Trades/Vehicles/ModelOptions/bb/U/AK/2011/BMW/282234?vin=WBSPM9C50BE202754
	        var appraisalBookValueEndpoint = /\/shim\/SalesOpportunity\/Trades\/Vehicles\/ModelOptions/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + appraisalBookValueEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, tradesModelOptionsJson];
	        });
	    };
	    return Trades;
	}());
	module.exports = Trades;


/***/ },

/***/ 801:
/***/ function(module, exports) {

	module.exports = {
		"$type": "CustomerTradePermission",
		"appraisals": true,
		"acv": true,
		"payoff": true,
		"amount": true,
		"paymentCalculator": false,
		"reconditionItems": true
	};

/***/ },

/***/ 802:
/***/ function(module, exports) {

	module.exports = {
		"title": "Success",
		"EntityId": "1684597",
		"Trades": [
			{
				"TradeId": 180050,
				"SiteId": 3,
				"EventId": 2755656,
				"ValuationKey": "bb",
				"Vin": "WBSPM9C50BE202754",
				"Year": 2011,
				"MakeCode": "BMW",
				"MakeDescription": "BMW",
				"ModelCode": "M3||4D Sedan",
				"ModelDescription": "M3  4D Sedan",
				"TrimCode": "M3",
				"TrimDescription": "M3",
				"ExteriorColor": "Melbourne Red",
				"Cylinders": 8,
				"Mileage": 43355,
				"ExistingVsc": false,
				"InspectedBy": "fsmlawton",
				"Value": 40625,
				"AcvAmount": 41015,
				"PayoffAmount": 5013,
				"IsFreeText": false,
				"NoTradeCredit": false,
				"Appraisal": {
					"ValuationId": 14,
					"EngineCode": "",
					"TransmissionCode": "",
					"DriveCode": "",
					"PriceType": "Average",
					"AppraisalValue": 30750,
					"MileageAdjustment": 1225,
					"ValuationAmount": 31975,
					"EquipmentList": [
						{
							"EquipmentCode": "N5^450$",
							"EquipmentDescription": "Navigation System",
							"IsStandardEquipment": false,
							"IsSelected": true
						},
						{
							"EquipmentCode": "TK^800$",
							"EquipmentDescription": "Technology w/Nav",
							"IsStandardEquipment": false,
							"IsSelected": true
						}
					],
					"EquipmentRelationshipList": [],
					"AppraisalRawData": {
						"ModelsLookup": null,
						"iValuationId": 14,
						"valuationTab": 180050,
						"valuationKey": "bb",
						"valuationState": "AK",
						"valuationZipCode": "",
						"inputVIN": "",
						"mileage": 0,
						"year": 2011,
						"make": "BMW",
						"makeCode": "BMW",
						"models": null,
						"model": "",
						"modelDescription": "",
						"modelCode": "M3||4D Sedan",
						"trim": "",
						"shortModel": "",
						"engine": "",
						"engineCode": "",
						"transmission": "",
						"transmissionCode": "",
						"drive": "",
						"driveCode": "",
						"status": "",
						"zeroPointMileage": 0,
						"mileageAdjustment": 1225,
						"valueWholesaleBase": 30750,
						"valueRetailBase": 0,
						"valueWholesaleFinal": 31975,
						"valueRetailFinal": 34075,
						"valueTradeInFairBase": 0,
						"valueTradeInGoodBase": 0,
						"valueTradeInExcellentBase": 0,
						"valueTradeInFair": 0,
						"valueTradeInGood": 0,
						"valueTradeInExcellent": 0,
						"valuePrivatePartyFair": 0,
						"valuePrivatePartyGood": 0,
						"valuePrivatePartyExcellent": 0,
						"valueMSRP": 0,
						"valueLoan": 0,
						"valueMileageAdjLoan": 0,
						"valueMileageTradeIn": 0,
						"valueMileageRetail": 0,
						"additionalData": "Average",
						"error": 0,
						"Equipment": {
							"valuationTab": 180050,
							"availableEquipment": [
								{
									"valuationTab": 0,
									"codeId": 0,
									"codeDescription": "Navigation System",
									"codeValue": "N5^450$",
									"model": null,
									"trim": null,
									"shortModel": null,
									"equipWholesaleValue": 450,
									"equipRetailValue": 0,
									"equipLoanValue": 0,
									"equipTradeInFairValue": 0,
									"equipTradeInGoodValue": 0,
									"equipTradeInExcellentValue": 0,
									"equipMSRPValue": 0,
									"OptionRelationshipType": null,
									"OptionRelationshipID": 0,
									"standardEquip": 1,
									"isAdded": 0,
									"isIncluded": 0,
									"OptionAvailabilityCode": null,
									"IsDefaultConfiguration": 0
								},
								{
									"valuationTab": 0,
									"codeId": 1,
									"codeDescription": "Technology w/Nav",
									"codeValue": "TK^800$",
									"model": null,
									"trim": null,
									"shortModel": null,
									"equipWholesaleValue": 800,
									"equipRetailValue": 0,
									"equipLoanValue": 0,
									"equipTradeInFairValue": 0,
									"equipTradeInGoodValue": 0,
									"equipTradeInExcellentValue": 0,
									"equipMSRPValue": 0,
									"OptionRelationshipType": null,
									"OptionRelationshipID": 0,
									"standardEquip": 1,
									"isAdded": 0,
									"isIncluded": 0,
									"OptionAvailabilityCode": null,
									"IsDefaultConfiguration": 0
								}
							],
							"optionRelationships": null,
							"availableEngines": null,
							"availableDTrains": null,
							"availableTrans": null,
							"vinSpecificEquipment": null
						},
						"values": null
					}
				},
				"ReconditionItems": [
					{
						"ReconditionItemId": 29,
						"SiteId": 3,
						"AddressId": 1,
						"TradeId": 180050,
						"Description": "Detailing",
						"Amount": 80,
						"IsDefault": false
					}
				],
				"PriceTypeLookup": [],
				"YearsLookup": [
					"2017",
					"2016",
					"2015",
					"2014",
					"2013",
					"2012",
					"2011",
					"2010",
					"2009",
					"2008",
					"2007",
					"2006",
					"2005",
					"2004",
					"2003",
					"2002",
					"2001",
					"2000",
					"1999",
					"1998",
					"1997",
					"1996",
					"1995",
					"1994",
					"1993",
					"1992",
					"1991",
					"1990",
					"1989",
					"1988",
					"1987",
					"1986",
					"1985",
					"1984",
					"1983",
					"1982",
					"1981"
				],
				"MakesLookup": [],
				"ModelsLookup": [],
				"TrimsLookup": [],
				"EnginesLookup": [],
				"TransmissionsLookup": [],
				"DrivesLookup": [],
				"UserLookup": [
					{
						"Key": " Adam Nichols",
						"Value": "fsanichols"
					},
					{
						"Key": "Aaron Adams",
						"Value": "fsaadams"
					},
					{
						"Key": "Aaron Bingham",
						"Value": "fsabingham"
					},
					{
						"Key": "Aaron Carpenter",
						"Value": "fsacarpent"
					},
					{
						"Key": "Aaron Jenkins",
						"Value": "fsajenkins"
					},
					{
						"Key": "Aaron Johnson",
						"Value": "fsajohnson"
					},
					{
						"Key": "Aaron Schinke",
						"Value": "aschinke"
					},
					{
						"Key": "Abe Avila",
						"Value": "fsaavila"
					},
					{
						"Key": "Adam Daniel",
						"Value": "fsadaniel"
					},
					{
						"Key": "Adam Greenhalgh",
						"Value": "fsagreenha"
					},
					{
						"Key": "Adam Maher",
						"Value": "fsamaher"
					},
					{
						"Key": "Adam Towner",
						"Value": "fsatowner"
					},
					{
						"Key": "Adrian Burnett",
						"Value": "fsaburnett"
					},
					{
						"Key": "Adrienne Gasser",
						"Value": "fsagasser"
					},
					{
						"Key": "AJ Jahangiri",
						"Value": "fsajahangi"
					},
					{
						"Key": "Al Ramirez",
						"Value": "fsaramirez"
					}
				]
			},
			{
				"TradeId": 180051,
				"SiteId": 3,
				"EventId": 2755656,
				"ValuationKey": "bb",
				"Vin": "1ZVBP8CH4A5112161",
				"Year": 2010,
				"MakeCode": "",
				"MakeDescription": "Ford",
				"ModelCode": "",
				"ModelDescription": "Mustang GT 2D Coupe",
				"TrimCode": "",
				"TrimDescription": "",
				"ExteriorColor": "Black Clearcoat",
				"Cylinders": 8,
				"Mileage": 29800,
				"ExistingVsc": false,
				"InspectedBy": "",
				"Value": 15900,
				"AcvAmount": 19844,
				"PayoffAmount": 0,
				"IsFreeText": false,
				"NoTradeCredit": false,
				"Appraisal": {
					"ValuationId": 0,
					"EngineCode": null,
					"TransmissionCode": null,
					"DriveCode": null,
					"PriceType": null,
					"AppraisalValue": 0,
					"MileageAdjustment": 0,
					"ValuationAmount": 0,
					"EquipmentList": null,
					"EquipmentRelationshipList": null,
					"AppraisalRawData": null
				},
				"ReconditionItems": [],
				"PriceTypeLookup": [],
				"YearsLookup": [
					2013,
					2012,
					2011
				],
				"MakesLookup": [],
				"ModelsLookup": [],
				"TrimsLookup": [],
				"EnginesLookup": [],
				"TransmissionsLookup": [],
				"DrivesLookup": [],
				"UserLookup": [
					{
						"Key": " Adam Nichols",
						"Value": "fsanichols"
					},
					{
						"Key": "Aaron Adams",
						"Value": "fsaadams"
					},
					{
						"Key": "Aaron Bingham",
						"Value": "fsabingham"
					},
					{
						"Key": "Aaron Carpenter",
						"Value": "fsacarpent"
					},
					{
						"Key": "Aaron Jenkins",
						"Value": "fsajenkins"
					},
					{
						"Key": "Aaron Johnson",
						"Value": "fsajohnson"
					},
					{
						"Key": "Aaron Schinke",
						"Value": "aschinke"
					},
					{
						"Key": "Abe Avila",
						"Value": "fsaavila"
					},
					{
						"Key": "Adam Daniel",
						"Value": "fsadaniel"
					},
					{
						"Key": "Adam Greenhalgh",
						"Value": "fsagreenha"
					},
					{
						"Key": "Adam Maher",
						"Value": "fsamaher"
					},
					{
						"Key": "Adam Towner",
						"Value": "fsatowner"
					},
					{
						"Key": "Adrian Burnett",
						"Value": "fsaburnett"
					},
					{
						"Key": "Adrienne Gasser",
						"Value": "fsagasser"
					},
					{
						"Key": "AJ Jahangiri",
						"Value": "fsajahangi"
					},
					{
						"Key": "Al Ramirez",
						"Value": "fsaramirez"
					},
					{
						"Key": "Alan Fordham",
						"Value": "fsafordham"
					},
					{
						"Key": "Alan Gonzalez",
						"Value": "fsagonzo"
					},
					{
						"Key": "Alesha Arp",
						"Value": "fsaarp"
					},
					{
						"Key": "Alex Davis",
						"Value": "fsadavis"
					},
					{
						"Key": "Alex Perry",
						"Value": "fsaperry"
					},
					{
						"Key": "Alex Pilz",
						"Value": "fsapilz"
					},
					{
						"Key": "Ali Mansouri",
						"Value": "fsamansour"
					},
					{
						"Key": "Alisha Fliss",
						"Value": "fsafliss"
					},
					{
						"Key": "Allan Higgins",
						"Value": "fsahiggins"
					},
					{
						"Key": "Alli Horita",
						"Value": "fsahorita"
					},
					{
						"Key": "Aloha sprint",
						"Value": "fssprint"
					},
					{
						"Key": "aloha testing",
						"Value": "fstestaloh"
					},
					{
						"Key": "Alpana Wadhwa",
						"Value": "fsawadhwa"
					},
					{
						"Key": "Amber Skvarca",
						"Value": "fsaorozco"
					},
					{
						"Key": "Ameeta Saxena",
						"Value": "fsasaxena"
					},
					{
						"Key": "Amit Rege",
						"Value": "fsarege"
					},
					{
						"Key": "Amy Cooper",
						"Value": "fsacooper"
					},
					{
						"Key": "Amy Fair",
						"Value": "fsafair"
					},
					{
						"Key": "Andrea Wyss",
						"Value": "fsawyss"
					},
					{
						"Key": "Andrew Baird",
						"Value": "fsabaird"
					},
					{
						"Key": "Andrew McGary",
						"Value": "fsandrewm"
					},
					{
						"Key": "Andrew Shields",
						"Value": "fsashields"
					},
					{
						"Key": "Angy Ormonde",
						"Value": "fsaormonde"
					},
					{
						"Key": "Anne Cicero",
						"Value": "fsacicero"
					},
					{
						"Key": "Art  Soliva",
						"Value": "fsasoliva"
					},
					{
						"Key": "Art Sherwood",
						"Value": "fsasherwoo"
					},
					{
						"Key": "Arthur McCracken",
						"Value": "ndarthur"
					},
					{
						"Key": "Arvind Poddar",
						"Value": "fsapoddar"
					},
					{
						"Key": "Arvind QA",
						"Value": "AQA"
					},
					{
						"Key": "Arvind Test",
						"Value": "ATest0"
					},
					{
						"Key": "Arvind Tester",
						"Value": "ATester0"
					}
				]
			},
			{
				"TradeId": 0,
				"SiteId": 0,
				"EventId": 0,
				"ValuationKey": "bb",
				"Vin": null,
				"Year": 0,
				"MakeCode": null,
				"MakeDescription": null,
				"ModelCode": null,
				"ModelDescription": null,
				"TrimCode": null,
				"TrimDescription": null,
				"ExteriorColor": null,
				"Cylinders": 0,
				"Mileage": 0,
				"ExistingVsc": false,
				"InspectedBy": null,
				"Value": 0,
				"AcvAmount": 0,
				"PayoffAmount": 0,
				"IsFreeText": false,
				"NoTradeCredit": false,
				"Appraisal": {
					"ValuationId": 0,
					"EngineCode": null,
					"TransmissionCode": null,
					"DriveCode": null,
					"PriceType": null,
					"AppraisalValue": 0,
					"MileageAdjustment": 0,
					"ValuationAmount": 0,
					"EquipmentList": null,
					"EquipmentRelationshipList": null,
					"AppraisalRawData": null
				},
				"ReconditionItems": null,
				"PriceTypeLookup": [],
				"YearsLookup": [
					2013,
					2012,
					2011
				],
				"MakesLookup": [],
				"ModelsLookup": [],
				"TrimsLookup": [],
				"EnginesLookup": [],
				"TransmissionsLookup": [],
				"DrivesLookup": [],
				"UserLookup": [
					{
						"Key": " Adam Nichols",
						"Value": "fsanichols"
					},
					{
						"Key": "Aaron Adams",
						"Value": "fsaadams"
					},
					{
						"Key": "Aaron Bingham",
						"Value": "fsabingham"
					},
					{
						"Key": "Aaron Carpenter",
						"Value": "fsacarpent"
					},
					{
						"Key": "Aaron Jenkins",
						"Value": "fsajenkins"
					},
					{
						"Key": "Aaron Johnson",
						"Value": "fsajohnson"
					},
					{
						"Key": "Aaron Schinke",
						"Value": "aschinke"
					},
					{
						"Key": "Abe Avila",
						"Value": "fsaavila"
					},
					{
						"Key": "Adam Daniel",
						"Value": "fsadaniel"
					},
					{
						"Key": "Adam Greenhalgh",
						"Value": "fsagreenha"
					},
					{
						"Key": "Adam Maher",
						"Value": "fsamaher"
					},
					{
						"Key": "Adam Towner",
						"Value": "fsatowner"
					}
				]
			}
		],
		"BooksLookup": [
			{
				"Key": "Kelley Blue Book",
				"Value": "kbb"
			},
			{
				"Key": "Black Book",
				"Value": "bb"
			},
			{
				"Key": "N.A.D.A.",
				"Value": "nada"
			}
		],
		"YearsLookup": [
			2017,
			2016,
			2015,
			2014,
			2013,
			2012,
			2011,
			2010,
			2009,
			2008,
			2007,
			2006,
			2005,
			2004,
			2003,
			2002,
			2001,
			2000,
			1999,
			1998,
			1997,
			1996,
			1995,
			1994,
			1993,
			1992,
			1991,
			1990,
			1989,
			1988,
			1987,
			1986,
			1985,
			1984,
			1983,
			1982,
			1981
		],
		"YearsKBBLookup": [
			2013,
			2012,
			2011,
			2010,
			2009,
			2008,
			2007,
			2006,
			2005,
			2004,
			2003,
			2002,
			2001,
			2000,
			1999,
			1998,
			1997,
			1996,
			1995,
			1994,
			1993
		],
		"YearsBBLookup": [
			2016,
			2015,
			2014,
			2013,
			2012,
			2011,
			2010,
			2009,
			2008,
			2007,
			2006,
			2005,
			2004,
			2003,
			2002,
			2001,
			2000,
			1999,
			1998,
			1997,
			1996,
			1995,
			1994,
			1993,
			1992,
			1991,
			1990,
			1989,
			1988,
			1987,
			1986,
			1985,
			1984,
			1983,
			1982,
			1981
		],
		"YearsNADALookup": [
			2017,
			2016,
			2015,
			2014,
			2013,
			2012,
			2011,
			2010,
			2009,
			2008,
			2007,
			2006,
			2005,
			2004,
			2003,
			2002,
			2001,
			2000,
			1999,
			1998,
			1997
		],
		"KBBPriceType": [
			{
				"Key": "Retail",
				"Value": "RetailFinal"
			},
			{
				"Key": "Wholesale",
				"Value": "WholesaleFinal"
			}
		],
		"NadaPriceType": [
			{
				"Key": "Retail",
				"Value": "2"
			},
			{
				"Key": "Trade",
				"Value": "3"
			},
			{
				"Key": "Loan",
				"Value": "1"
			}
		],
		"BBConditonAC": [
			{
				"Key": "Extra Clean",
				"Value": "Extra Clean"
			},
			{
				"Key": "Clean",
				"Value": "Clean"
			},
			{
				"Key": "Average",
				"Value": "Average"
			},
			{
				"Key": "Rough",
				"Value": "Rough"
			}
		],
		"CustomerVehicles": [],
		"TradeSetup": {
			"dealerData": null,
			"thirdPartyIntegrators": [
				{
					"IntThirdPartyId": 1,
					"iSiteId": 3,
					"vchThirdParty": "Red Rocket Solutions",
					"vchProduct": "SMP Direct",
					"vchDesc": "Reporting Tool for DME marketing program",
					"vchUserName": "056774647473",
					"vchPassword": "455205",
					"chInsertBy": "fsjwallace",
					"dtInsertDate": "10/7/2005 11:18:33 AM",
					"chUpdateBy": "fsjwallace",
					"dtUpdateDate": "10/7/2005 11:18:33 AM",
					"tiRecordStatus": 1,
					"vchExtraData1": "3",
					"vchExtraData1Desc": "",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "",
					"vchExtraData3Desc": "",
					"vchIntegrationType": null,
					"iAddressId": 0,
					"iVendorId": 0,
					"iVendorProductId": 3,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 21,
					"iSiteId": 3,
					"vchThirdParty": "OpenMarket",
					"vchProduct": "Messaging",
					"vchDesc": "Open Market provider config",
					"vchUserName": "000-000-108-65421",
					"vchPassword": "VGzIqEnL",
					"chInsertBy": "system    ",
					"dtInsertDate": "1/1/1900 12:00:00 AM",
					"chUpdateBy": "fsjtang   ",
					"dtUpdateDate": "3/9/2015 8:27:56 PM",
					"tiRecordStatus": 1,
					"vchExtraData1": "program_id=1856151&shortcode=697433",
					"vchExtraData1Desc": "PropertyData",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "openmarket",
					"vchExtraData3Desc": "ProviderName",
					"vchIntegrationType": null,
					"iAddressId": 0,
					"iVendorId": 0,
					"iVendorProductId": 17,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 41,
					"iSiteId": 3,
					"vchThirdParty": "Dealer Specialties  Image Import",
					"vchProduct": "Dealer Specialties Image Import",
					"vchDesc": "3rd party image import",
					"vchUserName": "",
					"vchPassword": "",
					"chInsertBy": "fsrramesh ",
					"dtInsertDate": "11/28/2012 3:37:28 AM",
					"chUpdateBy": "fsrramesh ",
					"dtUpdateDate": "11/28/2012 3:37:28 AM",
					"tiRecordStatus": 1,
					"vchExtraData1": "3",
					"vchExtraData1Desc": "DSDealerID",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "",
					"vchExtraData3Desc": "",
					"vchIntegrationType": null,
					"iAddressId": 0,
					"iVendorId": 0,
					"iVendorProductId": 21,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 42,
					"iSiteId": 3,
					"vchThirdParty": "Strathcom",
					"vchProduct": "Strathcom Inventory Image Import",
					"vchDesc": "Inventory Image Import",
					"vchUserName": "",
					"vchPassword": "",
					"chInsertBy": "fsrramesh ",
					"dtInsertDate": "11/28/2012 3:38:21 AM",
					"chUpdateBy": "fsrramesh ",
					"dtUpdateDate": "11/28/2012 3:38:21 AM",
					"tiRecordStatus": 1,
					"vchExtraData1": "3",
					"vchExtraData1Desc": "DSDealerID",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "",
					"vchExtraData3Desc": "",
					"vchIntegrationType": null,
					"iAddressId": 0,
					"iVendorId": 0,
					"iVendorProductId": 20,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 43,
					"iSiteId": 3,
					"vchThirdParty": "eBiz Autos",
					"vchProduct": "eBiz Webleads",
					"vchDesc": "",
					"vchUserName": "",
					"vchPassword": "",
					"chInsertBy": "fsrramesh ",
					"dtInsertDate": "12/5/2012 3:36:44 AM",
					"chUpdateBy": "fsrramesh ",
					"dtUpdateDate": "12/5/2012 3:36:44 AM",
					"tiRecordStatus": 1,
					"vchExtraData1": "",
					"vchExtraData1Desc": "",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "",
					"vchExtraData3Desc": "",
					"vchIntegrationType": null,
					"iAddressId": 0,
					"iVendorId": 0,
					"iVendorProductId": 32,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 44,
					"iSiteId": 3,
					"vchThirdParty": "AutoTrader",
					"vchProduct": "Inventory Image Import",
					"vchDesc": "Image Import Process for Canadian Dealers, using Trader, CA",
					"vchUserName": "",
					"vchPassword": "",
					"chInsertBy": "fsrramesh ",
					"dtInsertDate": "12/5/2012 3:37:09 AM",
					"chUpdateBy": "fsapoddar ",
					"dtUpdateDate": "7/22/2013 1:37:44 PM",
					"tiRecordStatus": 1,
					"vchExtraData1": "BS200622195445",
					"vchExtraData1Desc": "CompanyID",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "",
					"vchExtraData3Desc": "",
					"vchIntegrationType": null,
					"iAddressId": 0,
					"iVendorId": 0,
					"iVendorProductId": 31,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 50,
					"iSiteId": 3,
					"vchThirdParty": "DealerTrack",
					"vchProduct": "Credit Application",
					"vchDesc": "DealerTrack Application",
					"vchUserName": "dskpost",
					"vchPassword": "94zp7nab",
					"chInsertBy": "fsbmoss   ",
					"dtInsertDate": "9/11/2014 6:05:30 PM",
					"chUpdateBy": "fsjtang   ",
					"dtUpdateDate": "3/9/2015 8:27:43 PM",
					"tiRecordStatus": 1,
					"vchExtraData1": "DSK",
					"vchExtraData1Desc": "ProviderID",
					"vchExtraData2": "DT1234 ",
					"vchExtraData2Desc": "DealerID",
					"vchExtraData3": "DealerTrack",
					"vchExtraData3Desc": "ProviderKey",
					"vchIntegrationType": null,
					"iAddressId": 1,
					"iVendorId": 0,
					"iVendorProductId": 44,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 51,
					"iSiteId": 3,
					"vchThirdParty": "Kornerstone",
					"vchProduct": "PrepaidMaintenanceContract",
					"vchDesc": "1",
					"vchUserName": "",
					"vchPassword": "",
					"chInsertBy": "fsdmoon   ",
					"dtInsertDate": "10/28/2014 12:38:54 PM",
					"chUpdateBy": "fsdmoon   ",
					"dtUpdateDate": "10/28/2014 12:38:54 PM",
					"tiRecordStatus": 1,
					"vchExtraData1": "1",
					"vchExtraData1Desc": "DealerId",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "",
					"vchExtraData3Desc": "",
					"vchIntegrationType": null,
					"iAddressId": 1,
					"iVendorId": 0,
					"iVendorProductId": 3081,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				},
				{
					"IntThirdPartyId": 52,
					"iSiteId": 3,
					"vchThirdParty": "Kornerstone",
					"vchProduct": "Search",
					"vchDesc": "z",
					"vchUserName": "",
					"vchPassword": "",
					"chInsertBy": "fsdmoon   ",
					"dtInsertDate": "10/28/2014 12:42:14 PM",
					"chUpdateBy": "fsdmoon   ",
					"dtUpdateDate": "10/28/2014 12:42:14 PM",
					"tiRecordStatus": 1,
					"vchExtraData1": "KS12345",
					"vchExtraData1Desc": "dealerId",
					"vchExtraData2": "",
					"vchExtraData2Desc": "",
					"vchExtraData3": "",
					"vchExtraData3Desc": "",
					"vchIntegrationType": null,
					"iAddressId": 1,
					"iVendorId": 0,
					"iVendorProductId": 3088,
					"tiEnabled": 0,
					"MonthlyFeeAmount": 0,
					"MonthlyFeeWaived": false,
					"StartDate": null,
					"EndDate": null
				}
			],
			"valuationBooks": null,
			"dmsOptionCodes": null,
			"entity": null,
			"siteAddress": {
				"iAddressId": 1,
				"iSiteId": 3,
				"vchAddress1": "Sales Address 1123",
				"vchAddress2": "Sales Address 2123",
				"vchCity": "City",
				"chState": "AK  ",
				"vchPostCode": "123454",
				"vchPhone": "(949) 709-2468",
				"vchFax": "(347) 412-3339",
				"vchURL": "www.firesocket.com",
				"iTimeDiff": -1,
				"vchDMSPushModule": "0",
				"vchDMSServicePush": "0",
				"vchLeaseLenderId": "",
				"vchBankLenderId": "",
				"iKbbValuationData": 0,
				"iDefaultKbbValType": 0,
				"iDefaultBbValType": 0,
				"iDefaultNadaValType": 0,
				"roleId": 0,
				"iUseWebdeskingFlag": 0,
				"vchCountryCode": "U",
				"encryptedSiteId": null,
				"vchSiteName": "DealerSocket",
				"franchiseStatus": null,
				"PrintableLogoUrl": "",
				"siteHasADP": true
			},
			"kbbYearList": null,
			"bbYearList": null,
			"nadaYearList": null,
			"siteFranchiseTree": null
		},
		"$type": "SalesOpportunityTrades",
		"ReconditionItems": [
			{
				"ReconditionItemId": 0,
				"SiteId": 154,
				"AddressId": 8,
				"TradeId": 0,
				"Description": "Oil and Lube",
				"Amount": 89,
				"IsDefault": false
			},
			{
				"ReconditionItemId": 0,
				"SiteId": 154,
				"AddressId": 8,
				"TradeId": 0,
				"Description": "Tires",
				"Amount": 400,
				"IsDefault": false
			}
		],
		"Integrations": [
			{
				"Key": "vAuto",
				"Value": "sites"
			},
			{
				"Key": "CarFax",
				"Value": "C429748"
			},
			{
				"Key": "eCarlist",
				"Value": "287GMF1490"
			},
			{
				"Key": "Auto Exchange",
				"Value": "4180"
			},
			{
				"Key": "RedBumper",
				"Value": ""
			}
		]
	};

/***/ },

/***/ 803:
/***/ function(module, exports) {

	module.exports = [
		{
			"Key": "Acura",
			"Value": "Acura"
		},
		{
			"Key": "Aston Martin",
			"Value": "Aston Martin"
		},
		{
			"Key": "Audi",
			"Value": "Audi"
		},
		{
			"Key": "Bentley",
			"Value": "Bentley"
		},
		{
			"Key": "BMW",
			"Value": "BMW"
		},
		{
			"Key": "Buick",
			"Value": "Buick"
		},
		{
			"Key": "Cadillac",
			"Value": "Cadillac"
		},
		{
			"Key": "Chevrolet",
			"Value": "Chevrolet"
		},
		{
			"Key": "Chrysler",
			"Value": "Chrysler"
		},
		{
			"Key": "Dodge",
			"Value": "Dodge"
		},
		{
			"Key": "Ferrari",
			"Value": "Ferrari"
		},
		{
			"Key": "Ford",
			"Value": "Ford"
		},
		{
			"Key": "GMC",
			"Value": "GMC"
		},
		{
			"Key": "Honda",
			"Value": "Honda"
		},
		{
			"Key": "Hyundai",
			"Value": "Hyundai"
		},
		{
			"Key": "Infiniti",
			"Value": "Infiniti"
		},
		{
			"Key": "Jaguar",
			"Value": "Jaguar"
		},
		{
			"Key": "Jeep",
			"Value": "Jeep"
		},
		{
			"Key": "Kia",
			"Value": "Kia"
		},
		{
			"Key": "Lamborghini",
			"Value": "Lamborghini"
		},
		{
			"Key": "Land Rover",
			"Value": "Land Rover"
		},
		{
			"Key": "Lexus",
			"Value": "Lexus"
		},
		{
			"Key": "Lincoln",
			"Value": "Lincoln"
		},
		{
			"Key": "Lotus",
			"Value": "Lotus"
		},
		{
			"Key": "Maserati",
			"Value": "Maserati"
		},
		{
			"Key": "Maybach",
			"Value": "Maybach"
		},
		{
			"Key": "Mazda",
			"Value": "Mazda"
		},
		{
			"Key": "Mercedes-Benz",
			"Value": "Mercedes-Benz"
		},
		{
			"Key": "Mercury",
			"Value": "Mercury"
		},
		{
			"Key": "MINI",
			"Value": "MINI"
		},
		{
			"Key": "Mitsubishi",
			"Value": "Mitsubishi"
		},
		{
			"Key": "Nissan",
			"Value": "Nissan"
		},
		{
			"Key": "Porsche",
			"Value": "Porsche"
		},
		{
			"Key": "Ram",
			"Value": "Ram"
		},
		{
			"Key": "Rolls-Royce",
			"Value": "Rolls-Royce"
		},
		{
			"Key": "Saab",
			"Value": "Saab"
		},
		{
			"Key": "Scion",
			"Value": "Scion"
		},
		{
			"Key": "Smart",
			"Value": "Smart"
		},
		{
			"Key": "Subaru",
			"Value": "Subaru"
		},
		{
			"Key": "Suzuki",
			"Value": "Suzuki"
		},
		{
			"Key": "Toyota",
			"Value": "Toyota"
		},
		{
			"Key": "Volkswagen",
			"Value": "Volkswagen"
		},
		{
			"Key": "Volvo",
			"Value": "Volvo"
		}
	];

/***/ },

/***/ 804:
/***/ function(module, exports) {

	module.exports = [
		{
			"Key": "282289",
			"Value": "1 Series 128i Convertible 2D"
		},
		{
			"Key": "282274",
			"Value": "1 Series 128i Coupe 2D"
		},
		{
			"Key": "282276",
			"Value": "1 Series 135i Convertible 2D"
		},
		{
			"Key": "282275",
			"Value": "1 Series 135i Coupe 2D"
		},
		{
			"Key": "291320",
			"Value": "1 Series M Coupe 2D"
		},
		{
			"Key": "282348",
			"Value": "3 Series 328i Convertible 2D"
		},
		{
			"Key": "282040",
			"Value": "3 Series 328i Coupe 2D"
		},
		{
			"Key": "282041",
			"Value": "3 Series 328i Sedan 4D"
		},
		{
			"Key": "282347",
			"Value": "3 Series 328i Sport Wagon 4D"
		},
		{
			"Key": "282046",
			"Value": "3 Series 328i xDrive Coupe 2D"
		},
		{
			"Key": "282042",
			"Value": "3 Series 328i xDrive Sedan 4D"
		},
		{
			"Key": "282350",
			"Value": "3 Series 328i xDrive Sport Wagon 4D"
		},
		{
			"Key": "282045",
			"Value": "3 Series 335d Sedan 4D"
		},
		{
			"Key": "282349",
			"Value": "3 Series 335i Convertible 2D"
		},
		{
			"Key": "282049",
			"Value": "3 Series 335i Coupe 2D"
		},
		{
			"Key": "282039",
			"Value": "3 Series 335i Sedan 4D"
		},
		{
			"Key": "282050",
			"Value": "3 Series 335i xDrive Coupe 2D"
		},
		{
			"Key": "282043",
			"Value": "3 Series 335i xDrive Sedan 4D"
		},
		{
			"Key": "282346",
			"Value": "3 Series 335is Convertible 2D"
		},
		{
			"Key": "282337",
			"Value": "3 Series 335is Coupe 2D"
		},
		{
			"Key": "281999",
			"Value": "5 Series 528i Sedan 4D"
		},
		{
			"Key": "282006",
			"Value": "5 Series 535i Gran Turismo Sedan 4D"
		},
		{
			"Key": "287361",
			"Value": "5 Series 535i Gran Turismo xDrive Sedan 4D"
		},
		{
			"Key": "282000",
			"Value": "5 Series 535i Sedan 4D"
		},
		{
			"Key": "282003",
			"Value": "5 Series 535i xDrive Sedan 4D"
		},
		{
			"Key": "282015",
			"Value": "5 Series 550i Gran Turismo Sedan 4D"
		},
		{
			"Key": "282016",
			"Value": "5 Series 550i Gran Turismo xDrive Sedan 4D"
		},
		{
			"Key": "282001",
			"Value": "5 Series 550i Sedan 4D"
		},
		{
			"Key": "281998",
			"Value": "5 Series 550i xDrive Sedan 4D"
		},
		{
			"Key": "281957",
			"Value": "7 Series 740i Sedan 4D"
		},
		{
			"Key": "281961",
			"Value": "7 Series 740Li Sedan 4D"
		},
		{
			"Key": "282029",
			"Value": "7 Series 750i ActiveHybrid Sedan 4D"
		},
		{
			"Key": "281979",
			"Value": "7 Series 750i Sedan 4D"
		},
		{
			"Key": "281984",
			"Value": "7 Series 750i xDrive Sedan 4D"
		},
		{
			"Key": "282030",
			"Value": "7 Series 750Li ActiveHybrid Sedan 4D"
		},
		{
			"Key": "281980",
			"Value": "7 Series 750Li Sedan 4D"
		},
		{
			"Key": "281981",
			"Value": "7 Series 750Li xDrive Sedan 4D"
		},
		{
			"Key": "287778",
			"Value": "7 Series 760Li Sedan 4D"
		},
		{
			"Key": "281965",
			"Value": "7 Series Alpina B7 Sedan 4D"
		},
		{
			"Key": "287779",
			"Value": "7 Series Alpina B7 xDrive Sedan 4D"
		},
		{
			"Key": "281860",
			"Value": "M3 Convertible 2D"
		},
		{
			"Key": "282187",
			"Value": "M3 Coupe 2D"
		},
		{
			"Key": "282234",
			"Value": "M3 Sedan 4D"
		},
		{
			"Key": "288671",
			"Value": "X3 xDrive28i Sport Utility 4D"
		},
		{
			"Key": "288664",
			"Value": "X3 xDrive35i Sport Utility 4D"
		},
		{
			"Key": "303647",
			"Value": "X5 M xDrive Sport Utility 4D"
		},
		{
			"Key": "282257",
			"Value": "X5 xDrive35d Sport Utility 4D"
		},
		{
			"Key": "282259",
			"Value": "X5 xDrive35i Premium Sport Utility 4D"
		},
		{
			"Key": "282260",
			"Value": "X5 xDrive35i Sport Activity Sport Utility 4D"
		},
		{
			"Key": "282262",
			"Value": "X5 xDrive35i Sport Utility 4D"
		},
		{
			"Key": "282258",
			"Value": "X5 xDrive50i Sport Utility 4D"
		},
		{
			"Key": "282119",
			"Value": "X6 ActiveHybrid Sport Utility 4D"
		},
		{
			"Key": "303646",
			"Value": "X6 M Sport Utility 4D"
		},
		{
			"Key": "282261",
			"Value": "X6 xDrive35i Sport Utility 4D"
		},
		{
			"Key": "282263",
			"Value": "X6 xDrive50i Sport Utility 4D"
		},
		{
			"Key": "281892",
			"Value": "Z4 sDrive30i Roadster 2D"
		},
		{
			"Key": "281891",
			"Value": "Z4 sDrive35i Roadster 2D"
		},
		{
			"Key": "281893",
			"Value": "Z4 sDrive35is Roadster 2D"
		}
	];

/***/ },

/***/ 805:
/***/ function(module, exports) {

	module.exports = [
		{
			"Key": "M3",
			"Value": "Convertible 2D"
		},
		{
			"Key": "M3",
			"Value": "Coupe 2D"
		},
		{
			"Key": "M3",
			"Value": "Sedan 4D"
		}
	];

/***/ },

/***/ 806:
/***/ function(module, exports) {

	module.exports = {
		"ModelsLookup": [
			{
				"Key": "282234",
				"Value": "M3 Sedan 4D"
			}
		],
		"iValuationId": 0,
		"valuationTab": 0,
		"valuationKey": "KBB",
		"valuationState": "CA  ",
		"valuationZipCode": "",
		"inputVIN": "WBSPM9C50BE202754",
		"mileage": 0,
		"year": 2011,
		"make": "BMW",
		"makeCode": "BMW",
		"models": [],
		"model": "M3",
		"modelDescription": "M3 Sedan 4D",
		"modelCode": "282234",
		"trim": "Sedan 4D",
		"shortModel": "M3",
		"engine": "",
		"engineCode": "",
		"transmission": "",
		"transmissionCode": "",
		"drive": "",
		"driveCode": "",
		"status": "",
		"zeroPointMileage": 0,
		"mileageAdjustment": 0,
		"valueWholesaleBase": 0,
		"valueRetailBase": 0,
		"valueWholesaleFinal": 0,
		"valueRetailFinal": 0,
		"valueTradeInFairBase": 0,
		"valueTradeInGoodBase": 0,
		"valueTradeInExcellentBase": 0,
		"valueTradeInFair": 0,
		"valueTradeInGood": 0,
		"valueTradeInExcellent": 0,
		"valuePrivatePartyFair": 0,
		"valuePrivatePartyGood": 0,
		"valuePrivatePartyExcellent": 0,
		"valueMSRP": 0,
		"valueLoan": 0,
		"valueMileageAdjLoan": 0,
		"valueMileageTradeIn": 0,
		"valueMileageRetail": 0,
		"additionalData": "",
		"error": 0,
		"oEquipment": {
			"valuationTab": 0,
			"availableEquipment": [
				{
					"valuationTab": 0,
					"codeId": 0,
					"codeDescription": "Cold Weather Pkg",
					"codeValue": "4372855",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 1,
					"codeDescription": "Competition",
					"codeValue": "4372856",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 2,
					"codeDescription": "Convenience Pkg",
					"codeValue": "6899797",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 3,
					"codeDescription": "Premium Pkg",
					"codeValue": "4372866",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 4,
					"codeDescription": "Premium Pkg 2",
					"codeValue": "6899798",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 5,
					"codeDescription": "Technology Pkg",
					"codeValue": "4372872",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 6,
					"codeDescription": "Traction Control",
					"codeValue": "4372874",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 7,
					"codeDescription": "Stability Control",
					"codeValue": "4372871",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 8,
					"codeDescription": "ABS (4-Wheel)",
					"codeValue": "4309638",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 9,
					"codeDescription": "Keyless Entry",
					"codeValue": "4372861",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 10,
					"codeDescription": "Keyless Start",
					"codeValue": "4372862",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 11,
					"codeDescription": "Air Conditioning",
					"codeValue": "4309639",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 12,
					"codeDescription": "Power Windows",
					"codeValue": "4309654",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 13,
					"codeDescription": "Power Door Locks",
					"codeValue": "4309652",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 14,
					"codeDescription": "Cruise Control",
					"codeValue": "4309646",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 15,
					"codeDescription": "Power Steering",
					"codeValue": "4309653",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 16,
					"codeDescription": "Tilt Wheel",
					"codeValue": "4309657",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 17,
					"codeDescription": "AM/FM Stereo",
					"codeValue": "4309640",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 18,
					"codeDescription": "MP3 (Single Disc)",
					"codeValue": "4309644",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 19,
					"codeDescription": "Hi-Fi Premium Sound",
					"codeValue": "4372867",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 20,
					"codeDescription": "Sirius Satellite",
					"codeValue": "4372869",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 21,
					"codeDescription": "Navigation System",
					"codeValue": "4309651",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 22,
					"codeDescription": "Bluetooth Wireless",
					"codeValue": "4442756",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 23,
					"codeDescription": "BMW Assist",
					"codeValue": "4372873",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 24,
					"codeDescription": "Parking Sensors",
					"codeValue": "4372865",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 25,
					"codeDescription": "Dual Air Bags",
					"codeValue": "4372857",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 26,
					"codeDescription": "Side Air Bags",
					"codeValue": "4372870",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 27,
					"codeDescription": "F&R Head Curtain Air Bags",
					"codeValue": "4372858",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 28,
					"codeDescription": "Heated Seats",
					"codeValue": "4372860",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 29,
					"codeDescription": "Dual Power Seats",
					"codeValue": "4309647",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 30,
					"codeDescription": "Leather",
					"codeValue": "4309650",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 31,
					"codeDescription": "Moon Roof",
					"codeValue": "4372864",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 32,
					"codeDescription": "HID Headlamps",
					"codeValue": "4372876",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 33,
					"codeDescription": "Rear Spoiler",
					"codeValue": "4309656",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 34,
					"codeDescription": "Alloy Wheels",
					"codeValue": "4372853",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 1
				},
				{
					"valuationTab": 0,
					"codeId": 35,
					"codeDescription": "Premium Wheels",
					"codeValue": "4309655",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 36,
					"codeDescription": "Premium Wheels 19\"+",
					"codeValue": "4372854",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "",
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				}
			],
			"optionRelationships": [
				{
					"valuationTab": 0,
					"codeId": 0,
					"codeDescription": "Alloy Wheels",
					"codeValue": "4372853",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "Conflicts With",
					"OptionRelationshipID": 4309655,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": null,
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 1,
					"codeDescription": "Premium Wheels",
					"codeValue": "4309655",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "Conflicts With",
					"OptionRelationshipID": 4372854,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": null,
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 2,
					"codeDescription": "Premium Wheels 19\"+",
					"codeValue": "4372854",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "Conflicts With",
					"OptionRelationshipID": 4309655,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": null,
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 3,
					"codeDescription": "Premium Wheels 19\"+",
					"codeValue": "4372854",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "Conflicts With",
					"OptionRelationshipID": 4372853,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": null,
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 4,
					"codeDescription": "Premium Wheels",
					"codeValue": "4309655",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "Conflicts With",
					"OptionRelationshipID": 4372853,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": null,
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 5,
					"codeDescription": "Alloy Wheels",
					"codeValue": "4372853",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": "Conflicts With",
					"OptionRelationshipID": 4372854,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": null,
					"IsDefaultConfiguration": 0
				}
			],
			"availableEngines": [
				{
					"valuationTab": 0,
					"codeId": 1,
					"codeDescription": "V8, 4.0 Liter",
					"codeValue": "4309658",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": null,
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 0
				}
			],
			"availableDTrains": [
				{
					"valuationTab": 0,
					"codeId": 1,
					"codeDescription": "RWD",
					"codeValue": "4309661",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": null,
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 0
				}
			],
			"availableTrans": [
				{
					"valuationTab": 0,
					"codeId": 0,
					"codeDescription": "Select One...",
					"codeValue": "-1",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": null,
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": null,
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 1,
					"codeDescription": "Manual, 6-Spd w/Overdrive",
					"codeValue": "4309659",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": null,
					"OptionRelationshipID": 0,
					"standardEquip": 1,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "S",
					"IsDefaultConfiguration": 0
				},
				{
					"valuationTab": 0,
					"codeId": 2,
					"codeDescription": "Automatic, 7-Spd Double Clutch w/DriveLogic",
					"codeValue": "4309660",
					"model": null,
					"trim": null,
					"shortModel": null,
					"equipWholesaleValue": 0,
					"equipRetailValue": 0,
					"equipLoanValue": 0,
					"equipTradeInFairValue": 0,
					"equipTradeInGoodValue": 0,
					"equipTradeInExcellentValue": 0,
					"equipMSRPValue": 0,
					"OptionRelationshipType": null,
					"OptionRelationshipID": 0,
					"standardEquip": 0,
					"isAdded": 0,
					"isIncluded": 0,
					"OptionAvailabilityCode": "A",
					"IsDefaultConfiguration": 0
				}
			],
			"vinSpecificEquipment": null
		},
		"values": null
	};

/***/ },

/***/ 807:
/***/ function(module, exports) {

	module.exports = {
		"error": -600
	};

/***/ },

/***/ 808:
/***/ function(module, exports) {

	module.exports = {
		"ModelsLookup": [
			{
				"Key": "306470",
				"Value": "Corolla L Sedan 4D"
			},
			{
				"Key": "306471",
				"Value": "Corolla LE Sedan 4D"
			},
			{
				"Key": "306472",
				"Value": "Corolla S Sedan 4D"
			}
		],
		"iValuationId": 0,
		"valuationTab": 0,
		"valuationKey": "KBB",
		"valuationState": "UT  ",
		"valuationZipCode": "",
		"inputVIN": "5YFBU4EE4DP102020",
		"mileage": 0,
		"year": 2013,
		"make": "Toyota",
		"makeCode": "Toyota",
		"models": [
			{
				"valuationTab": 0,
				"codeId": 1,
				"codeDescription": "Corolla L Sedan 4D",
				"codeValue": "306470",
				"model": "Corolla",
				"trim": "L Sedan 4D",
				"shortModel": "Corolla",
				"equipWholesaleValue": 0,
				"equipRetailValue": 0,
				"equipLoanValue": 0,
				"equipTradeInFairValue": 0,
				"equipTradeInGoodValue": 0,
				"equipTradeInExcellentValue": 0,
				"equipMSRPValue": 0,
				"OptionRelationshipType": null,
				"OptionRelationshipID": 0,
				"standardEquip": 0,
				"isAdded": 0,
				"isIncluded": 0,
				"OptionAvailabilityCode": null,
				"IsDefaultConfiguration": 0
			},
			{
				"valuationTab": 0,
				"codeId": 2,
				"codeDescription": "Corolla LE Sedan 4D",
				"codeValue": "306471",
				"model": "Corolla",
				"trim": "LE Sedan 4D",
				"shortModel": "Corolla",
				"equipWholesaleValue": 0,
				"equipRetailValue": 0,
				"equipLoanValue": 0,
				"equipTradeInFairValue": 0,
				"equipTradeInGoodValue": 0,
				"equipTradeInExcellentValue": 0,
				"equipMSRPValue": 0,
				"OptionRelationshipType": null,
				"OptionRelationshipID": 0,
				"standardEquip": 0,
				"isAdded": 0,
				"isIncluded": 0,
				"OptionAvailabilityCode": null,
				"IsDefaultConfiguration": 0
			},
			{
				"valuationTab": 0,
				"codeId": 3,
				"codeDescription": "Corolla S Sedan 4D",
				"codeValue": "306472",
				"model": "Corolla",
				"trim": "S Sedan 4D",
				"shortModel": "Corolla",
				"equipWholesaleValue": 0,
				"equipRetailValue": 0,
				"equipLoanValue": 0,
				"equipTradeInFairValue": 0,
				"equipTradeInGoodValue": 0,
				"equipTradeInExcellentValue": 0,
				"equipMSRPValue": 0,
				"OptionRelationshipType": null,
				"OptionRelationshipID": 0,
				"standardEquip": 0,
				"isAdded": 0,
				"isIncluded": 0,
				"OptionAvailabilityCode": null,
				"IsDefaultConfiguration": 0
			}
		],
		"model": "",
		"modelDescription": "",
		"modelCode": "",
		"trim": "",
		"shortModel": "",
		"engine": "",
		"engineCode": "",
		"transmission": "",
		"transmissionCode": "",
		"drive": "",
		"driveCode": "",
		"status": "",
		"zeroPointMileage": 0,
		"mileageAdjustment": 0,
		"valueWholesaleBase": 0,
		"valueRetailBase": 0,
		"valueWholesaleFinal": 0,
		"valueRetailFinal": 0,
		"valueTradeInFairBase": 0,
		"valueTradeInGoodBase": 0,
		"valueTradeInExcellentBase": 0,
		"valueTradeInFair": 0,
		"valueTradeInGood": 0,
		"valueTradeInExcellent": 0,
		"valuePrivatePartyFair": 0,
		"valuePrivatePartyGood": 0,
		"valuePrivatePartyExcellent": 0,
		"valueMSRP": 0,
		"valueLoan": 0,
		"valueMileageAdjLoan": 0,
		"valueMileageTradeIn": 0,
		"valueMileageRetail": 0,
		"additionalData": "",
		"error": 0,
		"oEquipment": null,
		"values": null
	};

/***/ },

/***/ 809:
/***/ function(module, exports) {

	module.exports = [
		{
			"Key": "EquipmentList",
			"Value": [
				{
					"EquipmentCode": "4372855",
					"EquipmentDescription": "Cold Weather Pkg",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372856",
					"EquipmentDescription": "Competition",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "6899797",
					"EquipmentDescription": "Convenience Pkg",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372866",
					"EquipmentDescription": "Premium Pkg",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "6899798",
					"EquipmentDescription": "Premium Pkg 2",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372872",
					"EquipmentDescription": "Technology Pkg",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372874",
					"EquipmentDescription": "Traction Control",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372871",
					"EquipmentDescription": "Stability Control",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309638",
					"EquipmentDescription": "ABS (4-Wheel)",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372861",
					"EquipmentDescription": "Keyless Entry",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372862",
					"EquipmentDescription": "Keyless Start",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309639",
					"EquipmentDescription": "Air Conditioning",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309654",
					"EquipmentDescription": "Power Windows",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309652",
					"EquipmentDescription": "Power Door Locks",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309646",
					"EquipmentDescription": "Cruise Control",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309653",
					"EquipmentDescription": "Power Steering",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309657",
					"EquipmentDescription": "Tilt Wheel",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309640",
					"EquipmentDescription": "AM/FM Stereo",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309644",
					"EquipmentDescription": "MP3 (Single Disc)",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372867",
					"EquipmentDescription": "Hi-Fi Premium Sound",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372869",
					"EquipmentDescription": "Sirius Satellite",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4309651",
					"EquipmentDescription": "Navigation System",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4442756",
					"EquipmentDescription": "Bluetooth Wireless",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372873",
					"EquipmentDescription": "BMW Assist",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372865",
					"EquipmentDescription": "Parking Sensors",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372857",
					"EquipmentDescription": "Dual Air Bags",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372870",
					"EquipmentDescription": "Side Air Bags",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372858",
					"EquipmentDescription": "F&R Head Curtain Air Bags",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372860",
					"EquipmentDescription": "Heated Seats",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4309647",
					"EquipmentDescription": "Dual Power Seats",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309650",
					"EquipmentDescription": "Leather",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372864",
					"EquipmentDescription": "Moon Roof",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4372876",
					"EquipmentDescription": "HID Headlamps",
					"IsStandardEquipment": false,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309656",
					"EquipmentDescription": "Rear Spoiler",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372853",
					"EquipmentDescription": "Alloy Wheels",
					"IsStandardEquipment": true,
					"IsSelected": true
				},
				{
					"EquipmentCode": "4309655",
					"EquipmentDescription": "Premium Wheels",
					"IsStandardEquipment": false,
					"IsSelected": false
				},
				{
					"EquipmentCode": "4372854",
					"EquipmentDescription": "Premium Wheels 19\"+",
					"IsStandardEquipment": false,
					"IsSelected": false
				}
			]
		},
		{
			"Key": "EquipmentRelationshipList",
			"Value": [
				{
					"EquipmentCode": "4372853",
					"ReliesOnCode": null,
					"ConflictsWithCode": "4309655"
				},
				{
					"EquipmentCode": "4309655",
					"ReliesOnCode": null,
					"ConflictsWithCode": "4372854"
				},
				{
					"EquipmentCode": "4372854",
					"ReliesOnCode": null,
					"ConflictsWithCode": "4309655"
				},
				{
					"EquipmentCode": "4372854",
					"ReliesOnCode": null,
					"ConflictsWithCode": "4372853"
				},
				{
					"EquipmentCode": "4309655",
					"ReliesOnCode": null,
					"ConflictsWithCode": "4372853"
				},
				{
					"EquipmentCode": "4372853",
					"ReliesOnCode": null,
					"ConflictsWithCode": "4372854"
				}
			]
		},
		{
			"Key": "EnginesLookup",
			"Value": [
				{
					"Key": "V8, 4.0 Liter",
					"Value": "4309658"
				}
			]
		},
		{
			"Key": "TransmissionsLookup",
			"Value": [
				{
					"Key": "Manual, 6-Spd w/Overdrive",
					"Value": "4309659"
				},
				{
					"Key": "Automatic, 7-Spd Double Clutch w/DriveLogic",
					"Value": "4309660"
				}
			]
		},
		{
			"Key": "DrivesLookup",
			"Value": [
				{
					"Key": "RWD",
					"Value": "4309661"
				}
			]
		}
	];

/***/ },

/***/ 810:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var customerCampaignsJson = __webpack_require__(811);
	var customerCampaignPermissionsJson = __webpack_require__(812);
	var customerCampaignRefDefsJson = __webpack_require__(813);
	var dataUtils = __webpack_require__(814);
	var customerCampaigns = (function () {
	    function customerCampaigns() {
	        this.campaignList = __webpack_require__(811);
	    }
	    customerCampaigns.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        var customerCampaignsEndpoint = /\/shim\/CustomerCampaigns\((\d+)\)$/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerCampaignsEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerCampaignsEndpoint, url);
	            return [200, customerCampaignsJson];
	        });
	        var customerCampaignPermissionsEndpoint = /\/shim\/CustomerCampaignPermissions\((\d+)\)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerCampaignPermissionsEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerCampaignPermissionsEndpoint, url);
	            return [200, customerCampaignPermissionsJson];
	        });
	        var customerCampaignOrderByNewestEndpoint = /\/shim\/CustomerCampaigns\((\d+)\)\?\$orderby=Id(\s|%20)desc/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerCampaignOrderByNewestEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerCampaignOrderByNewestEndpoint, url);
	            return [200, _this.getCustomerCampaignsSortedNewestFirst()];
	        });
	        var customerCampaignOrderByOldestEndpoint = /\/shim\/CustomerCampaigns\((\d+)\)\?\$orderby=Id(\s|%20)asc/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerCampaignOrderByOldestEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerCampaignOrderByOldestEndpoint, url);
	            return [200, _this.getCustomerCampaignsSortedOldestFirst()];
	        });
	        var customerCampaignSortedLastUpdatedOrSoldNewestFirst = /\/shim\/CustomerCampaigns\((\d+)\)\?\$orderby=LastUpdatedOrSoldDate(\s|%20)desc/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerCampaignSortedLastUpdatedOrSoldNewestFirst.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerCampaignSortedLastUpdatedOrSoldNewestFirst, url);
	            return [200, _this.getCustomerCampaignsSortedLastUpdatedOrSoldNewestFirst()];
	        });
	        var customerCampaignSortedLastUpdatedOrSoldOldestFirst = /\/shim\/CustomerCampaigns\((\d+)\)\?\$orderby=LastUpdatedOrSoldDate(\s|%20)asc/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerCampaignSortedLastUpdatedOrSoldOldestFirst.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerCampaignSortedLastUpdatedOrSoldOldestFirst, url);
	            return [200, _this.getCustomerCampaignsSortedLastUpdatedOrSoldOldestFirst()];
	        });
	        var customerCampaignRefDefsEndpoint = /\/shim\/RefDefs\/CustomerCampaigns/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerCampaignRefDefsEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerCampaignRefDefsEndpoint, url);
	            return [200, customerCampaignRefDefsJson];
	        });
	    };
	    customerCampaigns.prototype.getCustomerCampaignsSortedOldestFirst = function () {
	        var campaigns = angular.copy(this.campaignList);
	        campaigns.data[0].CampName = 'Sorted By Age - Oldest Added First';
	        return campaigns;
	    };
	    customerCampaigns.prototype.getCustomerCampaignsSortedNewestFirst = function () {
	        var campaigns = angular.copy(this.campaignList);
	        campaigns.data[0].CampName = "Sorted By Age - Newest Added First";
	        return campaigns;
	    };
	    customerCampaigns.prototype.getCustomerCampaignsSortedLastUpdatedOrSoldNewestFirst = function () {
	        var campaigns = angular.copy(this.campaignList);
	        campaigns.data[0].CampName = "Sorted Last Updated or Sold - Newest First";
	        return campaigns;
	    };
	    customerCampaigns.prototype.getCustomerCampaignsSortedLastUpdatedOrSoldOldestFirst = function () {
	        var campaigns = angular.copy(this.campaignList);
	        campaigns.data[0].CampName = "Sorted Last Updated or Sold - Oldest First";
	        return campaigns;
	    };
	    return customerCampaigns;
	}());
	module.exports = customerCampaigns;


/***/ },

/***/ 811:
/***/ function(module, exports) {

	module.exports = {
		"aggregations": {},
		"data": [
			{
				"$type": "CustomerCampaign",
				"Id": "8452584",
				"Status": "Complete",
				"CampType": "Customer Satisfaction",
				"CampName": "Prospect Experience Survey",
				"CatId": "Sales",
				"Tracking": "Prospecting Survey",
				"StartDt": "10/07/2015",
				"StopStatus": "Sold",
				"CampObj": "Get feedback",
				"ValidFrom": "10/07/2015 2:43:06 PM",
				"LastCompletedMilestone": "10/15/2015",
				"Milestones": [
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Literature",
						"MileDesc": "Day 30 Prospect Experience Survey",
						"MileDoc": "4217",
						"MileDocEmail": "0",
						"DocRunType": "Email Only",
						"MileDays": "0",
						"MileRunDate": "",
						"MileSeq": "1",
						"MileStatus": "Completed",
						"CompleteDt": "10/15/2015"
					}
				]
			},
			{
				"$type": "CustomerCampaign",
				"Id": "8452587",
				"Status": "Active",
				"CampType": "RevenueRadar",
				"CampName": "Cash Money Magnet",
				"CatId": "Sales",
				"Tracking": "RR-Cash",
				"StartDt": "10/01/2015",
				"StopStatus": "None",
				"CampObj": "Make monay",
				"ValidFrom": "10/01/2015 5:12:56 PM",
				"LastCompletedMilestone": "10/03/2015",
				"Milestones": [
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Event",
						"MileDesc": "New Sales Event",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "None",
						"MileDays": "0",
						"MileRunDate": "",
						"MileSeq": "1",
						"MileStatus": "Completed",
						"CompleteDt": "10/02/2015"
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Activity",
						"MileDesc": "First Phone Call",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "None",
						"MileDays": "0",
						"MileRunDate": "",
						"MileSeq": "2",
						"MileStatus": "Completed",
						"CompleteDt": "10/03/15"
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Literature",
						"MileDesc": "RR-Cash Email",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "Email Only",
						"MileDays": "0",
						"MileRunDate": "",
						"MileSeq": "3",
						"MileStatus": "Pending",
						"CompleteDt": ""
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Activity",
						"MileDesc": "RR-Cash- Phone Call Day 3",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "None",
						"MileDays": "3",
						"MileRunDate": "",
						"MileSeq": "4",
						"MileStatus": "Pending",
						"CompleteDt": ""
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Activity",
						"MileDesc": "RR-Cash - Phone call day 10",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "None",
						"MileDays": "7",
						"MileRunDate": "",
						"MileSeq": "5",
						"MileStatus": "Pending",
						"CompleteDt": ""
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Literature",
						"MileDesc": "RR-Cash Email",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "Email Only",
						"MileDays": "0",
						"MileRunDate": "",
						"MileSeq": "6",
						"MileStatus": "Pending",
						"CompleteDt": ""
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Activity",
						"MileDesc": "RR-Cash Phone Call day 15",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "None",
						"MileDays": "5",
						"MileRunDate": "",
						"MileSeq": "7",
						"MileStatus": "Pending",
						"CompleteDt": ""
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Activity",
						"MileDesc": "RR-Cash - Phone call day 25",
						"MileDoc": "0",
						"MileDocEmail": "0",
						"DocRunType": "None",
						"MileDays": "10",
						"MileRunDate": "",
						"MileSeq": "8",
						"MileStatus": "Pending",
						"CompleteDt": ""
					}
				]
			},
			{
				"$type": "CustomerCampaign",
				"Id": "8452588",
				"Status": "On Hold",
				"CampType": "Special Offers and Dealership Events",
				"CampName": "High Mileage Leases Available",
				"CatId": "Sales",
				"Tracking": "$ Test",
				"StartDt": "10/27/2015",
				"StopStatus": "None",
				"CampObj": "Lease Increase",
				"ValidFrom": "10/27/2015 04:15:02 AM",
				"LastCompletedMilestone": null,
				"Milestones": [
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Literature",
						"MileDesc": "Test comma friendly",
						"MileDoc": "5484",
						"MileDocEmail": "5484",
						"DocRunType": "Email Only",
						"MileDays": "0",
						"MileRunDate": "3/10/2016",
						"MileSeq": "1",
						"MileStatus": "Pending",
						"CompleteDt": ""
					},
					{
						"$type": "CustomerCampaignMilestone",
						"EntMileId": "0",
						"MileType": "Literature",
						"MileDesc": "MS",
						"MileDoc": "5484",
						"MileDocEmail": "5484",
						"DocRunType": "Email Only",
						"MileDays": "0",
						"MileRunDate": "3/11/2016",
						"MileSeq": "2",
						"MileStatus": "Pending",
						"CompleteDt": ""
					}
				]
			},
			{
				"$type": "CustomerCampaign",
				"Id": "8452585",
				"Status": "Inactive",
				"CampType": "Parts & Accessories Orders and Specials",
				"CampName": "Snow Tires This Year",
				"CatId": "Sales",
				"Tracking": "$$Campaign",
				"StartDt": "10/27/2015",
				"StopStatus": "Lost",
				"CampObj": "Sell tires!",
				"ValidFrom": "10/27/2015 8:53:32 AM",
				"LastCompletedMilestone": null,
				"Milestones": []
			}
		]
	};

/***/ },

/***/ 812:
/***/ function(module, exports) {

	module.exports = {
		"$type": "CustomerCampaignPermissions",
		"addCampaign": true,
		"removeCampaign": true
	};

/***/ },

/***/ 813:
/***/ function(module, exports) {

	module.exports = {
		"Customer Satisfaction": [
			{
				"value": "2548",
				"text": "$CustomerCamp"
			},
			{
				"value": "2560",
				"text": "$TESTsurveyCampaign"
			},
			{
				"value": "2388",
				"text": "12318 1"
			},
			{
				"value": "2267",
				"text": "Addendum Update"
			},
			{
				"value": "1725",
				"text": "AE CM Follow Up"
			},
			{
				"value": "1719",
				"text": "AE Every 30 Days"
			},
			{
				"value": "1718",
				"text": "AE Follow Up"
			}
		],
		"MoneyMaker": [],
		"News Letters": [
			{
				"value": "2549",
				"text": "@TestEmailQCampaign"
			},
			{
				"value": "2552",
				"text": "@TestNewsDocuCampaign"
			},
			{
				"value": "2374",
				"text": "Test for D-08967 Sprint"
			}
		],
		"Parts & Accessories Orders and Specials": [
			{
				"value": "2120",
				"text": "Performance Follow Up - Bump"
			}
		],
		"Purchase Inquiry Follow up": [
			{
				"value": "2551",
				"text": "#TempCampaign1"
			},
			{
				"value": "2450",
				"text": "$ 30th may"
			},
			{
				"value": "2396",
				"text": "1Micro"
			},
			{
				"value": "1722",
				"text": "Acct Exec Call Center Add On"
			},
			{
				"value": "1723",
				"text": "Acct Exec Call Management Add On"
			},
			{
				"value": "653",
				"text": "Sold Customer Follow Up"
			},
			{
				"value": "641",
				"text": "Test"
			},
			{
				"value": "2423",
				"text": "Test campaign"
			},
			{
				"value": "2059",
				"text": "TO Process"
			},
			{
				"value": "36",
				"text": "VW Direct Mail OCT 2002"
			}
		],
		"Referral": [
			{
				"value": "1524",
				"text": "Raise Lower Cust Pay"
			}
		],
		"RevenueRadar": [
			{
				"value": "2379",
				"text": "Cash"
			},
			{
				"value": "2382",
				"text": "Declined Service"
			},
			{
				"value": "2375",
				"text": "Equity"
			},
			{
				"value": "2377",
				"text": "Lease Over-Miles"
			},
			{
				"value": "2376",
				"text": "Serviced Not Sold"
			},
			{
				"value": "2381",
				"text": "Sold Not Serviced"
			}
		],
		"Service Maintenance Notices": [
			{
				"value": "2266",
				"text": "Adrian Monthly Tasks"
			},
			{
				"value": "721",
				"text": "Appt Completed"
			},
			{
				"value": "2029",
				"text": "Brandon Monthly Tasks"
			}
		],
		"Special Offers and Dealership Events": [
			{
				"value": "2452",
				"text": "$ 1 June"
			},
			{
				"value": "2455",
				"text": "$ 29 June 2014"
			},
			{
				"value": "2444",
				"text": "$ 29 May"
			},
			{
				"value": "2451",
				"text": "$ 30th-may"
			}
		],
		"Tracking Codes": [
			{
				"value": "2093",
				"text": "NADA 2011"
			},
			{
				"value": "2183",
				"text": "*Cadillac 150 Days Since Purchse"
			},
			{
				"value": "2348",
				"text": "*Service Prospect"
			},
			{
				"value": "2347",
				"text": "*Upgrade Initiative"
			}
		],
		"Vehicle Ownership": [
			{
				"value": "2557",
				"text": "$TestCampaign1"
			},
			{
				"value": "690",
				"text": "Buntin Test Campaign Name"
			},
			{
				"value": "1997",
				"text": "Carmind - Sales Welcome Campaign"
			},
			{
				"value": "2246",
				"text": "Carmind - Service Welcome Campaign"
			},
			{
				"value": "2023",
				"text": "Carmind Monthly Campaign"
			},
			{
				"value": "1384",
				"text": "Dev Critical Bug Reminder"
			},
			{
				"value": "1282",
				"text": "New Client"
			},
			{
				"value": "1791",
				"text": "new server"
			},
			{
				"value": "723",
				"text": "New Sold Dealership"
			},
			{
				"value": "669",
				"text": "Out of State"
			},
			{
				"value": "1062",
				"text": "Service Customer Alert"
			},
			{
				"value": "1862",
				"text": "Sold Car Follow Up"
			},
			{
				"value": "1593",
				"text": "Sold Customer Follow Up"
			},
			{
				"value": "1760",
				"text": "testing friendly name"
			}
		]
	};

/***/ },

/***/ 814:
/***/ function(module, exports) {

	///<reference path="../../typings/index.d.ts"/>
	"use strict";
	var dataUtils = (function () {
	    function dataUtils() {
	    }
	    dataUtils.checkIdIsPassed = function (endpoint, url) {
	        var entityId = null;
	        var matches = endpoint.exec(url);
	        if (matches && matches.length > 1 && matches[1]) {
	            try {
	                entityId = parseInt(matches[1]);
	            }
	            catch (e) {
	            }
	        }
	        if (!entityId)
	            return [400];
	    };
	    return dataUtils;
	}());
	module.exports = dataUtils;


/***/ },

/***/ 815:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var individualRefDefsJson = __webpack_require__(816);
	var individualRefDefs = (function () {
	    function individualRefDefs() {
	    }
	    individualRefDefs.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var individualRefDefsEndpoint = /\/shim\/RefDefs\/Individual/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + individualRefDefsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, individualRefDefsJson];
	        });
	    };
	    return individualRefDefs;
	}());
	module.exports = individualRefDefs;


/***/ },

/***/ 816:
/***/ function(module, exports) {

	module.exports = {
		"Prefix": [
			{
				"value": "101",
				"text": "Mr."
			},
			{
				"value": "102",
				"text": "Ms."
			},
			{
				"value": "103",
				"text": "Mrs."
			},
			{
				"value": "104",
				"text": "Dr."
			},
			{
				"value": "1004063",
				"text": "Dude"
			}
		],
		"PreferredLanguage": [
			{
				"value": "140",
				"text": "English"
			},
			{
				"value": "141",
				"text": "Spanish"
			},
			{
				"value": "142",
				"text": "French"
			},
			{
				"value": "143",
				"text": "German"
			},
			{
				"value": "144",
				"text": "Russian"
			},
			{
				"value": "145",
				"text": "Japanese"
			},
			{
				"value": "146",
				"text": "Mandarin"
			},
			{
				"value": "147",
				"text": "Korean"
			},
			{
				"value": "148",
				"text": "Portuguese"
			}
		],
		"ContactType": [
			{
				"value": "305",
				"text": "Prospect"
			},
			{
				"value": "306",
				"text": "Customer"
			},
			{
				"value": "307",
				"text": "Employee"
			},
			{
				"value": "308",
				"text": "Vendor"
			},
			{
				"value": "309",
				"text": "Partner"
			},
			{
				"value": "250771",
				"text": "Fleet / Commercial"
			},
			{
				"value": "250014",
				"text": "Good Egg"
			},
			{
				"value": "1003015",
				"text": "ISP"
			}
		],
		"Source": [
			{
				"value": "1001",
				"text": "Walk In"
			},
			{
				"value": "1002",
				"text": "Web"
			},
			{
				"value": "1003",
				"text": "General Referral"
			},
			{
				"value": "1004",
				"text": "Sales Floor Referral"
			},
			{
				"value": "1005",
				"text": "Service Referral"
			},
			{
				"value": "1011",
				"text": "Contact Referral"
			},
			{
				"value": "1007",
				"text": "Dealer Mgmt Sys"
			},
			{
				"value": "1008",
				"text": "List Import"
			},
			{
				"value": "1009",
				"text": "Manufacturer"
			},
			{
				"value": "1010",
				"text": "Phone"
			},
			{
				"value": "250202",
				"text": "Radio"
			},
			{
				"value": "250203",
				"text": "TV"
			},
			{
				"value": "250204",
				"text": "Print"
			},
			{
				"value": "1002923",
				"text": "CoBuyer"
			},
			{
				"value": "1004612",
				"text": "Massey Buying Vehicle"
			},
			{
				"value": "1004637",
				"text": "Spellens Refferal"
			}
		],
		"Status": [
			{
				"value": "328",
				"text": "Active"
			},
			{
				"value": "330",
				"text": "Cancelled"
			}
		],
		"NeverContactVia": [
			{
				"value": "314",
				"text": ""
			},
			{
				"value": "315",
				"text": "Email"
			},
			{
				"value": "316",
				"text": "Home Phone"
			},
			{
				"value": "317",
				"text": "Work Phone"
			},
			{
				"value": "318",
				"text": "Mobile Number"
			},
			{
				"value": "219",
				"text": "Don&apos;t Contact (Internal)"
			},
			{
				"value": "319",
				"text": "Text Message"
			},
			{
				"value": "4004",
				"text": "Written Permission (Internal)"
			},
			{
				"value": "4000",
				"text": "DNC List - Don&apos;t Contact"
			},
			{
				"value": "4001",
				"text": "DNC List - Current Customer"
			},
			{
				"value": "4002",
				"text": "DNC List - Current Prospect"
			},
			{
				"value": "4003",
				"text": "DNC List - Written Permission"
			}
		],
		"Income": [
			{
				"value": "109",
				"text": "Blank"
			},
			{
				"value": "110",
				"text": "10,000-20,000"
			},
			{
				"value": "111",
				"text": "21,000-50,000"
			},
			{
				"value": "112",
				"text": "51,000-100,000"
			},
			{
				"value": "113",
				"text": "101,000-200,000"
			},
			{
				"value": "114",
				"text": "201,000 - over"
			}
		]
	};

/***/ },

/***/ 817:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var loyaltySummaryData = __webpack_require__(818);
	var loyaltySummary = (function () {
	    function loyaltySummary() {
	    }
	    loyaltySummary.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex, $q, apiBaseUrlRegex) {
	        var loyaltyEndpoint = /\/loyalty\/getLoyalty\?(.*)/i;
	        $httpBackend.whenGET(new RegExp(apiBaseUrlRegex.source + loyaltyEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, loyaltySummaryData];
	        });
	    };
	    return loyaltySummary;
	}());
	module.exports = loyaltySummary;


/***/ },

/***/ 818:
/***/ function(module, exports) {

	module.exports = {
		"$type": "LoyaltySummary",
		"CustomerSince": "10/7/2015",
		"CustomerVehiclesOwned": 4,
		"CustomerSpentAtDealership": 0,
		"SalesOppsOpen": 1,
		"SalesOppsSold": 2,
		"SalesVehiclesPurchased": 2,
		"SalesSpentOnVehicles": 0,
		"SalesLastPurchaseDate": "11/3/2013",
		"ServiceOppsOpen": 14,
		"ServiceOppsClosed": 0,
		"ServiceAmountSpent": 0,
		"ServiceSpentThisYear": 0,
		"ServicedLast": "10/15/2015",
		"MarketingCampOpen": 13,
		"MarketingCampCompleted": 2,
		"MarketingEmailOpenRate": null,
		"MarketingLastStepDate": null,
		"QaTicketsOpen": 18,
		"QaTicketsClosed": 1,
		"QaResolvedRate": 5.26,
		"QaLastResolvedDate": "11/03/2013",
		"SurveysSent": null,
		"SurveysResponded": 13,
		"SurveysAverageScore": 77.54,
		"SurveyLastSentDate": "10/15/2015"
	};

/***/ },

/***/ 819:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var dataUtils = __webpack_require__(814);
	var chromeJson = __webpack_require__(820);
	var customerServicesPermissionsJson;
	var customerServicesMergeErrorJson;
	var customerServicesMergeSuccessJson;
	var createOppRefDefsJson;
	var Vehicles = (function () {
	    function Vehicles() {
	        this.vehicleList = __webpack_require__(821);
	    }
	    Vehicles.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        // /shim/Contact(12345)
	        var vehicleEndpoint = /\/shim\/CustomerVehicles\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + vehicleEndpoint.source)).respond(function (method, url, data, headers) {
	            var id = null;
	            var matches = vehicleEndpoint.exec(url);
	            if (matches && matches.length > 1) {
	                try {
	                    id = parseInt(matches[1]);
	                }
	                catch (e) {
	                }
	                if (!id)
	                    return [400];
	                return [200, _this.getVehiclesById(id)];
	            }
	        });
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + vehicleEndpoint.source)).respond(function (method, url, data, headers) {
	            var id = null;
	            var matches = vehicleEndpoint.exec(url);
	            if (matches && matches.length > 1) {
	                try {
	                    id = parseInt(matches[1]);
	                }
	                catch (e) {
	                }
	                if (!id)
	                    return [400];
	                return [200, _this.getVehiclesById(id)];
	            }
	        });
	        var customerVehiclesDeleteEndpoint = /\/shim\/CustomerVehicles\/(\d+)\/(\d+)/i;
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + customerVehiclesDeleteEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerVehiclesDeleteEndpoint, url);
	            return [204];
	        });
	        var serviceEventDeleteEndpoint = /\/shim\/CustomerVehicles\/(\d+)\/(\d+)/i;
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + serviceEventDeleteEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(serviceEventDeleteEndpoint, url);
	            return [204, {}];
	        });
	        var serviceEventPermissionEndpoint = /\/shim\/CustomerVehicles\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + serviceEventPermissionEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(serviceEventPermissionEndpoint, url);
	            return [204, customerServicesPermissionsJson];
	        });
	        //Errors merging first vehicle(sold) into others
	        //var mergeErrorEndpointFirstVehicle = /\/shim\/serviceEventMerge\/(\d+)\/2753333\/(2753332|28873|299534)/i;
	        var mergeErrorEndpointFirstEvent = /\/shim\/CustomerServices\/merge\/(\d+)\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + mergeErrorEndpointFirstEvent.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(mergeErrorEndpointFirstEvent, url);
	            return [204, customerServicesMergeErrorJson];
	        });
	        // Errors merging third vehicle(nonsold) into others
	        var mergeErrorEndpointThirdEvent = /\/shim\/CustomerServices\/merge\/(\d+)\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + mergeErrorEndpointThirdEvent.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(mergeErrorEndpointThirdEvent, url);
	            return [204, customerServicesMergeErrorJson];
	        });
	        var serviceEventSuccessEndpoint = /\/shim\/CustomerServices\/merge\/(\d+)\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + serviceEventSuccessEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(serviceEventSuccessEndpoint, url);
	            return [200, customerServicesMergeSuccessJson];
	        });
	        var chromeEndpoint = /\/api\/chrome/i;
	        $httpBackend.whenPOST(chromeEndpoint).respond(function (method, url, data, headers) {
	            return [200, chromeJson];
	        });
	        $httpBackend.whenGET(chromeEndpoint).respond(function (method, url, data, headers) {
	            return [200, chromeJson];
	        });
	    };
	    Vehicles.prototype.getVehiclesById = function (id) {
	        if (!angular.isNumber(id))
	            throw new Error('mock/data/vehicles.getVehicleById was called without a valid id!');
	        var vehicles = angular.copy(this.vehicleList);
	        return vehicles;
	    };
	    return Vehicles;
	}());
	module.exports = Vehicles;


/***/ },

/***/ 820:
/***/ function(module, exports) {

	module.exports = {
		"Makes": [
			"Ford",
			"Aston Martin",
			"Chevy"
		],
		"Models": [
			"Mustang",
			"1 Series 128i Coupe 2D"
		],
		"Trims": [
			"2dr Conv GT",
			"Coupe 2D",
			"2dr Conv GT Premium",
			"2dr Conv Shelby GT500",
			"2dr Conv V6",
			"2dr Conv V6 Premium",
			"2dr Cpe GT",
			"2dr Cpe GT Premium",
			"2dr Cpe Shelby GT500",
			"2dr Cpe V6",
			"2dr Cpe V6 Premium"
		],
		"BeginYear": null,
		"EndYear": null,
		"Years": [
			2017,
			2016,
			2015,
			2014,
			2013,
			2012,
			2011,
			2010,
			2009,
			2008,
			2007,
			2006,
			2005,
			2004,
			2003,
			2002,
			2001
		],
		"Exterior": [
			{
				"Name": "Black",
				"Hex": "404040"
			},
			{
				"Name": "Natural White",
				"Hex": "E4E3E1"
			}
		],
		"Interior": [
			"Black",
			"Grey"
		],
		"EngineSize": [
			"8 Cylinder Engine"
		],
		"DriveTrain": null,
		"MpgCity": [
			"14",
			"15",
			"16"
		],
		"MpgHighway": [
			"15",
			"16",
			"17"
		],
		"FuelType": [
			"Gasoline Fuel",
			"Diesel"
		],
		"BodyStyle": null,
		"Transmission": [
			"4-Speed M/T",
			"6-Speed A/T"
		],
		"MaxStylesToExpand": null
	};

/***/ },

/***/ 821:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "Vehicle",
			"Id": "434904",
			"StockNumber": "",
			"VehicleOwnership": null,
			"Vin": "1GNDS13S352370795",
			"Make": "CHEVROLET TRUCK",
			"Model": "TRAILBLAZER",
			"Trim": "",
			"Year": "2005",
			"PurchasedDate": null,
			"Status": true,
			"Engine": "",
			"Transmission": null,
			"Style": null,
			"FuelEfficiency": null,
			"Odometer": "111007",
			"Cylinders": null,
			"ExteriorColor": "WHITE",
			"InteriorColor": "",
			"LastServiced": "6/1/2012",
			"FactoryWarranty": {
				"Months": "",
				"Miles": ""
			},
			"ExtendedService": {
				"Months": "",
				"Miles": ""
			},
			"ServiceEvents": [
				{
					"$type": "ServiceEvent",
					"Id": "1792202",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "100159",
						"text": "Customer Pay"
					},
					"Source": {
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					"ServiceAdviser": "John Bishop",
					"DueDate": "2012-06-02T13:00:00.000Z",
					"CurrentMiKm": 111007,
					"VehicleId": "434904",
					"TotalCost": 30.46,
					"LastUpdated": "6/1/2012",
					"Dealership": null,
					"Franchise": {
						"value": "20",
						"text": "Texan Buick GMC"
					},
					"OppCodes": [
						{
							"RONumber": "158024",
							"Type": "S",
							"Cat": "C",
							"OppCode": "98GCZ",
							"Description": "FREE MULTIPOINT INSP"
						},
						{
							"RONumber": "158024",
							"Type": "S",
							"Cat": "C",
							"OppCode": "98GCZ0019",
							"Description": "FALL CARE PACKAGE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "06GCZFALIGN",
							"Description": "ALIGN FRONT SUSP."
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "06GCZROT",
							"Description": "ROTATE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "50GCZCOO",
							"Description": "COOLANT FLUSH"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "50GCZFALIGN",
							"Description": "ALIGN FRONT SUSP."
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "50GCZFIL",
							"Description": "FUEL FILTER"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "95GCZBGFBJ",
							"Description": "*BG FRT BRK JOB RES"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0001",
							"Description": "*TIRE ROTATION"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0006",
							"Description": "*LOF DIESEL"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0007",
							"Description": "ENGINE, LOF TRUCK"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ001",
							"Description": "*SYNTH OIL CHANGE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0021",
							"Description": "ENGINE, LOF"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0026",
							"Description": "*ROTATE & BALANCE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "99GCZ",
							"Description": "TEXAN MAINTENANCE"
						}
					],
					"FirstName": null,
					"LastName": null
				}
			],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"ImageUrls": []
		},
		{
			"$type": "Vehicle",
			"Id": null,
			"StockNumber": null,
			"VehicleOwnership": null,
			"Vin": null,
			"Make": "Services without a vehicle",
			"Model": null,
			"Year": null,
			"PurchasedDate": null,
			"Miles": null,
			"Status": false,
			"Engine": null,
			"Transmission": null,
			"Style": null,
			"FuelEfficiency": null,
			"Odometer": null,
			"LastServiced": "2015-11-05T13:57:00.000Z",
			"FactoryWarranty": {
				"Months": "",
				"Miles": ""
			},
			"ExtendedService": {
				"Months": "",
				"Miles": ""
			},
			"ServiceEvents": [
				{
					"$type": "ServiceEvent",
					"Id": "2753395",
					"Status": {
						"value": "100167",
						"text": "12 - Implemented"
					},
					"Type": {
						"value": "100159",
						"text": "Monthly Summary/Raving Fan"
					},
					"Source": {
						"value": "100175",
						"text": "Inbound Call"
					},
					"ServiceAdviser": "Blackbird Endtoend",
					"DueDate": null,
					"CurrentMiKm": null,
					"TotalCost": 500,
					"LastUpdated": "2015-11-05T13:57:00.000Z",
					"Dealership": {
						"value": "3",
						"text": "DealerSocket"
					},
					"Franchise": {
						"value": "1",
						"text": "DealerSocket2"
					},
					"OppCodes": [
						"15",
						"25",
						"8"
					]
				},
				{
					"$type": "ServiceEvent",
					"Id": "2753568",
					"Status": {
						"value": "100167",
						"text": "12 - Implemented"
					},
					"Type": {
						"value": "100159",
						"text": "Monthly Summary/Raving Fan"
					},
					"Source": {
						"value": "100175",
						"text": "Inbound Call"
					},
					"ServiceAdviser": "Blackbird Endtoend",
					"DueDate": null,
					"CurrentMiKm": null,
					"TotalCost": 500,
					"LastUpdated": "2015-11-09T13:57:00.000Z",
					"Dealership": {
						"value": "3",
						"text": "DealerSocket"
					},
					"Franchise": {
						"value": "1",
						"text": "DealerSocket2"
					},
					"OppCodes": [
						"11",
						"5",
						"8"
					]
				}
			],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null
		},
		{
			"$type": "Vehicle",
			"Id": "562248",
			"StockNumber": "",
			"VehicleOwnership": null,
			"Vin": "2C3CDXCT0EH203414",
			"Make": "Big",
			"Model": "Car  ",
			"Year": "2012",
			"PurchasedDate": "11/2/2015 4:41:13 PM",
			"Miles": 0,
			"Status": true,
			"Engine": null,
			"Transmission": null,
			"Style": null,
			"FuelEfficiency": null,
			"Odometer": null,
			"LastServiced": null,
			"ServiceEvents": [],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"FactoryWarranty": {
				"Months": "",
				"Miles": ""
			},
			"ExtendedService": {
				"Months": "",
				"Miles": ""
			}
		},
		{
			"$type": "Vehicle",
			"Id": null,
			"StockNumber": null,
			"VehicleOwnership": null,
			"Vin": null,
			"Make": "Services without a vehicle",
			"Model": null,
			"Year": null,
			"PurchasedDate": null,
			"Miles": null,
			"Status": false,
			"Engine": null,
			"Transmission": null,
			"Style": null,
			"FuelEfficiency": null,
			"Odometer": null,
			"FactoryWarranty": {
				"Months": "",
				"Miles": ""
			},
			"ExtendedService": {
				"Months": "",
				"Miles": ""
			},
			"LastServiced": "2014-04-11T18:18:00.000Z",
			"ServiceEvents": [
				{
					"$type": "ServiceEvent",
					"Id": "3297272",
					"Status": {
						"value": "100166",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "100159",
						"text": "Customer Pay"
					},
					"Source": {
						"value": "100174",
						"text": "Walk-in"
					},
					"ServiceAdviser": "Becky Anderson",
					"DueDate": "2014-04-11T21:50:00.000Z",
					"CurrentMiKm": null,
					"TotalCost": 0,
					"LastUpdated": "2014-04-11T18:18:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": []
				}
			],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null
		},
		{
			"$type": "Vehicle",
			"Id": "668294",
			"StockNumber": "1H2429",
			"VehicleOwnership": null,
			"Vin": "5FNYF4H52CB019468",
			"Make": "HONDA",
			"Model": "PILOT Crossover 4DR 4WD EX-L",
			"Year": "2012",
			"PurchasedDate": "12/15/2011",
			"Miles": 18494,
			"Status": true,
			"Engine": "3.5L",
			"Transmission": "6-speed Automatic",
			"Style": "Sedan",
			"FuelEfficiency": null,
			"Odometer": 2500,
			"BodyStyle": "Sedan",
			"LastServiced": "2/14/2013",
			"InteriorColor": "Blue",
			"ExteriorColor": "Green",
			"Series": "5",
			"UnitNumber": "10",
			"ExtendedService": {
				"Months": "36",
				"Miles": "100000"
			},
			"DrivetrainRefDef": {
				"value": "100148",
				"text": "All Wheel"
			},
			"FactoryWarranty": {
				"Months": "12",
				"Miles": "50000"
			},
			"Plate": "6bfw352",
			"ServiceEvents": [
				{
					"$type": "ServiceEvent",
					"Id": "3297273",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "100159",
						"text": "Customer Pay"
					},
					"Source": {
						"value": "100174",
						"text": "Walk-in"
					},
					"ServiceAdviser": "Al Kramer",
					"DueDate": "2014-04-11T13:00:00.000Z",
					"CurrentMiKm": 18494,
					"TotalCost": 0,
					"LastUpdated": "2014-04-11T19:24:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": []
				},
				{
					"$type": "ServiceEvent",
					"Id": "2757896",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "100160",
						"text": "Internal"
					},
					"Source": {
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					"ServiceAdviser": "Rick Judson",
					"DueDate": null,
					"CurrentMiKm": 18494,
					"TotalCost": 0,
					"LastUpdated": "2012-07-06T14:42:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": [
						{
							"RONumber": "554855",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZD-006",
							"Description": "INTERIOR CONCERN"
						},
						{
							"RONumber": "554855",
							"Type": "D",
							"Cat": "C",
							"OppCode": "01HOZD-005",
							"Description": "VEHICLE CONDITION"
						}
					]
				},
				{
					"$type": "ServiceEvent",
					"Id": "2755114",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "112166",
						"text": "CP/Warranty"
					},
					"Source": {
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					"ServiceAdviser": "Rick Judson",
					"DueDate": "2012-07-04T11:30:00.000Z",
					"CurrentMiKm": 18494,
					"TotalCost": 275.67,
					"LastUpdated": "2012-07-03T18:22:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": [
						{
							"RONumber": "550907",
							"Type": "S",
							"Cat": "C",
							"OppCode": "01HOZD-007",
							"Description": "HOW FREE LOF"
						},
						{
							"RONumber": "550907",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZD-005",
							"Description": "INTERIOR CONCERN"
						},
						{
							"RONumber": "550907",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZD-007",
							"Description": "EXTERIOR CONCERN"
						},
						{
							"RONumber": "550907",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZD-008",
							"Description": "EXTERIOR CONCERN"
						}
					]
				},
				{
					"$type": "ServiceEvent",
					"Id": "2760926",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "100158",
						"text": "Warranty"
					},
					"Source": {
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					"ServiceAdviser": "Becky Anderson",
					"DueDate": "2012-07-10T11:30:00.000Z",
					"CurrentMiKm": 18494,
					"TotalCost": 74.48,
					"LastUpdated": "2012-07-09T18:59:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": [
						{
							"RONumber": "555705",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZD-005",
							"Description": "INTERIOR CONCERN"
						},
						{
							"RONumber": "555705",
							"Type": "D",
							"Cat": "C",
							"OppCode": "01HOZD-005",
							"Description": "VEHICLE CONDITION"
						}
					]
				},
				{
					"$type": "ServiceEvent",
					"Id": "3196085",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "112166",
						"text": "CP/Warranty"
					},
					"Source": {
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					"ServiceAdviser": "Joe Baker",
					"DueDate": "2013-01-03T16:30:00.000Z",
					"CurrentMiKm": 18494,
					"TotalCost": 252.02,
					"LastUpdated": "2013-01-04T19:34:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": [
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "C",
							"OppCode": "01HOZD-TCA283",
							"Description": "ADVANTAGE CONTRACT"
						},
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "C",
							"OppCode": "01HOZD-TCA284B",
							"Description": "ADVANTAGE ROTATE"
						},
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "C",
							"OppCode": "01HOZD-TCA284C",
							"Description": "ADVANTAGE MPI"
						},
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "C",
							"OppCode": "01HOZD-TCA284D",
							"Description": "ADVANTAGE EXEC WASH"
						},
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "C",
							"OppCode": "01HOZD-TCA304D",
							"Description": "ADVANTAGE SEMI SYN"
						},
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "C",
							"OppCode": "20HOZD-002",
							"Description": "LIGHT DUTY CONCERN"
						},
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZ",
							"Description": "LIGHT DUTY"
						},
						{
							"RONumber": "769922",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZD-008",
							"Description": "EXTERIOR CONCERN"
						},
						{
							"RONumber": "769922",
							"Type": "D",
							"Cat": "C",
							"OppCode": "01HOZD-005",
							"Description": "VEHICLE CONDITION"
						}
					]
				},
				{
					"$type": "ServiceEvent",
					"Id": "3307084",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "112166",
						"text": "CP/Warranty"
					},
					"Source": {
						"value": "100174",
						"text": "Walk-in"
					},
					"ServiceAdviser": "Joe Baker",
					"DueDate": "2015-11-06T14:00:00.000Z",
					"CurrentMiKm": 18494,
					"TotalCost": 0,
					"LastUpdated": "2015-11-07T07:34:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": []
				},
				{
					"$type": "ServiceEvent",
					"Id": "3197098",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "100158",
						"text": "Warranty"
					},
					"Source": {
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					"ServiceAdviser": "Joe Baker",
					"DueDate": "2013-01-10T17:00:00.000Z",
					"CurrentMiKm": 18494,
					"TotalCost": 286.6,
					"LastUpdated": "2013-02-15T18:18:00.000Z",
					"Dealership": {
						"value": "154",
						"text": "Ken Garff Honda"
					},
					"Franchise": {
						"value": "8",
						"text": "Ken Garff Honda"
					},
					"OppCodes": [
						{
							"RONumber": "821328",
							"Type": "S",
							"Cat": "C",
							"OppCode": "01HOZD-005",
							"Description": "MULTI POINT INSP"
						},
						{
							"RONumber": "821328",
							"Type": "S",
							"Cat": "W",
							"OppCode": "20HOZD-005",
							"Description": "INTERIOR CONCERN"
						},
						{
							"RONumber": "821328",
							"Type": "S",
							"Cat": "W",
							"OppCode": "90HOZD-001",
							"Description": "HONDA RECALL"
						}
					]
				}
			],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null
		},
		{
			"$type": "Vehicle",
			"Id": "562248",
			"StockNumber": "",
			"VehicleOwnership": "true",
			"Vin": "123456789",
			"Make": "Lexus",
			"Model": "GS300",
			"Year": "2000",
			"PurchasedDate": "1195-12-05",
			"Miles": 120000,
			"Status": true,
			"Engine": "V6",
			"Style": "Cool",
			"FuelEfficiency": 30,
			"Odometer": "12345",
			"LastServiced": "2015-11-05T13:57:00.000Z",
			"FactoryWarranty": {
				"Months": "36",
				"Miles": "100000"
			},
			"ExtendedService": {
				"Months": "",
				"Miles": ""
			},
			"ServiceEvents": [
				{
					"$type": "ServiceEvent",
					"Id": "2753395",
					"Status": {
						"value": "100167",
						"text": "5 - Lost"
					},
					"Type": {
						"value": "100159",
						"text": "Monthly Summary/Raving Fan"
					},
					"Source": {
						"value": "100175",
						"text": "Inbound Call"
					},
					"ServiceAdviser": "Blackbird Endtoend",
					"DueDate": null,
					"CurrentMiKm": null,
					"TotalCost": 0,
					"LastUpdated": "2015-11-05T13:57:00.000Z",
					"Dealership": {
						"value": "3",
						"text": "DealerSocket"
					},
					"Franchise": {
						"value": "1",
						"text": "DealerSocket2"
					},
					"OppCodes": []
				}
			],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null
		},
		{
			"$type": "Vehicle",
			"Id": "562260",
			"StockNumber": "654165",
			"VehicleOwnership": null,
			"Vin": "456515",
			"Make": "BMW",
			"Model": "M6 Sick 652",
			"Year": "2009",
			"PurchasedDate": "",
			"Miles": 585265,
			"Status": true,
			"Engine": null,
			"Transmission": null,
			"Style": null,
			"FuelEfficiency": null,
			"Odometer": null,
			"FactoryWarranty": {
				"Months": "",
				"Miles": ""
			},
			"ExtendedService": {
				"Months": "",
				"Miles": ""
			},
			"LastServiced": null,
			"ServiceEvents": [
				{
					"$type": "ServiceEvent",
					"Id": "2753441",
					"Status": {
						"value": "100165",
						"text": "10 - Transition"
					},
					"Type": {
						"value": "100159",
						"text": "Monthly Summary/Raving Fan"
					},
					"Source": {
						"value": "100175",
						"text": "Inbound Call"
					},
					"ServiceAdviser": "Blackbird Endtoend",
					"DueDate": null,
					"CurrentMiKm": 585265,
					"TotalCost": 0,
					"LastUpdated": "2015-11-20T00:59:00.000Z",
					"Dealership": {
						"value": "3",
						"text": "DealerSocket"
					},
					"Franchise": {
						"value": "1",
						"text": "DealerSocket2"
					},
					"OppCodes": []
				}
			],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null
		}
	];

/***/ },

/***/ 822:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var surveysJson = __webpack_require__(823);
	var qaMergeSuccessJson = __webpack_require__(824);
	var qaEventPermissionsJson = __webpack_require__(825);
	var qaDeletedEventJson = __webpack_require__(826);
	var qaEventsSingleJson = __webpack_require__(827);
	var qaEventsSingleAllNullJson = __webpack_require__(828);
	var csiDropDownsJson = __webpack_require__(829);
	var dataUtils = __webpack_require__(814);
	var csiEvents = (function () {
	    function csiEvents() {
	        this.qaEventsList = __webpack_require__(830);
	    }
	    csiEvents.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        // If we just hit a delete qa action, we want to make sure we are using the deleted qa version. But the next time through, use a normal one.
	        var temporaryQa = __webpack_require__(830);
	        var qaEndpoint = /\/shim\/QAEvents\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + qaEndpoint.source)).respond(function (method, url, data, headers) {
	            // In the case of a Delete being passed in, we will use the updated delete json, but then for the next call use the normal stuff.
	            var responseData = temporaryQa;
	            temporaryQa = __webpack_require__(830);
	            return [200, responseData];
	        });
	        var qaCsiEndpoint = /\/shim\/csi\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + qaCsiEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(qaEndpoint, url);
	            var tokens = url.split("/");
	            var id = tokens[tokens.length - 1];
	            if (parseInt(id)) {
	                if (id == '2') {
	                    return [200, qaEventsSingleAllNullJson];
	                }
	                var retVal = qaEventsSingleJson; //qaEventsJson.find(myObj => myObj.Id == id);
	                return [200, retVal];
	            }
	            return [200, qaEventsSingleJson];
	        });
	        var qaDeleteEndpoint = /\/shim\/QAEvents\/(\d+)\/(\d+)/i;
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + qaDeleteEndpoint.source)).respond(function (method, url, data, headers) {
	            // When we delete, we are returning just a single qa event with the title saying the qa event was deleted, just for validation that our delete endpoint worked
	            temporaryQa = qaDeletedEventJson;
	            return [204];
	        });
	        var surveyEndpoint = /\/shim\/CustomerSurveys\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + surveyEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, surveysJson];
	        });
	        var qaMergeSuccess = /\/shim\/QAEventMerge\/(\d+)\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + qaMergeSuccess.source)).respond(function (method, url, data, headers) {
	            return [200, qaMergeSuccessJson];
	        });
	        var qaEventPermissions = /\/shim\/QAEventPermissions\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + qaEventPermissions.source)).respond(function (method, url, data, headers) {
	            return [200, qaEventPermissionsJson];
	        });
	        var qaEventOrderByNewestEndpoint = /\/shim\/QAEvent\((\d+)\)\?\$orderby=Id(\s|%20)desc/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + qaEventOrderByNewestEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, _this.getQaEventSortedNewestFirst()];
	        });
	        var qaEventOrderByOldestEndpoint = /\/shim\/QAEvent\((\d+)\)\?\$orderby=Id(\s|%20)asc/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + qaEventOrderByOldestEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, _this.getQaEventSortedOldestFirst()];
	        });
	        var csiDropDown = /\/shim\/RefDefs\/CsiEventAdd\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + csiDropDown.source)).respond(function (method, url, data, headers) {
	            return [200, csiDropDownsJson];
	        });
	    };
	    csiEvents.prototype.getQaEventSortedOldestFirst = function () {
	        var qaEvents = angular.copy(this.qaEventsList);
	        qaEvents.data[0].CampName = 'Sorted By Age - Oldest Added First';
	        return qaEvents;
	    };
	    csiEvents.prototype.getQaEventSortedNewestFirst = function () {
	        var qaEvents = angular.copy(this.qaEventsList);
	        qaEvents.data[0].CampName = "Sorted By Age - Newest Added First";
	        return qaEvents;
	    };
	    return csiEvents;
	}());
	module.exports = csiEvents;


/***/ },

/***/ 823:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "CustomerSalesSurvey",
			"Id": "11",
			"SalesEventId": "1008",
			"Name": "Sales Survey",
			"Score": 67,
			"PurchaseDate": "",
			"Vehicle": "Ford Cool Car",
			"SurveyDate": "12/30/2016",
			"Price": 0,
			"Vin": "1215332",
			"VehicleOdometer": 0,
			"Type": "Used Vehicle",
			"DmsNumber": "1008",
			"Salesperson": "A kalam",
			"QuestionsAndResponses": [
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we courteous and respectful?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Did we listen to you and understood your needs?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we sensitive to your time?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we knowledgeable about our vehicles?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we truthful and honest?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Did we use gimmicks or high pressure sales tactics?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "How likely are you to recommend Ken Garff to friends or family members?",
					"Response": "7"
				}
			]
		},
		{
			"$type": "CustomerServiceSurvey",
			"Id": "12",
			"Name": "Service Survey",
			"Score": 93,
			"PurchaseDate": "09/13/2010",
			"Vehicle": "Fast Red Car",
			"SurveyDate": "12/16/2015",
			"Price": 41.28,
			"Vin": "933532",
			"VehicleOdometer": 35265,
			"Type": "Customer Pay",
			"DmsNumber": "495033",
			"Salesperson": "Rick Judson",
			"QuestionsAndResponses": [
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we courteous and respectful?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Did we listen to you and understand your needs?",
					"Response": "Listened and understood very well 10"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we sensitive to your time?",
					"Response": "Very sensitive 10"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Did we communicate clearly and completely?",
					"Response": "Very clearly and completely 10"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we knowledgeable and answered your questions?",
					"Response": "Very knowledgeable 10"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we truthful and honest?",
					"Response": "9"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Did we live up to our promises?",
					"Response": "Definitely lived up to promises 10"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "How likely are you to recommend Ken Garff to friends or family members?",
					"Response": "9"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Additional Comments",
					"Response": "my car smelled good after"
				}
			]
		}
	];

/***/ },

/***/ 824:
/***/ function(module, exports) {

	module.exports = {
		"response": {
			"statusCode": 302,
			"body": "<html><head><title>Object moved</title></head><body>\r\n<h2>Object moved to <a href=\"/CRM/qa/cd_bottom_qa.aspx?SiteId=154&amp;EntityId=165461&amp;errMsg=\">here</a>.</h2>\r\n</body></html>\r\n",
			"headers": {
				"cache-control": "private",
				"content-type": "text/html; charset=utf-8",
				"location": "/CRM/qa/cd_bottom_qa.aspx?SiteId=154&EntityId=165461&errMsg=",
				"set-cookie": [
					"EX_SITE=154; domain=.local.dealersocket.com; path=/; secure; HttpOnly"
				],
				"date": "Fri, 11 Dec 2015 22:03:43 GMT",
				"content-length": "185"
			},
			"request": {
				"uri": {
					"protocol": "https:",
					"slashes": true,
					"auth": null,
					"host": "local.dealersocket.com",
					"port": 443,
					"hostname": "local.dealersocket.com",
					"hash": null,
					"search": "?&SiteId=154&EntityId=165461&MrgTyp=3&MrgId=8676334&MstId=8676336",
					"query": "&SiteId=154&EntityId=165461&MrgTyp=3&MrgId=8676334&MstId=8676336",
					"pathname": "/CRM/search/xt_search_Event_merge.aspx",
					"path": "/CRM/search/xt_search_Event_merge.aspx?&SiteId=154&EntityId=165461&MrgTyp=3&MrgId=8676334&MstId=8676336",
					"href": "https://local.dealersocket.com/CRM/search/xt_search_Event_merge.aspx?&SiteId=154&EntityId=165461&MrgTyp=3&MrgId=8676334&MstId=8676336"
				},
				"method": "GET",
				"headers": {
					"host": "local.dealersocket.com:443",
					"connection": "keep-alive",
					"cache-control": "max-age=0",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36",
					"accept-language": "en-US,en;q=0.8,es-419;q=0.6,es;q=0.4",
					"cookie": "AuthTokens=%7B%22type%22%3A%22Bearer%22%2C%22expiresIn%22%3A%2236000%22%2C%22idToken%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJub25jZSI6Inh5eiIsImlhdCI6MTQ0OTg1NDUzNywiYXRfaGFzaCI6ImdlMEZkMnBCaGh4dWQ3M3JLTnV2Z3ciLCJzdWIiOiIyMTEzNjEiLCJhbXIiOlsicGFzc3dvcmQiXSwiYXV0aF90aW1lIjoxNDQ5ODU0NTI2LCJpZHAiOiJpZHNydiIsImlzcyI6Imh0dHBzOi8vZGVhbGVyc29ja2V0LmVuZ2luZWVyaW5nIiwiYXVkIjoiaW1wbGljaXRjbGllbnQiLCJleHAiOjE0NDk4NTgxMzcsIm5iZiI6MTQ0OTg1NDUzN30.hc_KvL4jiI60esdyh_pOzkCBPkXljghUWOkp2Up8TJYYfyXtscvoCtaY_R395Bi9f4Y7_vmFRS8741yv0aoRb0TqFY7mshfXAUGFKaG-otf9eUgAIU_JAxwPp-5RzEJMft6HJ7kTUkwaHWZ8nWd8WAfQ2GpabAOY6p259V0LtaumnV-nBJYr3U5FlFkH4j9E6QBXgxovDLQUiT63RGWYIBUDbu04n0SuSipuGG_0Jfd0oSmd-tBKvHFkYnZ_pNhadzcPqwe7BrxhW_MUkvMAJfS2cwhY9gymxkpA-ZtUGaSxOPCc5XIMll5kjYlemS3308QzHfdi5p3UlAm6pCoNNA%22%2C%22accessToken%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSIsImtpZCI6ImEzck1VZ01Gdjl0UGNsTGE2eUYzekFrZnF1RSJ9.eyJjbGllbnRfaWQiOiJpbXBsaWNpdGNsaWVudCIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSIsIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCJdLCJzdWIiOiIyMTEzNjEiLCJhbXIiOlsicGFzc3dvcmQiXSwiYXV0aF90aW1lIjoxNDQ5ODU0NTI2LCJpZHAiOiJpZHNydiIsImlzcyI6Imh0dHBzOi8vZGVhbGVyc29ja2V0LmVuZ2luZWVyaW5nIiwiYXVkIjoiaHR0cHM6Ly9kZWFsZXJzb2NrZXQuZW5naW5lZXJpbmcvcmVzb3VyY2VzIiwiZXhwIjoxNDQ5ODkwNTM3LCJuYmYiOjE0NDk4NTQ1Mzd9.VQMdMstgXwavT0u5dA8FCUTP-dpg-Igl9UcROGENlVuwjIWpjeBmReX0dWdghdTfVY0R-o7lBBAwSM6agV8Vh5O3LdsI2ee_Y9Y7fGZR9UxuL3mM9e6ojfxoOa1HtnH7_b1E-fTZuq9kHTSLaI66fOm8HUVckNQXBLF0o4nwreG-MytOL3t_XcWd5k3qeSRzSntN6F_oCMjoxnBlmncCZlyOHciKe2ggBgEH-WUY_QTkTE22jONuu8brkD_K4l6wsfvWW6Ff528o0Igv6fz3OscoQuWfRO__ghkHoIJ67FFSjXNe3mc9I8cEQ4oQINVARtvjXT3-NatgftT2A0NSdg%22%7D; .aspxAUTH=8C7D1FBBDDA23BCDAF2B860A987FEC2D8A40A61F28EB5FCEF986E3663082D3F0AD0F82BBF267E6A16D8DF0C5632D3C891B5898B1591A39000FB59DCEFBF1235E78A18AFF1745DA899AE54F68; ASP.NET_SessionId=2te1mwp4liaayp0fgi1ottsx; Flex-Language=en_US; _ga=GA1.1.499541115.1449854538; RP_si=154; RP_rp=GEN; RP_dc=1; EX_SITE=154",
					"if-none-match": "W/\"e85-weXk/C1044bb7iiP8Qgejg\""
				}
			}
		},
		"body": "Success",
		"statusCode": 200
	};

/***/ },

/***/ 825:
/***/ function(module, exports) {

	module.exports = {
		"$type": "QaEventPermissions",
		"addQaEvent": true,
		"removeQaEvent": true,
		"mergeQaEvent": true
	};

/***/ },

/***/ 826:
/***/ function(module, exports) {

	module.exports = [
		{
			"Id": "11111111",
			"LastUpdate": "11/18/2015",
			"$type": "CustomerQAEvent",
			"Status": {
				"value": "100027",
				"text": "5 - Completed"
			},
			"QAType": {
				"value": "1003516",
				"text": "QA Event Deleted"
			},
			"SubType": {
				"value": "1004521",
				"text": "QA Event Deleted"
			},
			"AssignTo": {
				"value": "fstbrother",
				"text": "Toby Brotherton"
			},
			"ResCode1": {
				"value": "100035",
				"text": "Unsatisfied"
			},
			"ResCode2": {
				"value": "100103",
				"text": "Unwilling to Correct"
			}
		}
	];

/***/ },

/***/ 827:
/***/ function(module, exports) {

	module.exports = {
		"Id": "2753425",
		"LastUpdate": "11/18/2015",
		"$type": "CustomerQAEvent",
		"Status": {
			"value": "100023",
			"text": "1 - Open"
		},
		"Description": "Customer is upset we didn't offer $10,000 off vehicle",
		"QAType": {
			"value": "1003516",
			"text": "Sales"
		},
		"SubType": {
			"value": "1004521",
			"text": "Complaint"
		},
		"ResolutionDate": {
			"value": "1004522",
			"text": "Tomorrow"
		},
		"AssignTo": {
			"value": "fscnorton",
			"text": "Chris Norton"
		},
		"BDCAssigned": {
			"value": "fstbell",
			"text": "Ted Bell"
		},
		"ResCode1": {
			"value": "100035",
			"text": "Unsatisfied"
		},
		"ResCode2": {
			"value": "100103",
			"text": "Unwilling to Correct"
		},
		"Ranking": {
			"value": "123456",
			"text": "Hot"
		},
		"Source": {
			"value": "123457",
			"text": "Internet"
		},
		"VehicleId": "668294"
	};

/***/ },

/***/ 828:
/***/ function(module, exports) {

	module.exports = {
		"Id": "2753426",
		"LastUpdate": "11/18/2015",
		"$type": "CustomerQAEvent",
		"Status": {
			"value": "100023",
			"text": "1 - Open"
		},
		"Description": "",
		"QAType": {
			"value": "1003516",
			"text": ""
		},
		"SubType": {
			"value": "1004521",
			"text": ""
		},
		"AssignTo": {
			"value": "fstbrother",
			"text": ""
		},
		"ResCode1": {
			"value": "100035",
			"text": "Unsatisfied"
		},
		"ResCode2": {
			"value": "100103",
			"text": "Unwilling to Correct"
		},
		"Ranking": {
			"value": "123456",
			"text": ""
		},
		"Vehicle": null
	};

/***/ },

/***/ 829:
/***/ function(module, exports) {

	module.exports = {
		"Types": [
			{
				"value": "100003",
				"text": "Sales"
			},
			{
				"value": "100004",
				"text": "Service"
			},
			{
				"value": "100006",
				"text": "QA"
			},
			{
				"value": "100005",
				"text": "Internet"
			},
			{
				"value": "200392",
				"text": "1 on 1"
			}
		],
		"ServiceProduct": [
			{
				"value": "100007",
				"text": "Complaint"
			},
			{
				"value": "100008",
				"text": "Person Greeting"
			},
			{
				"value": "100009",
				"text": "Understanding Needs"
			},
			{
				"value": "100010",
				"text": "Finance department"
			},
			{
				"value": "100011",
				"text": "Dealership Expectations"
			},
			{
				"value": "100012",
				"text": "Vehicle Expectations"
			},
			{
				"value": "100013",
				"text": "Price"
			},
			{
				"value": "100014",
				"text": "Equipped as promised"
			},
			{
				"value": "100015",
				"text": "Sales Experience"
			},
			{
				"value": "100016",
				"text": "Facility"
			},
			{
				"value": "100017",
				"text": "Parts Status"
			},
			{
				"value": "100018",
				"text": "Parts Back Order"
			},
			{
				"value": "100019",
				"text": "Parts Special Order"
			},
			{
				"value": "100020",
				"text": "Satisfied with service"
			},
			{
				"value": "100021",
				"text": "Understood Needs"
			},
			{
				"value": "100022",
				"text": "Advisor Courtesy"
			},
			{
				"value": "1004506",
				"text": "CLO"
			}
		],
		"Source": [
			{
				"value": "100031",
				"text": "Walk-in"
			},
			{
				"value": "100032",
				"text": "Inbound Call"
			},
			{
				"value": "100033",
				"text": "Outbound Call"
			},
			{
				"value": "112169",
				"text": "Web"
			},
			{
				"value": "112170",
				"text": "Dealer Mgmt Sys"
			},
			{
				"value": "112181",
				"text": "Marketing/Biz Rule"
			},
			{
				"value": "100133",
				"text": "History Import"
			},
			{
				"value": "200200",
				"text": "Survey"
			},
			{
				"value": "1003500",
				"text": "Call Center"
			},
			{
				"value": "1006027",
				"text": "Support DashBoard"
			}
		],
		"Statuses": [
			{
				"value": "100023",
				"text": "1 - Open"
			},
			{
				"value": "100024",
				"text": "2 - Resolving"
			},
			{
				"value": "100025",
				"text": "3 - Escalated"
			},
			{
				"value": "100026",
				"text": "4 - Completed"
			},
			{
				"value": "100027",
				"text": "5 - Fall Out"
			}
		],
		"ResolutionDate": [
			{
				"value": "100324",
				"text": "Today"
			},
			{
				"value": "100325",
				"text": "Next 2 Days"
			},
			{
				"value": "100326",
				"text": "Next 7 Days"
			},
			{
				"value": "100327",
				"text": "Next 2 Weeks"
			}
		],
		"Rankings": [
			{
				"value": "100028",
				"text": "1 - Hot"
			},
			{
				"value": "100029",
				"text": "2 - Medium"
			},
			{
				"value": "100030",
				"text": "3 - Cold"
			},
			{
				"value": "200083",
				"text": "4 - Disqualified"
			}
		],
		"AssignedTo": [
			{
				"value": "akalam",
				"text": "A kalam"
			},
			{
				"value": "kgaharper",
				"text": "Adam Harper"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "kgallic",
				"text": "Alli Cerruti"
			},
			{
				"value": "testentity",
				"text": "AlohaQA test"
			},
			{
				"value": "kgATest",
				"text": "Alpana Wadhwa"
			},
			{
				"value": "ame3",
				"text": "Ameeta kghqa"
			},
			{
				"value": "asaxena",
				"text": "Ameeta Saxena"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test (KG)"
			},
			{
				"value": "kgawyss",
				"text": "Andrea Wyss (KG)"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbcarpent",
				"text": "Bill Carpenter"
			},
			{
				"value": "kgbtest",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbgeorge",
				"text": "Brian George"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgcdimond",
				"text": "Carolyn Dimond"
			},
			{
				"value": "kgccarmody",
				"text": "Chris Carmody"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "testent01",
				"text": "D07508 Test"
			},
			{
				"value": "testent012",
				"text": "D7508 test"
			},
			{
				"value": "kgdavel",
				"text": "David Lytle"
			},
			{
				"value": "kgdavidl",
				"text": "David Lytle"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "fsadhawal",
				"text": "Dhawal J"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgedr",
				"text": "Edgar Reporter"
			},
			{
				"value": "kgewilson",
				"text": "Erin Wilson"
			},
			{
				"value": "fake",
				"text": "Fake Fake"
			},
			{
				"value": "finster",
				"text": "Finbarr Kiely"
			},
			{
				"value": "kggartha",
				"text": "Garth Allred"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "kgjclawson",
				"text": "Jeremy Clawson"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "jblow",
				"text": "Joe Blow"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "testfinan",
				"text": "John Tester"
			},
			{
				"value": "johntest",
				"text": "Johnny Test"
			},
			{
				"value": "kgjulied",
				"text": "Julie Dougall"
			},
			{
				"value": "kgkhewtest",
				"text": "Kimball Hewtest"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "kgKrishna",
				"text": "Krishna Ashok"
			},
			{
				"value": "kglschomak",
				"text": "Lance Schomaker"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "kgljones",
				"text": "Leland Jones"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kgOEMTeste",
				"text": "OEM Tester"
			},
			{
				"value": "pldrosa",
				"text": "Paulo L Rosa"
			},
			{
				"value": "puser",
				"text": "phantom user"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "raj",
				"text": "raj samy"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca Cook Anderson"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "kgrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrbales",
				"text": "Russ Bales"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsburgess",
				"text": "Scott Burgess"
			},
			{
				"value": "ckSElgram",
				"text": "Scott Elgram (CK)"
			},
			{
				"value": "kgSElgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgslayton",
				"text": "Scott Layton"
			},
			{
				"value": "kgsmiles",
				"text": "Scott Miles"
			},
			{
				"value": "kgSTest",
				"text": "Scott Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "kgsblum",
				"text": "Slater Blum"
			},
			{
				"value": "kgstuser1",
				"text": "SocketTalk User1"
			},
			{
				"value": "kgstuser2",
				"text": "SocketTalk User2"
			},
			{
				"value": "kgstuser3",
				"text": "SocketTalk User3"
			},
			{
				"value": "kgsschubac",
				"text": "Stan Schubach"
			},
			{
				"value": "kgspolityk",
				"text": "Steve Polityka"
			},
			{
				"value": "kgsbales",
				"text": "Surr Bales"
			},
			{
				"value": "taratest",
				"text": "Tara Turkzadeh"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgtwilkins",
				"text": "Trevor Wilkins"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			}
		],
		"BDCAssigned": [
			{
				"value": "akalam",
				"text": "A kalam"
			},
			{
				"value": "kgaharper",
				"text": "Adam Harper"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "kgallic",
				"text": "Alli Cerruti"
			},
			{
				"value": "testentity",
				"text": "AlohaQA test"
			},
			{
				"value": "kgATest",
				"text": "Alpana Wadhwa"
			},
			{
				"value": "ame3",
				"text": "Ameeta kghqa"
			},
			{
				"value": "asaxena",
				"text": "Ameeta Saxena"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test (KG)"
			},
			{
				"value": "kgawyss",
				"text": "Andrea Wyss (KG)"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbcarpent",
				"text": "Bill Carpenter"
			},
			{
				"value": "kgbtest",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbgeorge",
				"text": "Brian George"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgcdimond",
				"text": "Carolyn Dimond"
			},
			{
				"value": "kgccarmody",
				"text": "Chris Carmody"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "testent01",
				"text": "D07508 Test"
			},
			{
				"value": "testent012",
				"text": "D7508 test"
			},
			{
				"value": "kgdavel",
				"text": "David Lytle"
			},
			{
				"value": "kgdavidl",
				"text": "David Lytle"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "fsadhawal",
				"text": "Dhawal J"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgedr",
				"text": "Edgar Reporter"
			},
			{
				"value": "kgewilson",
				"text": "Erin Wilson"
			},
			{
				"value": "fake",
				"text": "Fake Fake"
			},
			{
				"value": "finster",
				"text": "Finbarr Kiely"
			},
			{
				"value": "kggartha",
				"text": "Garth Allred"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "kgjclawson",
				"text": "Jeremy Clawson"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "jblow",
				"text": "Joe Blow"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "testfinan",
				"text": "John Tester"
			},
			{
				"value": "johntest",
				"text": "Johnny Test"
			},
			{
				"value": "kgjulied",
				"text": "Julie Dougall"
			},
			{
				"value": "kgkhewtest",
				"text": "Kimball Hewtest"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "kgKrishna",
				"text": "Krishna Ashok"
			},
			{
				"value": "kglschomak",
				"text": "Lance Schomaker"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "kgljones",
				"text": "Leland Jones"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kgOEMTeste",
				"text": "OEM Tester"
			},
			{
				"value": "pldrosa",
				"text": "Paulo L Rosa"
			},
			{
				"value": "puser",
				"text": "phantom user"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "raj",
				"text": "raj samy"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca Cook Anderson"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "kgrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrbales",
				"text": "Russ Bales"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsburgess",
				"text": "Scott Burgess"
			},
			{
				"value": "ckSElgram",
				"text": "Scott Elgram (CK)"
			},
			{
				"value": "kgSElgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgslayton",
				"text": "Scott Layton"
			},
			{
				"value": "kgsmiles",
				"text": "Scott Miles"
			},
			{
				"value": "kgSTest",
				"text": "Scott Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "kgsblum",
				"text": "Slater Blum"
			},
			{
				"value": "kgstuser1",
				"text": "SocketTalk User1"
			},
			{
				"value": "kgstuser2",
				"text": "SocketTalk User2"
			},
			{
				"value": "kgstuser3",
				"text": "SocketTalk User3"
			},
			{
				"value": "kgsschubac",
				"text": "Stan Schubach"
			},
			{
				"value": "kgspolityk",
				"text": "Steve Polityka"
			},
			{
				"value": "kgsbales",
				"text": "Surr Bales"
			},
			{
				"value": "taratest",
				"text": "Tara Turkzadeh"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgtwilkins",
				"text": "Trevor Wilkins"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			}
		],
		"ResolutionCode1": [
			{
				"value": "100034",
				"text": "Satisfied"
			},
			{
				"value": "100035",
				"text": "Unsatisfied"
			},
			{
				"value": "100036",
				"text": "Indifferent"
			},
			{
				"value": "100043",
				"text": "No Response"
			}
		],
		"ResolutionCode2": {
			"100034": [
				{
					"value": "100038",
					"text": "Problem Corrected"
				},
				{
					"value": "100041",
					"text": "Response Time"
				},
				{
					"value": "100042",
					"text": "Response Effort"
				},
				{
					"value": "100037",
					"text": "Valid Explanation"
				},
				{
					"value": "100040",
					"text": "Concession Given"
				},
				{
					"value": "100039",
					"text": "Customer Error"
				}
			],
			"100035": [
				{
					"value": "100102",
					"text": "Corrected - Not Satisfied"
				},
				{
					"value": "100100",
					"text": "Could Not Be Corrected"
				},
				{
					"value": "100101",
					"text": "Customer Error"
				},
				{
					"value": "100104",
					"text": "Response Time"
				},
				{
					"value": "100103",
					"text": "Unwilling to Correct"
				}
			],
			"100036": [
				{
					"value": "100105",
					"text": "Problem Corrected"
				},
				{
					"value": "100106",
					"text": "Cound Not Be Corrected"
				},
				{
					"value": "100107",
					"text": "Concession Given"
				},
				{
					"value": "100108",
					"text": "Valid Explanation"
				}
			]
		}
	};

/***/ },

/***/ 830:
/***/ function(module, exports) {

	module.exports = [
		{
			"Id": "2753425",
			"LastUpdate": "11/18/2015",
			"$type": "CustomerQAEvent",
			"Status": {
				"value": "100027",
				"text": "5 - Completed"
			},
			"QAType": {
				"value": "1003516",
				"text": "Call Center"
			},
			"SubType": {
				"value": "1004521",
				"text": "Appt Integration - DealerCube"
			},
			"AssignTo": {
				"value": "fstbrother",
				"text": "Toby Brotherton"
			},
			"ResCode1": {
				"value": "100035",
				"text": "Unsatisfied"
			},
			"ResCode2": {
				"value": "100103",
				"text": "Unwilling to Correct"
			},
			"Vehicle": {
				"$type": "Vehicle",
				"Id": "1",
				"Vin": "123123123123",
				"Year": "2012",
				"Make": "Honda",
				"Model": "Civic",
				"StockNumber": "123123",
				"VehicleOwnership": null,
				"Trim": "Trim",
				"PurchasedDate": null,
				"Miles": 123,
				"Status": false,
				"Engine": "Engine",
				"Transmission": "Transmission",
				"Style": "Style",
				"FuelEfficiency": "FuelEfficiency",
				"Odometer": "123123",
				"Cylinders": "4",
				"LastServiced": null,
				"ServiceEvents": [],
				"GlobalId": "GlobalId",
				"Created": "Created",
				"LastModified": null,
				"CreatedBy": "CreatedBy",
				"LastModifiedBy": "LastModifiedBy",
				"ExteriorColor": "ExteriorColor",
				"InteriorColor": "InteriorColor",
				"ImageUrls": []
			}
		},
		{
			"Id": "2753424",
			"LastUpdate": "11/18/2015",
			"$type": "CustomerQAEvent",
			"Status": {
				"value": "100026",
				"text": "4 - Ready for Release"
			},
			"QAType": {
				"value": "100004",
				"text": "Support"
			},
			"SubType": {
				"value": "1003885",
				"text": "ADMIN - Store Admin"
			},
			"AssignTo": {
				"value": "fstbrother",
				"text": "Toby Brotherton"
			},
			"ResCode1": {
				"value": "100034",
				"text": "Satisfied"
			},
			"ResCode2": {
				"value": "100037",
				"text": "Valid Explanation"
			},
			"Vehicle": null
		},
		{
			"Id": "2753423",
			"LastUpdate": "11/18/2015",
			"$type": "CustomerQAEvent",
			"Status": {
				"value": "100023",
				"text": "1 - Opened"
			},
			"QAType": {
				"value": "100003",
				"text": "Sales"
			},
			"SubType": {
				"value": "250024",
				"text": "Admin-Imports"
			},
			"AssignTo": {
				"value": "fstbrother",
				"text": "Toby Brotherton"
			},
			"ResCode1": {
				"text": null
			},
			"ResCode2": {
				"text": null
			},
			"Vehicle": null
		}
	];

/***/ },

/***/ 831:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var connectionsRefDefJson = __webpack_require__(832);
	var Connections = (function () {
	    function Connections() {
	        this.connectionsData = __webpack_require__(833);
	        this.temporaryConnections = angular.copy(this.connectionsData);
	    }
	    Connections.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        // /shim/Contact(12345)
	        var connectionsEndpoint = /\/shim\/Connections\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + connectionsEndpoint.source)).respond(function (method, url, data, headers) {
	            // If we deleted or posted a connection, this will show the results, but clean it out for the next call after this.
	            var responseData = _this.temporaryConnections;
	            _this.temporaryConnections = angular.copy(_this.connectionsData);
	            return [200, responseData];
	        });
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + connectionsEndpoint.source)).respond(function (method, url, data, headers) {
	            var id = null;
	            var matches = connectionsEndpoint.exec(url);
	            if (matches && matches.length > 1) {
	                try {
	                    id = parseInt(matches[1]);
	                }
	                catch (e) {
	                }
	                if (!id)
	                    return [400];
	                var existingConnections = _.findWhere(_this.temporaryConnections, { ContactId: id });
	                if (existingConnections) {
	                    var i = _this.temporaryConnections.indexOf(existingConnections);
	                    _this.temporaryConnections.splice(i, 1);
	                }
	                return [200];
	            }
	        });
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + connectionsEndpoint.source)).respond(function (method, url, data, headers) {
	            // Update a contact so we can check after weve added a new connection that it all went through
	            _this.temporaryConnections[0].Primary.text = "Hey this is your newly added contact";
	            return [200];
	        });
	        var connectionRefDefEndpoint = /\/shim\/RefDefs\/ConnectionTypes/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + connectionRefDefEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, connectionsRefDefJson];
	        });
	    };
	    return Connections;
	}());
	module.exports = Connections;


/***/ },

/***/ 832:
/***/ function(module, exports) {

	module.exports = {
		"Types": [
			{
				"value": "1002841",
				"text": "Company"
			},
			{
				"value": "200",
				"text": "Family Member"
			},
			{
				"value": "201",
				"text": "Friend"
			},
			{
				"value": "199",
				"text": "Co-Buyer"
			},
			{
				"value": "216",
				"text": "Driver"
			},
			{
				"value": "214",
				"text": "Dealership (Internal)"
			},
			{
				"value": "203",
				"text": "Employee (External)"
			},
			{
				"value": "211",
				"text": "Subsidiary/Parent"
			},
			{
				"value": "212",
				"text": "Vendor"
			},
			{
				"value": "213",
				"text": "Partner"
			},
			{
				"value": "215",
				"text": "Manufacturer"
			}
		],
		"SubTypes": {
			"199": [
				{
					"value": "943",
					"text": "Cash"
				},
				{
					"value": "944",
					"text": "Credit"
				},
				{
					"value": "945",
					"text": "Emotional"
				}
			],
			"200": [
				{
					"value": "616",
					"text": "Spouse"
				},
				{
					"value": "612",
					"text": "Father"
				},
				{
					"value": "613",
					"text": "Mother"
				},
				{
					"value": "610",
					"text": "Son"
				},
				{
					"value": "611",
					"text": "Daughter"
				},
				{
					"value": "618",
					"text": "Sister/Brother"
				},
				{
					"value": "614",
					"text": "Cousin"
				},
				{
					"value": "615",
					"text": "Aunt/Uncle"
				},
				{
					"value": "617",
					"text": "Niece/Nephew"
				},
				{
					"value": "619",
					"text": "Grandparnet"
				},
				{
					"value": "620",
					"text": "Step Parent"
				}
			],
			"201": [
				{
					"value": "946",
					"text": "Work"
				},
				{
					"value": "947",
					"text": "Family"
				},
				{
					"value": "950",
					"text": "Influencer"
				},
				{
					"value": "949",
					"text": "Athletic"
				},
				{
					"value": "948",
					"text": "Church"
				}
			],
			"203": [
				{
					"value": "1003975",
					"text": "Agent"
				},
				{
					"value": "621",
					"text": "President"
				},
				{
					"value": "622",
					"text": "Vice President"
				},
				{
					"value": "623",
					"text": "Chief Executive Office"
				},
				{
					"value": "624",
					"text": "Chief Financial Officer"
				},
				{
					"value": "625",
					"text": "Chief Information Officer"
				},
				{
					"value": "626",
					"text": "Principal"
				},
				{
					"value": "627",
					"text": "Marketing"
				},
				{
					"value": "628",
					"text": "Sales"
				},
				{
					"value": "630",
					"text": "Service"
				},
				{
					"value": "631",
					"text": "Support"
				},
				{
					"value": "632",
					"text": "Quality Assurance"
				},
				{
					"value": "633",
					"text": "Business Development"
				},
				{
					"value": "629",
					"text": "Product Manager"
				}
			],
			"211": [],
			"212": [],
			"213": [],
			"214": [
				{
					"value": "250084",
					"text": "Controller"
				},
				{
					"value": "250085",
					"text": "Assistant Controller"
				},
				{
					"value": "937",
					"text": "General Manager"
				},
				{
					"value": "923",
					"text": "Sales Manager"
				},
				{
					"value": "924",
					"text": "Sales Person"
				},
				{
					"value": "921",
					"text": "Service Manager"
				},
				{
					"value": "922",
					"text": "Service Writer/Advisor"
				},
				{
					"value": "942",
					"text": "Service Technician"
				},
				{
					"value": "939",
					"text": "F&I"
				},
				{
					"value": "938",
					"text": "BDC/Customer Care"
				},
				{
					"value": "940",
					"text": "Parts"
				},
				{
					"value": "920",
					"text": "Lead Source"
				},
				{
					"value": "941",
					"text": "Other"
				},
				{
					"value": "960",
					"text": "GSM - General Sales Manager"
				},
				{
					"value": "961",
					"text": "New Car Sales Manager"
				},
				{
					"value": "1003766",
					"text": "Desking Contact"
				},
				{
					"value": "962",
					"text": "Used car Sales Manager"
				},
				{
					"value": "250737",
					"text": "Internet Manager"
				},
				{
					"value": "963",
					"text": "IT Manager"
				},
				{
					"value": "964",
					"text": "Fleet Manager"
				},
				{
					"value": "965",
					"text": "Fleet Sales"
				},
				{
					"value": "966",
					"text": "BDC Manager"
				},
				{
					"value": "967",
					"text": "Parts Manager"
				},
				{
					"value": "968",
					"text": "Marketing Manager"
				},
				{
					"value": "250011",
					"text": "Good Egg"
				},
				{
					"value": "250065",
					"text": "Power User"
				},
				{
					"value": "250200",
					"text": "Weblead Contact"
				},
				{
					"value": "1002916",
					"text": "Bad Egg"
				}
			],
			"215": [],
			"216": [
				{
					"value": "953",
					"text": "Secondary"
				}
			],
			"1002841": [
				{
					"value": "969",
					"text": "Owner"
				},
				{
					"value": "1002844",
					"text": "CEO"
				},
				{
					"value": "1002843",
					"text": "Secretary"
				},
				{
					"value": "1002845",
					"text": "Manager"
				},
				{
					"value": "1002842",
					"text": "Partner"
				}
			]
		}
	};

/***/ },

/***/ 833:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "Connection",
			"ContactId": "917577",
			"Primary": {
				"text": "Co-Buyer",
				"value": "199"
			},
			"Secondary": null,
			"Contact": {
				"Id": "917577",
				"Address": {
					"$type": "Address",
					"Address1": "123 Company Street",
					"Address2": "456 Other Company Street",
					"Address3": "789 Last Company Street",
					"City": "SANDY",
					"State": "AK",
					"PostalCode": "86456",
					"County": "UTAH",
					"Country": "USA",
					"isComplete": true
				},
				"Email": [
					{
						"$type": "Email",
						"Type": "Personal",
						"Address": "test@test.com",
						"Preferred": true
					}
				],
				"SocialMedia": {
					"$type": "SocialMediaCollection",
					"Other": null,
					"Facebook": "facebookname",
					"Twitter": "twiitername",
					"LinkedIn": null
				},
				"Note": "Cool place",
				"Connections": null,
				"Active": false,
				"Deleted": false,
				"Created": null,
				"Source": {
					"value": "1003915",
					"text": "Amato Auto Group"
				},
				"Status": {
					"value": "328",
					"text": "Active"
				},
				"ContactType": {
					"value": "1000",
					"text": "Prospect"
				},
				"ContactSubtype": {
					"value": "700",
					"text": "Hot (1-3 weeks)"
				},
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"GlobalId": null,
				"ExternalReferences": [
					{
						"$type": "ExternalReference",
						"Id": "661266",
						"ExternalReferenceId": "4564",
						"Franchise": ""
					}
				],
				"$type": "Organization",
				"Name": "This Is A Test Company",
				"PrimaryContact": {
					"First": "Joe",
					"Friendly": "Mail",
					"Middle": "D",
					"Last": "Tester"
				},
				"Phones": {
					"$type": "PersonPhoneCollection",
					"Main": {
						"$type": "Phone",
						"Number": "1545454545",
						"Extension": null,
						"Preferred": false
					},
					"TollFree": {
						"$type": "Phone",
						"Number": "18005555555",
						"Extension": null,
						"Preferred": false
					},
					"Fax": {
						"$type": "Phone",
						"Number": "15454545454",
						"Extension": null,
						"Preferred": false
					}
				},
				"Website": "company.com",
				"ExternalRefIds": [
					"4564"
				]
			}
		},
		{
			"$type": "Connection",
			"ContactId": "774606",
			"Primary": {
				"text": "Bestie",
				"value": "155"
			},
			"Secondary": null,
			"Contact": {
				"Id": "774606",
				"Address": {
					"$type": "Address",
					"Address1": "123 Company Street",
					"Address2": "456 Other Company Street",
					"Address3": "789 Last Company Street",
					"City": "SANDY",
					"State": "AK",
					"PostalCode": "86456",
					"County": "ORANGE",
					"Country": "USA",
					"isComplete": true
				},
				"Email": [
					{
						"$type": "Email",
						"Type": "Personal",
						"Address": "j@aaaaaaa.com",
						"Preferred": true
					}
				],
				"SocialMedia": {
					"$type": "SocialMediaCollection",
					"Other": null,
					"Facebook": "facebookname",
					"Twitter": "twittername",
					"LinkedIn": null
				},
				"Note": "Joe is a great guy",
				"Connections": null,
				"Active": false,
				"Deleted": false,
				"Created": null,
				"Source": {
					"value": "1001",
					"text": "Walk In"
				},
				"Status": {
					"value": "328",
					"text": "Active"
				},
				"ContactType": {
					"value": "305",
					"text": "Prospect"
				},
				"ContactSubtype": {
					"value": "695",
					"text": "Hot (1-3 Weeks)"
				},
				"LastModified": null,
				"CreatedBy": null,
				"LastModifiedBy": null,
				"GlobalId": null,
				"ExternalReferences": [
					{
						"$type": "ExternalReference",
						"Id": "661265",
						"ExternalReferenceId": "21651",
						"Franchise": ""
					}
				],
				"$type": "Person",
				"Name": {
					"$type": "PersonName",
					"First": "Joe",
					"Middle": "D",
					"Last": "Tester",
					"Friendly": "Mail",
					"Phonetic": "",
					"Prefix": {
						"value": "101",
						"text": "Mr."
					},
					"Suffix": "III"
				},
				"Phones": {
					"$type": "PersonPhoneCollection",
					"Home": {
						"$type": "Phone",
						"Number": "23222",
						"Extension": "123",
						"Preferred": true
					},
					"Work": {
						"$type": "Phone",
						"Number": "7145551212",
						"Extension": "123",
						"Preferred": false
					},
					"Mobile": {
						"$type": "Phone",
						"Number": "12332222222",
						"Extension": null,
						"Preferred": false
					},
					"Fax": {
						"$type": "Phone",
						"Number": "15555555555",
						"Extension": null,
						"Preferred": false
					},
					"Other": null
				},
				"Birthday": "10/8/1992",
				"Gender": "Male",
				"DriversLicense": "12314564",
				"CompanyName": "This Is A Test Company",
				"ExternalReferenceId": "21651",
				"PreferredLanguage": {
					"value": "140",
					"text": "English"
				},
				"NeverContactVia": {
					"value": "4002",
					"text": "DNC List - Current Prospect"
				},
				"Income": {
					"value": "109",
					"text": "Blank"
				},
				"HasSSN": true
			}
		}
	];

/***/ },

/***/ 834:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var customerFranchisesJson = __webpack_require__(835);
	var franchisesJson = __webpack_require__(836);
	var Franchises = (function () {
	    function Franchises() {
	    }
	    Franchises.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex, $q, apiBaseUrlRegex) {
	        // /shim/RefDefs/CustomerFranchises/12345
	        var customerFranchisesEndpoint = /\/shim\/RefDefs\/CustomerFranchises\/(\d+)$/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerFranchisesEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, customerFranchisesJson];
	        });
	        var customerFranchisesEndpoint2 = /\/shim\/RefDefs\/CustomerFranchises\//i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerFranchisesEndpoint2.source)).respond(function (method, url, data, headers) {
	            return [200, customerFranchisesJson];
	        });
	        // /shim/franchises
	        var franchises = /\/shim\/franchises/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + franchises.source)).respond(function (method, url, data, headers) {
	            return [200, franchisesJson];
	        });
	        // /franchise/getFranchises
	        var franchises = /\/franchise\/getFranchises\?(.*)/i;
	        $httpBackend.whenGET(new RegExp(apiBaseUrlRegex.source + franchises.source)).respond(function (method, url, data, headers) {
	            return [200, franchisesJson];
	        });
	    };
	    return Franchises;
	}());
	module.exports = Franchises;


/***/ },

/***/ 835:
/***/ function(module, exports) {

	module.exports = [
		{
			"value": "1",
			"text": "DealerSocket"
		},
		{
			"value": "2",
			"text": "Best Franchise"
		}
	];

/***/ },

/***/ 836:
/***/ function(module, exports) {

	module.exports = [
		{
			"text": "Enterprise Filters",
			"value": 0
		},
		{
			"text": "Acura of the Desert",
			"value": 929
		},
		{
			"text": "Baytown GMC Buick",
			"value": 950
		},
		{
			"text": "Chevrolet Cadillac of La Quinta",
			"value": 1490
		},
		{
			"text": "Clear Lake Dodge",
			"value": 953
		},
		{
			"text": "Fiat of Clear Lake",
			"value": 2056
		},
		{
			"text": "Hamer Toyota",
			"value": 2289
		},
		{
			"text": "Honda of the Desert",
			"value": 928
		},
		{
			"text": "Ken Garff Corporate",
			"value": 321
		},
		{
			"text": "Ken Garff Honda",
			"value": 154
		},
		{
			"text": "Ken Garff Honda Orem",
			"value": 374
		},
		{
			"text": "Ken Garff Hyundai",
			"value": 159
		},
		{
			"text": "Ken Garff Nissan of Salt Lake",
			"value": 40
		},
		{
			"text": "Ken Garff Nissan Orem",
			"value": 375
		},
		{
			"text": "Ken Garff Ogden (GMC Buick)",
			"value": 190
		},
		{
			"text": "Ken Garff Ogden (Honda)",
			"value": 640
		},
		{
			"text": "Ken Garff Ogden (Nissan)",
			"value": 641
		},
		{
			"text": "Ken Garff PAV",
			"value": 20
		},
		{
			"text": "Lexus (demo)",
			"value": 2
		},
		{
			"text": "LHM CJD Albuquerque",
			"value": 993
		},
		{
			"text": "LHM CJD Sandy",
			"value": 342
		},
		{
			"text": "Northwest Dodge",
			"value": 954
		},
		{
			"text": "Surf City Nissan",
			"value": 577
		},
		{
			"text": "Texan GMC Buick",
			"value": 952
		},
		{
			"text": "Toyota of the Desert",
			"value": 930
		},
		{
			"text": "West Valley Dodge",
			"value": 110
		}
	];

/***/ },

/***/ 837:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var customerServicePermissionsJson = __webpack_require__(838);
	var dataUtils = __webpack_require__(814);
	var CustomerService = (function () {
	    function CustomerService() {
	        this.customerServiceData = __webpack_require__(838);
	    }
	    CustomerService.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var customerServicePermissionsEndpoint = /\/shim\/CustomerServicePermissions\/(\d+)$/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerServicePermissionsEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerServicePermissionsEndpoint, url);
	            return [200, customerServicePermissionsJson];
	        });
	        var customerServicesEndpoint = /\/shim\/CustomerServices\/(\d+)\/(\d+)/i;
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + customerServicesEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(customerServicesEndpoint, url);
	            return [204];
	        });
	    };
	    return CustomerService;
	}());
	module.exports = CustomerService;


/***/ },

/***/ 838:
/***/ function(module, exports) {

	module.exports = {
		"addService": true,
		"removeService": true,
		"$type": "CustomerServicePermissions"
	};

/***/ },

/***/ 839:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var dealershipSelectedJson = __webpack_require__(840);
	var dataUtils = __webpack_require__(814);
	var Dealership = (function () {
	    function Dealership() {
	        this.dealershipData = __webpack_require__(840);
	    }
	    Dealership.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var dealershipSelectedEndpoint = /\/shim\/dealership\/selected/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + dealershipSelectedEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(dealershipSelectedEndpoint, url);
	            return [200, dealershipSelectedJson];
	        });
	    };
	    return Dealership;
	}());
	module.exports = Dealership;


/***/ },

/***/ 840:
/***/ function(module, exports) {

	module.exports = {
		"key": "3",
		"value": "DealerSocket"
	};

/***/ },

/***/ 841:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var lastTwentyJson = __webpack_require__(842);
	var lastTwenty = (function () {
	    function lastTwenty() {
	    }
	    lastTwenty.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var lastTwentyEndpoint = "/shim/LastTwentyContacts";
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + lastTwentyEndpoint)).respond(function (method, url, data, headers) {
	            return [200, lastTwentyJson];
	        });
	    };
	    return lastTwenty;
	}());
	module.exports = lastTwenty;


/***/ },

/***/ 842:
/***/ function(module, exports) {

	module.exports = [
		{
			"Id": "1225998",
			"SiteId": 154,
			"Address": {
				"$type": "Address",
				"Address1": "66613 Avenida Loca",
				"Address2": "",
				"Address3": "",
				"City": "Rancho Santa Margarita",
				"State": "CA",
				"PostalCode": "",
				"County": "",
				"Country": "",
				"isComplete": false
			},
			"Email": [
				{
					"$type": "Email",
					"Type": "Personal",
					"Address": "selgram@dealersocket.com",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": null,
			"Status": null,
			"ContactType": null,
			"ContactSubtype": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "Burt",
				"Middle": "",
				"Last": "Macklin",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": null,
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": {
					"$type": "Phone",
					"Number": "(123) 456-7890",
					"Extension": null,
					"Preferred": false
				},
				"Work": {
					"$type": "Phone",
					"Number": "(888) 965-1212",
					"Extension": null,
					"Preferred": false
				},
				"Mobile": {
					"$type": "Phone",
					"Number": "(949) 395-1782",
					"Extension": null,
					"Preferred": false
				},
				"Fax": null,
				"Other": null
			},
			"Birthday": "",
			"Gender": "",
			"DriversLicense": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": null,
			"NeverContactVia": null,
			"Income": null,
			"HasSSN": false
		},
		{
			"Id": "1264436",
			"SiteId": 154,
			"Address": {
				"$type": "Address",
				"Address1": "",
				"Address2": "",
				"Address3": "",
				"City": "",
				"State": "UT",
				"PostalCode": "",
				"County": "",
				"Country": "",
				"isComplete": false
			},
			"Email": [],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": null,
			"Status": null,
			"ContactType": null,
			"ContactSubtype": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "Zedd",
				"Middle": "",
				"Last": "Jones",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": null,
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": {
					"$type": "Phone",
					"Number": "(345) 345-3455",
					"Extension": null,
					"Preferred": false
				},
				"Work": null,
				"Mobile": null,
				"Fax": null,
				"Other": null
			},
			"Birthday": "",
			"Gender": "",
			"DriversLicense": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": null,
			"NeverContactVia": null,
			"Income": null,
			"HasSSN": false
		},
		{
			"Id": "1264437",
			"SiteId": 154,
			"Address": {
				"$type": "Address",
				"Address1": "",
				"Address2": "",
				"Address3": "",
				"City": "",
				"State": "UT",
				"PostalCode": "",
				"County": "",
				"Country": "",
				"isComplete": false
			},
			"Email": [
				{
					"$type": "Email",
					"Type": "Personal",
					"Address": "ds@gmail.com",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": null,
			"Status": null,
			"ContactType": null,
			"ContactSubtype": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "Duke",
				"Middle": "",
				"Last": "Silver",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": null,
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": null,
				"Work": null,
				"Mobile": {
					"$type": "Phone",
					"Number": "(345) 589-5333",
					"Extension": null,
					"Preferred": false
				},
				"Fax": null,
				"Other": null
			},
			"Birthday": "",
			"Gender": "",
			"DriversLicense": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": null,
			"NeverContactVia": null,
			"Income": null,
			"HasSSN": false
		}
	];

/***/ },

/***/ 843:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var elasticSearchDuplicates = __webpack_require__(844);
	var _ = __webpack_require__(215);
	function duplicateChecker(contact, duplicateArray) {
	    var duplicateContacts = [];
	    _.each(duplicateArray, function (item) {
	        var contactFields = [
	            contact.Name.First,
	            contact.Name.Last,
	            contact.Address.Address1,
	            contact.Email[0].Address,
	            contact.Phones.Home,
	            contact.Phones.Mobile,
	            contact.Phones.Work,
	            contact.CompanyName
	        ];
	        var duplicateFields = [
	            item.Name.First,
	            item.Name.Last,
	            item.Address.Address1,
	            item.Email[0].Address,
	            item.Phones.Home,
	            item.Phones.Mobile,
	            item.Phones.Work,
	            item.CompanyName
	        ];
	        for (var i = 0; i < contactFields.length; i++) {
	            if (duplicateFields[i] != "" && duplicateFields[i] != null && contactFields[i] != "" && contactFields[i] != null && contactFields[i] === duplicateFields[i]) {
	                duplicateContacts.push(item);
	                break;
	            }
	        }
	    });
	    return duplicateContacts;
	}
	var duplicates = (function () {
	    function duplicates() {
	    }
	    duplicates.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var duplicatesEndpoint = /\/shim\/duplicates/i;
	        $httpBackend.whenPOST('http://localhost:8082/shim/duplicates').respond(function (method, url, data) {
	            //
	            var contact = angular.fromJson(data);
	            var duplicateContacts = __webpack_require__(845);
	            var duplicatesRes = duplicateChecker(contact, duplicateContacts);
	            return [200, duplicatesRes, {}];
	        });
	        var elasticSearchDuplicatesEndpoint = /\/search\/dealership\((\d+)\)\/Contact/i;
	        $httpBackend.whenPOST(elasticSearchDuplicatesEndpoint).respond(function (method, url, data) {
	            return [200, elasticSearchDuplicates];
	        });
	    };
	    return duplicates;
	}());
	module.exports = duplicates;


/***/ },

/***/ 844:
/***/ function(module, exports) {

	module.exports = {
		"took": 14,
		"timed_out": false,
		"_shards": {
			"total": 5,
			"successful": 5,
			"failed": 0
		},
		"hits": {
			"total": 6,
			"max_score": 7,
			"hits": [
				{
					"_index": "database-154-0-0-0-151",
					"_type": "contact",
					"_id": "1680197",
					"_score": 8,
					"_source": {
						"$type": "Contact",
						"Id": 1680197,
						"Company": "",
						"Name": {
							"$type": "PersonName",
							"First": "Bobby",
							"Middle": "",
							"Last": "McBride",
							"Friendly": ""
						},
						"Phones": {
							"$type": "PhoneCollection",
							"Fax": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"TollFree": null,
							"Main": null,
							"Other": null,
							"Home": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Work": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Mobile": {
								"$type": "Phone",
								"Number": "9876543210",
								"Preferred": false
							}
						},
						"Address": {
							"$type": "Address",
							"Address1": "",
							"Address2": "",
							"City": "",
							"State": "",
							"PostalCode": ""
						},
						"Email": [
							{
								"$type": "Email",
								"Address": "rmcbride@dealersocket.com",
								"Preferred": false
							}
						],
						"AvailableVehicles": [
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2016-01-06T16:00:00",
								"Make": "Aston Martin",
								"Model": "Rapide S",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							}
						],
						"Events": [
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2885342,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Ykceb Anderson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Aston Martin",
									"Model": "Rapide S",
									"Year": 2014,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2893979,
								"Status": "1 - Appointment",
								"Type": "Warranty",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Sam KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Aston Martin",
									"Model": "Rapide S",
									"Year": 2014,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": null,
								"DmsDealNumber": null
							}
						],
						"ContactSource": null,
						"Type": "ContactType_Individual",
						"PrimaryContactType": null,
						"CustomerProfileMediaFileId": null,
						"DealershipId": 154,
						"Notes": "",
						"Deleted": false,
						"ExternalReferenceID": "",
						"DriversLicense": ""
					},
					"highlight": null
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "contact",
					"_id": "1670454",
					"_score": 8,
					"_source": {
						"$type": "Contact",
						"Id": 1670454,
						"Company": "",
						"Name": {
							"$type": "PersonName",
							"First": "Bobby",
							"Middle": "",
							"Last": "McBride",
							"Friendly": ""
						},
						"Phones": {
							"$type": "PhoneCollection",
							"Fax": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"TollFree": null,
							"Main": null,
							"Other": null,
							"Home": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Work": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Mobile": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							}
						},
						"Address": {
							"$type": "Address",
							"Address1": "<--Invalid Address-->",
							"Address2": "",
							"City": "San Clemente",
							"State": "CA",
							"PostalCode": "92673"
						},
						"Email": [
							{
								"$type": "Email",
								"Address": "rmcbride@dealersocket.com",
								"Preferred": false
							}
						],
						"AvailableVehicles": [],
						"Events": [],
						"ContactSource": "Web",
						"Type": 0,
						"PrimaryContactType": "Any Type",
						"CustomerProfileMediaFileId": null,
						"DealershipId": 154,
						"Notes": "",
						"Deleted": false,
						"ExternalReferenceID": null,
						"DriversLicense": null
					},
					"highlight": null
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "contact",
					"_id": "1681270",
					"_score": 8,
					"_source": {
						"$type": "Contact",
						"Id": 1681270,
						"Company": null,
						"Name": {
							"$type": "PersonName",
							"First": "Bobby",
							"Middle": null,
							"Last": "McBride",
							"Friendly": null
						},
						"Phones": {
							"$type": "PhoneCollection",
							"Fax": {
								"$type": "Phone",
								"Number": null,
								"Preferred": false
							},
							"TollFree": null,
							"Main": null,
							"Other": null,
							"Home": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Work": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Mobile": {
								"$type": "Phone",
								"Number": "9876543210",
								"Preferred": false
							}
						},
						"Address": {
							"$type": "Address",
							"Address1": null,
							"Address2": null,
							"City": "",
							"State": "",
							"PostalCode": ""
						},
						"Email": [
							{
								"$type": "Email",
								"Address": "rmcbride@dealersocket.com",
								"Preferred": false
							}
						],
						"AvailableVehicles": [
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Aston Martin",
								"Model": "V12 Vantage",
								"Year": 2015,
								"Plate": "",
								"Vin": "",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Nissan",
								"Model": "GT-R",
								"Year": 2014,
								"Plate": "",
								"Vin": "",
								"StockNumber": "",
								"Image": null
							}
						],
						"Events": [],
						"ContactSource": "Web",
						"Type": "ContactType_Individual",
						"PrimaryContactType": "Mobile Phone",
						"CustomerProfileMediaFileId": null,
						"DealershipId": 154,
						"Notes": "",
						"Deleted": false,
						"ExternalReferenceID": null,
						"DriversLicense": null
					},
					"highlight": null
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "contact",
					"_id": "1670781",
					"_score": 8,
					"_source": {
						"$type": "Contact",
						"Id": 1670781,
						"Company": "",
						"Name": {
							"$type": "PersonName",
							"First": "Bobby",
							"Middle": "",
							"Last": "McBride",
							"Friendly": ""
						},
						"Phones": {
							"$type": "PhoneCollection",
							"Fax": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"TollFree": null,
							"Main": null,
							"Other": null,
							"Home": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Work": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Mobile": {
								"$type": "Phone",
								"Number": "9876543210",
								"Preferred": false
							}
						},
						"Address": {
							"$type": "Address",
							"Address1": "",
							"Address2": "",
							"City": "TUSTIN",
							"State": "CA",
							"PostalCode": "92780"
						},
						"Email": [
							{
								"$type": "Email",
								"Address": "rmcbride@dealersocket.com",
								"Preferred": false
							}
						],
						"AvailableVehicles": [
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2015-05-14T11:51:53.23",
								"Make": "Ford",
								"Model": "Mustang",
								"Year": 2012,
								"Plate": "",
								"Vin": "1ZVBP8CF2C5216830",
								"StockNumber": "",
								"Image": "http://media.carbook.com/MediaGallery/media/Mjg2MDk0Xk1lZGlhIEdhbGxlcnk/cSS_ZEHeRpg4aMc2cHw7RftsmR43pfHAvfufcNyI7HbugNu-b5RhQw/2012FRD016b_320_47.png"
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2015-05-14T11:51:54.183",
								"Make": "Chevrolet",
								"Model": "Corvette Stingray",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2015-05-14T11:51:54.18",
								"Make": "Jeep",
								"Model": "Wrangler Unlimited",
								"Year": 2013,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "McLaren",
								"Model": "MP4-12C",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Freightliner",
								"Model": "Sprinter Chassis-Cabs",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Lamborghini",
								"Model": "Aventador",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Bentley",
								"Model": "Continental GT",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Lexus",
								"Model": "RX 350",
								"Year": 2015,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Maserati",
								"Model": "Ghibli",
								"Year": 2015,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Jaguar",
								"Model": "XK",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Lexus",
								"Model": "LFA",
								"Year": 2012,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Mitsubishi",
								"Model": "3000GT",
								"Year": 1994,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2015-06-10T13:00:00",
								"Make": "Mitsubishi",
								"Model": "3000GT",
								"Year": 1999,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Ford",
								"Model": "Focus",
								"Year": 2014,
								"Plate": "",
								"Vin": "1FADP3L93EL110433",
								"StockNumber": "",
								"Image": "http://media.carbook.com/MediaGallery/media/Mjg2MDk0Xk1lZGlhIEdhbGxlcnk/kDyFuMIAQEuSy5BZSqcS-4plq-JRccSimXMQGnDOAf4pvWyaKsuEQQ/2014FRD014e_320_45.png"
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2015-11-11T14:45:03.933",
								"Make": "Ford",
								"Model": "Focus",
								"Year": 2014,
								"Plate": "",
								"Vin": "1FADP3L93EL110433",
								"StockNumber": "",
								"Image": "http://media.carbook.com/MediaGallery/media/Mjg2MDk0Xk1lZGlhIEdhbGxlcnk/kDyFuMIAQEuSy5BZSqcS-4plq-JRccSimXMQGnDOAf4pvWyaKsuEQQ/2014FRD014e_320_45.png"
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2015-06-05T10:00:00",
								"Make": "Infiniti",
								"Model": "G37 Coupe",
								"Year": 2013,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Suzuki",
								"Model": "SX4",
								"Year": 2012,
								"Plate": "",
								"Vin": "",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": null,
								"Make": "Honda",
								"Model": "Ridgeline",
								"Year": 2007,
								"Plate": "",
								"Vin": "",
								"StockNumber": "",
								"Image": null
							}
						],
						"Events": [
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2877146,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Mustang",
									"Year": 2012,
									"Plate": null,
									"Vin": "1ZVBP8CF2C5216830",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2877536,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Mustang",
									"Year": 2012,
									"Plate": null,
									"Vin": "1ZVBP8CF2C5216830",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2882985,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Mustang",
									"Year": 2012,
									"Plate": null,
									"Vin": "1ZVBP8CF2C5216830",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2883216,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Mustang",
									"Year": 2012,
									"Plate": null,
									"Vin": "1ZVBP8CF2C5216830",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2883516,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Mustang",
									"Year": 2012,
									"Plate": null,
									"Vin": "1ZVBP8CF2C5216830",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2883575,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Jeep",
									"Model": "Wrangler Unlimited",
									"Year": 2013,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2883576,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Chevrolet",
									"Model": "Corvette Stingray",
									"Year": 2014,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2883834,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Chevrolet",
									"Model": "Corvette Stingray",
									"Year": 2014,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2883850,
								"Status": "0 - Unqualified",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Eddie Jeppson",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Focus",
									"Year": 2014,
									"Plate": null,
									"Vin": "1FADP3L93EL110433",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2884084,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Steve KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Mustang",
									"Year": 2012,
									"Plate": null,
									"Vin": "1ZVBP8CF2C5216830",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 1,
								"Id": 2884170,
								"Status": "2 - Store Visit",
								"Type": "New Vehicle",
								"SubType": "Finance",
								"PrimaryAssigned": "Marie Cecil",
								"VehicleOfInterest": {
									"$type": "InventoryVehicle Vehicle",
									"Id": 0,
									"NewUsedCpo": null,
									"Mileage": null,
									"Prices": null,
									"BodyClass": null,
									"ExteriorColor": null,
									"InteriorColor": null,
									"EngineSize": null,
									"Transmission": null,
									"EBrochureLink": null,
									"ReceiveDate": null,
									"Trim": null,
									"LotLocation": null,
									"DealershipId": 0,
									"FranchiseName": null,
									"Deleted": false,
									"ModelCode": null,
									"Engine": null,
									"DriveTrain": null,
									"Fuel": null,
									"Style": null,
									"Make": "",
									"Model": "",
									"Year": 0,
									"Plate": null,
									"Vin": "",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": null,
								"DmsDealNumber": ""
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2884174,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Steve KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Mitsubishi",
									"Model": "3000GT",
									"Year": 1999,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": null,
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2884181,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Sam KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Mustang",
									"Year": 2012,
									"Plate": null,
									"Vin": "1ZVBP8CF2C5216830",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2884182,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Sam KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Chevrolet",
									"Model": "Corvette Stingray",
									"Year": 2014,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2884250,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Melody Cecil",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Infiniti",
									"Model": "G37 Coupe",
									"Year": 2013,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2888580,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Sam KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Jeep",
									"Model": "Wrangler Unlimited",
									"Year": 2013,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2890608,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Adam HarperT2",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Infiniti",
									"Model": "G37 Coupe",
									"Year": 2013,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2890609,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Adam HarperT2",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Chevrolet",
									"Model": "Corvette Stingray",
									"Year": 2014,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2890618,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Sam KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Focus",
									"Year": 2014,
									"Plate": null,
									"Vin": "1FADP3L93EL110433",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2890627,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Adam HarperT2",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Mitsubishi",
									"Model": "3000GT",
									"Year": 1999,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2892103,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Quentin de Bruyn",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Honda",
									"Model": "Ridgeline",
									"Year": 2007,
									"Plate": null,
									"Vin": "",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2892105,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Quentin de Bruyn",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Ford",
									"Model": "Focus",
									"Year": 2014,
									"Plate": null,
									"Vin": "1FADP3L93EL110433",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							}
						],
						"ContactSource": "Fresh Up",
						"Type": "ContactType_Individual",
						"PrimaryContactType": "Mobile Phone",
						"CustomerProfileMediaFileId": null,
						"DealershipId": 154,
						"Notes": "",
						"Deleted": false,
						"ExternalReferenceID": "115996",
						"DriversLicense": ""
					},
					"highlight": null
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "contact",
					"_id": "1684626",
					"_score": 7,
					"_source": {
						"$type": "Contact",
						"Id": 1684626,
						"Company": "",
						"Name": {
							"$type": "PersonName",
							"First": "Bobby",
							"Middle": "",
							"Last": "McBilliams",
							"Friendly": ""
						},
						"Phones": {
							"$type": "PhoneCollection",
							"Fax": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"TollFree": null,
							"Main": null,
							"Other": null,
							"Home": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Work": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"Mobile": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							}
						},
						"Address": {
							"$type": "Address",
							"Address1": "",
							"Address2": "",
							"City": "",
							"State": "UT",
							"PostalCode": ""
						},
						"Email": [
							{
								"$type": "Email",
								"Address": "bmcasdfas@fwadads.asdf",
								"Preferred": false
							}
						],
						"AvailableVehicles": [
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": "2016-03-03T00:00:00",
								"NextOpenTodoDate": null,
								"Make": "Ford",
								"Model": "Cool Car",
								"Year": 1995,
								"Plate": "845",
								"Vin": "151512521",
								"StockNumber": "999",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": "1900-01-01T00:00:00",
								"NextOpenTodoDate": null,
								"Make": "Subaru",
								"Model": "Star Car",
								"Year": 1990,
								"Plate": "",
								"Vin": "15231535",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": "1900-01-01T00:00:00",
								"NextOpenTodoDate": null,
								"Make": "Honda",
								"Model": "Fast Car",
								"Year": 2005,
								"Plate": "",
								"Vin": "5125125",
								"StockNumber": "",
								"Image": null
							}
						],
						"Events": [
							{
								"$type": "Event",
								"EventCategory": 1,
								"Id": 2897670,
								"Status": "6 - Sold",
								"Type": "New Vehicle",
								"SubType": "Unknown",
								"PrimaryAssigned": "$Test Aloha Aloha test",
								"VehicleOfInterest": {
									"$type": "InventoryVehicle Vehicle",
									"Id": 0,
									"NewUsedCpo": null,
									"Mileage": null,
									"Prices": null,
									"BodyClass": null,
									"ExteriorColor": null,
									"InteriorColor": null,
									"EngineSize": null,
									"Transmission": null,
									"EBrochureLink": null,
									"ReceiveDate": null,
									"Trim": null,
									"LotLocation": null,
									"DealershipId": 0,
									"FranchiseName": null,
									"Deleted": false,
									"ModelCode": null,
									"Engine": null,
									"DriveTrain": null,
									"Fuel": null,
									"Style": null,
									"Make": "Ford",
									"Model": "Cool Car",
									"Year": 1995,
									"Plate": null,
									"Vin": "151512521",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": null,
								"DmsDealNumber": ""
							},
							{
								"$type": "Event",
								"EventCategory": 1,
								"Id": 2897756,
								"Status": "0 - Unqualified",
								"Type": "New Vehicle",
								"SubType": "Unknown",
								"PrimaryAssigned": "Delete Queue",
								"VehicleOfInterest": {
									"$type": "InventoryVehicle Vehicle",
									"Id": 0,
									"NewUsedCpo": null,
									"Mileage": null,
									"Prices": null,
									"BodyClass": null,
									"ExteriorColor": null,
									"InteriorColor": null,
									"EngineSize": null,
									"Transmission": null,
									"EBrochureLink": null,
									"ReceiveDate": null,
									"Trim": null,
									"LotLocation": null,
									"DealershipId": 0,
									"FranchiseName": null,
									"Deleted": false,
									"ModelCode": null,
									"Engine": null,
									"DriveTrain": null,
									"Fuel": null,
									"Style": null,
									"Make": "",
									"Model": "",
									"Year": 0,
									"Plate": null,
									"Vin": "",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": null,
								"DmsDealNumber": ""
							},
							{
								"$type": "Event",
								"EventCategory": 1,
								"Id": 2897799,
								"Status": "0 - Unqualified",
								"Type": "New Vehicle",
								"SubType": "Unknown",
								"PrimaryAssigned": "George Sagen",
								"VehicleOfInterest": {
									"$type": "InventoryVehicle Vehicle",
									"Id": 0,
									"NewUsedCpo": null,
									"Mileage": null,
									"Prices": null,
									"BodyClass": null,
									"ExteriorColor": null,
									"InteriorColor": null,
									"EngineSize": null,
									"Transmission": null,
									"EBrochureLink": null,
									"ReceiveDate": null,
									"Trim": null,
									"LotLocation": null,
									"DealershipId": 0,
									"FranchiseName": null,
									"Deleted": false,
									"ModelCode": null,
									"Engine": null,
									"DriveTrain": null,
									"Fuel": null,
									"Style": null,
									"Make": "",
									"Model": "",
									"Year": 0,
									"Plate": null,
									"Vin": "",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": null,
								"DmsDealNumber": ""
							},
							{
								"$type": "Event",
								"EventCategory": 1,
								"Id": 2897864,
								"Status": "2 - Store Visit",
								"Type": "New Vehicle",
								"SubType": "Unknown",
								"PrimaryAssigned": "George Sagen",
								"VehicleOfInterest": null,
								"DmsRONumber": null,
								"DmsDealNumber": ""
							}
						],
						"ContactSource": "Fresh Up",
						"Type": "ContactType_Individual",
						"PrimaryContactType": null,
						"CustomerProfileMediaFileId": null,
						"DealershipId": 154,
						"Notes": "",
						"Deleted": false,
						"ExternalReferenceID": "",
						"DriversLicense": ""
					},
					"highlight": null
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "contact",
					"_id": "981685",
					"_score": 2,
					"_source": {
						"$type": "Contact",
						"Id": 981685,
						"Company": "",
						"Name": {
							"$type": "PersonName",
							"First": "Bernice",
							"Middle": "L",
							"Last": "McBride",
							"Friendly": ""
						},
						"Phones": {
							"$type": "PhoneCollection",
							"Fax": {
								"$type": "Phone",
								"Number": "",
								"Preferred": false
							},
							"TollFree": null,
							"Main": null,
							"Other": null,
							"Home": {
								"$type": "Phone",
								"Number": "8014465707",
								"Preferred": false
							},
							"Work": {
								"$type": "Phone",
								"Number": "8019526562",
								"Preferred": false
							},
							"Mobile": {
								"$type": "Phone",
								"Number": "8015988242",
								"Preferred": false
							}
						},
						"Address": {
							"$type": "Address",
							"Address1": "5809 LA RIETA DR",
							"Address2": "",
							"City": "HERRIMAN",
							"State": "UT",
							"PostalCode": "84096"
						},
						"Email": [
							{
								"$type": "Email",
								"Address": "rmcbride@dealersocket.com",
								"Preferred": false
							}
						],
						"AvailableVehicles": [
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Inactive",
								"LastServiceDate": "2009-06-18T00:00:00",
								"PurchaseDate": "1900-01-01T00:00:00",
								"NextOpenTodoDate": null,
								"Make": "Hyundai",
								"Model": "TUCSON",
								"Year": 2006,
								"Plate": "",
								"Vin": "KM8JN72D16U328281",
								"StockNumber": "",
								"Image": null
							},
							{
								"$type": "CustomerOwnedVehicle Vehicle",
								"Status": "Active",
								"LastServiceDate": null,
								"PurchaseDate": null,
								"NextOpenTodoDate": "2016-03-09T15:00:00",
								"Make": "Lincoln",
								"Model": "MKZ",
								"Year": 2014,
								"Plate": "",
								"Vin": "?",
								"StockNumber": "",
								"Image": null
							}
						],
						"Events": [
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 1780613,
								"Status": "4 - Completed",
								"Type": "Unknown",
								"SubType": "Services-Intermediate",
								"PrimaryAssigned": "John Forbes",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Hyundai",
									"Model": "TUCSON",
									"Year": 2006,
									"Plate": null,
									"Vin": "KM8JN72D16U328281",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": null,
								"DmsDealNumber": null
							},
							{
								"$type": "Event",
								"EventCategory": 2,
								"Id": 2897786,
								"Status": "1 - Appointment",
								"Type": "Customer Pay",
								"SubType": "Diagnostic",
								"PrimaryAssigned": "Al KG Lui",
								"VehicleOfInterest": {
									"$type": "CustomerOwnedVehicle Vehicle",
									"Status": null,
									"LastServiceDate": null,
									"PurchaseDate": null,
									"NextOpenTodoDate": null,
									"Make": "Lincoln",
									"Model": "MKZ",
									"Year": 2014,
									"Plate": null,
									"Vin": "?",
									"StockNumber": "",
									"Image": null
								},
								"DmsRONumber": "",
								"DmsDealNumber": null
							}
						],
						"ContactSource": "Dealer Mgmt Sys",
						"Type": "ContactType_Individual",
						"PrimaryContactType": null,
						"CustomerProfileMediaFileId": null,
						"DealershipId": 154,
						"Notes": "",
						"Deleted": false,
						"ExternalReferenceID": "1834278",
						"DriversLicense": ""
					},
					"highlight": null
				}
			]
		},
		"aggregations": null
	};

/***/ },

/***/ 845:
/***/ function(module, exports) {

	module.exports = [
		{
			"Id": "",
			"Address": {
				"$type": "Address",
				"Address1": "",
				"Address2": "",
				"Address3": "",
				"City": "",
				"State": "AK",
				"PostalCode": "",
				"County": "",
				"Country": "USA",
				"isComplete": false
			},
			"Email": [
				{
					"$type": "Email",
					"Address": "generaladdress@tester.com",
					"Type": "Personal",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "Test note",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "",
				"Middle": "",
				"Last": "",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": {
					"value": "",
					"text": ""
				},
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": {
					"$type": "Phone",
					"Number": "(555) 123-4567",
					"Extension": null,
					"Preferred": false
				},
				"Work": {
					"$type": "Phone",
					"Number": "(666) 234-4567",
					"Extension": null,
					"Preferred": false
				},
				"Mobile": null,
				"Fax": null,
				"Other": null
			},
			"Birthday": "",
			"Gender": "Male",
			"DriversLicense": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": {
				"value": "140",
				"text": "English"
			},
			"ContactType": {
				"value": "305",
				"text": "Prospect"
			},
			"ContactSubtype": {
				"value": "695",
				"text": "Hot (1-3 Weeks)"
			},
			"Source": {
				"value": "1001",
				"text": "Walk In"
			},
			"Status": {
				"value": "328",
				"text": "Active"
			},
			"NeverContactVia": {
				"value": "314",
				"text": ""
			},
			"Income": {
				"value": "109",
				"text": "Blank"
			},
			"HasSSN": false
		},
		{
			"Id": "991657",
			"Address": {
				"$type": "Address",
				"Address1": "Dd",
				"Address2": "Dd",
				"Address3": "",
				"City": "DDD",
				"State": "KY",
				"PostalCode": "56555",
				"County": "DD",
				"Country": "USA"
			},
			"Email": [
				{
					"$type": "Email",
					"Type": "Personal",
					"Address": "Test@test.com",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "Dd",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": {
				"value": "1001",
				"text": "Walk In"
			},
			"Status": {
				"value": "328",
				"text": "Active"
			},
			"ContactType": {
				"value": "305",
				"text": "Prospect"
			},
			"ContactSubtype": {
				"value": "695",
				"text": "Hot (1-3 Weeks)"
			},
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "Test",
				"Middle": "",
				"Last": "Test",
				"Friendly": "Test",
				"Phonetic": "",
				"Prefix": {
					"value": "",
					"text": ""
				},
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": {
					"$type": "Phone",
					"Number": "5555555554",
					"Extension": null,
					"Preferred": false
				},
				"Work": {
					"$type": "Phone",
					"Number": "6666666666",
					"Extension": null,
					"Preferred": false
				},
				"Mobile": {
					"$type": "Phone",
					"Number": "5555555555",
					"Extension": null,
					"Preferred": false
				},
				"Fax": null,
				"Other": null
			},
			"Birthday": "1/8/1956",
			"Gender": "Female",
			"DriversLicense": "555555",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": {
				"value": "140",
				"text": "English"
			},
			"NeverContactVia": {
				"value": "314",
				"text": ""
			},
			"Income": {
				"value": "109",
				"text": "Blank"
			},
			"HasSSN": false
		},
		{
			"Id": "991653",
			"Address": {
				"$type": "Address",
				"Address1": "",
				"Address2": "",
				"Address3": "",
				"City": "",
				"State": "NJ",
				"PostalCode": "",
				"County": "",
				"Country": "USA",
				"isComplete": false
			},
			"Email": [
				{
					"$type": "Email",
					"Type": "Personal",
					"Address": "Test@test.com",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": {
				"value": "1001",
				"text": "Walk In"
			},
			"Status": {
				"value": "328",
				"text": "Active"
			},
			"ContactType": {
				"value": "305",
				"text": "Prospect"
			},
			"ContactSubtype": {
				"value": "695",
				"text": "Hot (1-3 Weeks)"
			},
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "Test",
				"Middle": "",
				"Last": "Test",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": {
					"value": "",
					"text": ""
				},
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": null,
				"Work": null,
				"Mobile": null,
				"Fax": null,
				"Other": null
			},
			"Birthday": "",
			"Gender": "Male",
			"DriversLicense": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": {
				"value": "140",
				"text": "English"
			},
			"NeverContactVia": {
				"value": "314",
				"text": ""
			},
			"Income": {
				"value": "109",
				"text": "Blank"
			},
			"HasSSN": false
		},
		{
			"Id": "3",
			"Address": {
				"$type": "Address",
				"Address1": "12456 Test Lane",
				"Address2": "Apartment A",
				"Address3": "",
				"City": "YOUNGSTOWN",
				"State": "FL",
				"PostalCode": "32466",
				"County": "",
				"Country": "USA",
				"isComplete": true
			},
			"Email": [
				{
					"$type": "Email",
					"Type": "Personal",
					"Address": "testtester@testing.not",
					"Preferred": true
				}
			],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": {
				"value": "1001",
				"text": "Walk In"
			},
			"Status": {
				"value": "328",
				"text": "Active"
			},
			"ContactType": {
				"text": null
			},
			"ContactSubtype": {
				"text": null
			},
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "Test",
				"Middle": "T",
				"Last": "Tester",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": {
					"value": "",
					"text": ""
				},
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": {
					"$type": "Phone",
					"Number": "1234567890",
					"Extension": null,
					"Preferred": false
				},
				"Work": {
					"$type": "Phone",
					"Number": "2345678909",
					"Extension": null,
					"Preferred": false
				},
				"Mobile": {
					"$type": "Phone",
					"Number": "3456789098",
					"Extension": null,
					"Preferred": false
				},
				"Fax": {
					"$type": "Phone",
					"Number": "4567890987",
					"Extension": null,
					"Preferred": false
				},
				"Other": null
			},
			"Birthday": "",
			"Gender": "Male",
			"DriversLicense": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": {
				"text": null
			},
			"NeverContactVia": {
				"value": "314",
				"text": ""
			},
			"Income": {
				"text": null
			},
			"HasSSN": false
		}
	];

/***/ },

/***/ 846:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../typings/index.d.ts"/>
	"use strict";
	var permissionsJson = __webpack_require__(847);
	var apiPermissionsJson = __webpack_require__(848);
	var _ = __webpack_require__(215);
	var Permissions = (function () {
	    function Permissions() {
	    }
	    Permissions.prototype.getParameterByName = function (name, url) {
	        if (!url)
	            url = window.location.href;
	        name = name.replace(/[\[\]]/g, "\\$&");
	        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	        if (!results)
	            return null;
	        if (!results[2])
	            return '';
	        return decodeURIComponent(results[2].replace(/\+/g, " "));
	    };
	    Permissions.prototype.getAlteredPermission = function (keys, permissions, values) {
	        var alteredApiPermission = apiPermissionsJson;
	        keys = JSON.parse(keys);
	        permissions = JSON.parse(permissions);
	        values = JSON.parse(values);
	        _.each(keys, function (key, index) {
	            var i = _.findLastIndex(alteredApiPermission, { Key: key });
	            if (i >= 0) {
	                alteredApiPermission[i][permissions[index]] = values[index];
	            }
	        });
	        return alteredApiPermission;
	    };
	    Permissions.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex, $q) {
	        var queryPermission = this.getParameterByName('permission');
	        var queryKey = this.getParameterByName('key');
	        var queryValue = this.getParameterByName('value');
	        var alteredPermissionsJson = this.getAlteredPermission(queryKey, queryPermission, queryValue);
	        var permissionsEndpoint = /\/shim\/permissions/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + permissionsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, JSON.stringify(permissionsJson)];
	        });
	        var apiPermissionsEndpoint = /\/api\/permissions/i;
	        $httpBackend.whenPOST(apiPermissionsEndpoint).respond(function (method, url, data, headers) {
	            return [200, alteredPermissionsJson];
	        });
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + apiPermissionsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, alteredPermissionsJson];
	        });
	    };
	    return Permissions;
	}());
	module.exports = Permissions;


/***/ },

/***/ 847:
/***/ function(module, exports) {

	module.exports = {
		"$type": "Permissions",
		"Sales": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"Vehicles": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"Service": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"QA": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"Marketing": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"Touches": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"Surveys": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"Duplicates": {
			"add": true,
			"remove": true,
			"merge": true
		},
		"NeverContactVia": {
			"restricted": false
		},
		"GmLookup": {
			"restricted": true
		},
		"SalesOpportunityTasks": {
			"add": true,
			"remove": true,
			"edit": true
		},
		"SalesOpportunityStatusSold": {
			"restricted": false
		},
		"Customers": {
			"add": true,
			"remove": true,
			"edit": true
		}
	};

/***/ },

/***/ 848:
/***/ function(module, exports) {

	module.exports = [
		{
			"Title": "Add Video",
			"Key": "AddVideo",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin",
			"Key": "Admin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Bulk Activity Delete",
			"Key": "AdminDBBulkActivityDelete",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Bulk Event Delete",
			"Key": "AdminDBBulkEventDelete",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Campaign Unenroll",
			"Key": "AdminDBCampaignUnenroll",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Customer Reassignment",
			"Key": "AdminDBCustomerReassignment",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Import Contact",
			"Key": "AdminDBImportContact",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Import Daily Deals File",
			"Key": "AdminDBImportDailyDealsFile",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Print Email Processing",
			"Key": "AdminDBPrintEmailProcessing",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin DB Reconcile Sales To Stage4",
			"Key": "AdminDBReconcileSalesToStage4",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Email Confidentiality Footer Setup",
			"Key": "AdminEmailConfidentialityFooterSetup",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Email Images",
			"Key": "AdminEmailImages",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Email Lead Account Setup",
			"Key": "AdminEmailLeadAccountSetup",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Email Template Setup",
			"Key": "AdminEmailTemplateSetup",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Lead Source Maintenance",
			"Key": "AdminLeadSourceMaintenance",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Notification Center",
			"Key": "AdminNotificationCenter",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Service Declined Srvc Codes",
			"Key": "AdminServiceDeclinedSrvcCodes",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Service Hours",
			"Key": "AdminServiceHours",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Service Manage Work Schedules",
			"Key": "AdminServiceManageWorkSchedules",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Service Notify Srvc APPT",
			"Key": "AdminServiceNotifySrvcAPPT",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Service Srvc Op Codes",
			"Key": "AdminServiceSrvcOpCodes",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Checklist",
			"Key": "AdminStoreChecklist",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Credit App Setup",
			"Key": "AdminStoreCreditAppSetup",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Credit User Admin",
			"Key": "AdminStoreCreditUserAdmin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Form Library",
			"Key": "AdminStoreFormLibrary",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store IP Restriction",
			"Key": "AdminStoreIPRestriction",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store MyLinks Setup",
			"Key": "AdminStoreMyLinksSetup",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Permissions",
			"Key": "AdminStorePermissions",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Security",
			"Key": "AdminStoreSecurity",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Store Hours",
			"Key": "AdminStoreStoreHours",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Teams/Roles",
			"Key": "AdminStoreTeams/Roles",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Admin Store Users",
			"Key": "AdminStoreUsers",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Amount",
			"Key": "Amount",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Analytics - My Enterprise",
			"Key": "Analytics-MyEnterprise",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Analytics - Ranks & Goals",
			"Key": "Analytics-Ranks&Goals",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "BBAppraisal",
			"Key": "BBAppraisal",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Blackbird CRM",
			"Key": "BlackbirdCRM",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Bulk Text Messaging",
			"Key": "BulkTextMessaging",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Business Rule",
			"Key": "BusinessRule",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Business Rule - Entity Count",
			"Key": "BusinessRule-EntityCount",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Call Blasts",
			"Key": "CallBlasts",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Call Measurement",
			"Key": "CallMeasurement",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Campaign Manager",
			"Key": "CampaignManager",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "CarMind",
			"Key": "CarMind",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "CDAllowDuplicate",
			"Key": "CDAllowDuplicate",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Chrome VIN Decode",
			"Key": "ChromeVINDecode",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Click to Call",
			"Key": "ClicktoCall",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Click to Call Mobile",
			"Key": "ClicktoCallMobile",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Communication Preference",
			"Key": "CommunicationPreference",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Company",
			"Key": "Company",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Credit Access Admin",
			"Key": "CreditAccessAdmin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Customer Portal",
			"Key": "CustomerPortal",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Customer Trade - ACV",
			"Key": "CustomerTrade-ACV",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Customer Trade - Payoff",
			"Key": "CustomerTrade-Payoff",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Deal Trades",
			"Key": "DealTrades",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Dealership Contact Information",
			"Key": "DealershipContactInformation",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Dealership Forms Manager",
			"Key": "DealershipFormsManager",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Desking",
			"Key": "Desking",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Desking Admin",
			"Key": "DeskingAdmin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Desking Incentives",
			"Key": "DeskingIncentives",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Desking Mobile",
			"Key": "DeskingMobile",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Desking Open RO",
			"Key": "DeskingOpenRO",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Desking Power Admin",
			"Key": "DeskingPowerAdmin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "DeskLog",
			"Key": "DeskLog",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "DisplayPanel",
			"Key": "DisplayPanel",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "DMS Customer Merge",
			"Key": "DMSCustomerMerge",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Document Manager",
			"Key": "DocumentManager",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "DoNotCall",
			"Key": "DoNotCall",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Drivers License",
			"Key": "DriversLicense",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EasyDeal Integration",
			"Key": "EasyDealIntegration",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EmailDelete",
			"Key": "EmailDelete",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EmailMyCustomer",
			"Key": "EmailMyCustomer",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EmailTemplate",
			"Key": "EmailTemplate",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Employee Dashboard Enterprise Filters",
			"Key": "EmployeeDashboardEnterpriseFilters",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Enhanced Compare",
			"Key": "EnhancedCompare",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Event Conversion",
			"Key": "EventConversion",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Event Source",
			"Key": "EventSource",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Event History",
			"Key": "EventHistory",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Event Tracking Code",
			"Key": "EventTrackingCode",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EvtActivity",
			"Key": "EvtActivity",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EvtAssignPrimary",
			"Key": "EvtAssignPrimary",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EvtBDCAssign",
			"Key": "EvtBDCAssign",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EvtContact",
			"Key": "EvtContact",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EvtHistory",
			"Key": "EvtHistory",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "EvtSalesStatus",
			"Key": "EvtSalesStatus",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Filters",
			"Key": "Filters",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Forms Re-Order",
			"Key": "FormsRe-Order",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "GlobalReports",
			"Key": "GlobalReports",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "GM Customer Search",
			"Key": "GMCustomerSearch",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Independent Dealer",
			"Key": "IndependentDealer",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Individual",
			"Key": "Individual",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Insert Restriction: Activity Type",
			"Key": "InsertRestriction:ActivityType",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Insert Restriction: Appointment Status Only",
			"Key": "InsertRestriction:AppointmentStatusOnly",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Insert Restriction: Multiple Events",
			"Key": "InsertRestriction:MultipleEvents",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Insert Restriction: Never Contact Via",
			"Key": "InsertRestriction:NeverContactVia",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Insert Restriction: Sales Source",
			"Key": "InsertRestriction:SalesSource",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Inventory Mgr",
			"Key": "InventoryMgr",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "KBBAppraisal",
			"Key": "KBBAppraisal",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Lead Forwarding Tab",
			"Key": "LeadForwardingTab",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "listBuilder",
			"Key": "listBuilder",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Live Call",
			"Key": "LiveCall",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "LoanerVehicle",
			"Key": "LoanerVehicle",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "LoanerVehicleAdmin",
			"Key": "LoanerVehicleAdmin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Localization - North America",
			"Key": "Localization-NorthAmerica",
			"Add": false,
			"Edit": false,
			"Delete": false,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Localization - Southwest Pacific",
			"Key": "Localization-SouthwestPacific",
			"Add": false,
			"Edit": false,
			"Delete": false,
			"View": false,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Marketing",
			"Key": "Marketing",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Marketing Channels",
			"Key": "MarketingChannels",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "MgrDashboard",
			"Key": "MgrDashboard",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Mobile App Settings",
			"Key": "MobileAppSettings",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Mobile Sales",
			"Key": "MobileSales",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Mobile Service",
			"Key": "MobileService",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "MoneyMaker",
			"Key": "MoneyMaker",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "MoneyMakerAdmin",
			"Key": "MoneyMakerAdmin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "MP Social Thank You",
			"Key": "MPSocialThankYou",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "MyDealerLot (MDL)",
			"Key": "MyDealerLot(MDL)",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "NADAAppraisal",
			"Key": "NADAAppraisal",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "New Credit Application",
			"Key": "NewCreditApplication",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "NotificationCenter",
			"Key": "NotificationCenter",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Platform CRM",
			"Key": "PlatformCRM",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Price Alert",
			"Key": "PriceAlert",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Print Queue",
			"Key": "PrintQueue",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "QA",
			"Key": "QA",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Rates and Residuals Integration",
			"Key": "RatesandResidualsIntegration",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Rates and Residuals Internal",
			"Key": "RatesandResidualsInternal",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Recap Deal",
			"Key": "RecapDeal",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Recap Gross",
			"Key": "RecapGross",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Recommended Services",
			"Key": "RecommendedServices",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Reports",
			"Key": "Reports",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Resource Scheduling",
			"Key": "ResourceScheduling",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Restrict Customer Search",
			"Key": "RestrictCustomerSearch",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar",
			"Key": "RevenueRadar",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Admin",
			"Key": "RevenueRadar-Admin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Alert Details Icon",
			"Key": "RevenueRadar-AlertDetailsIcon",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - CustomerTab",
			"Key": "RevenueRadar-CustomerTab",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Mobile",
			"Key": "RevenueRadar-Mobile",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Mobile Stand-Alone",
			"Key": "RevenueRadar-MobileStand-Alone",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - NextActions",
			"Key": "RevenueRadar-NextActions",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Open RO",
			"Key": "RevenueRadar-OpenRO",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Pings",
			"Key": "RevenueRadar-Pings",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Radar Setup",
			"Key": "RevenueRadar-RadarSetup",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Service",
			"Key": "RevenueRadar-Service",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Service Appt",
			"Key": "RevenueRadar-ServiceAppt",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "RevenueRadar - Soft Credit",
			"Key": "RevenueRadar-SoftCredit",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Sales",
			"Key": "Sales",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Sales Checklist",
			"Key": "SalesChecklist",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SalesCheckout",
			"Key": "SalesCheckout",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SalesMgrConsole",
			"Key": "SalesMgrConsole",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SalesSold",
			"Key": "SalesSold",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SalesSoldChangeStatus",
			"Key": "SalesSoldChangeStatus",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "ScanDL",
			"Key": "ScanDL",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SchedulePeople",
			"Key": "SchedulePeople",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "ScoreBoard",
			"Key": "ScoreBoard",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Service",
			"Key": "Service",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Service Dashboard – Service Checkout",
			"Key": "ServiceDashboard–ServiceCheckout",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Service Dashboard – Service Console",
			"Key": "ServiceDashboard–ServiceConsole",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Service Dashboard – Service Scheduler",
			"Key": "ServiceDashboard–ServiceScheduler",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Service Dashboard – Settings",
			"Key": "ServiceDashboard–Settings",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Set Phone Extension",
			"Key": "SetPhoneExtension",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Skate Alert Admin",
			"Key": "SkateAlertAdmin",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Smart Links",
			"Key": "SmartLinks",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Smart Reply",
			"Key": "SmartReply",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SMPReports",
			"Key": "SMPReports",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Social Media Links",
			"Key": "SocialMediaLinks",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SocketTalk",
			"Key": "SocketTalk",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "SumTotal Access",
			"Key": "SumTotalAccess",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Survey",
			"Key": "Survey",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Texting",
			"Key": "Texting",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Touches",
			"Key": "Touches",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Toyota Residuals Upload",
			"Key": "ToyotaResidualsUpload",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "TradeValuation",
			"Key": "TradeValuation",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Unconverted Ups",
			"Key": "UnconvertedUps",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Update Restriction: Appointment Status Only",
			"Key": "UpdateRestriction:AppointmentStatusOnly",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Vehicle",
			"Key": "Vehicle",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Vehicle Incentives",
			"Key": "VehicleIncentives",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "Vehicle Inspections",
			"Key": "VehicleInspections",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "WebServiceAppointment",
			"Key": "WebServiceAppointment",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		},
		{
			"Title": "What's New Alert",
			"Key": "What'sNewAlert",
			"Add": true,
			"Edit": true,
			"Delete": true,
			"View": true,
			"Restricted": false,
			"EnabledValues": []
		}
	];

/***/ },

/***/ 849:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var myTasksJson = __webpack_require__(850);
	var logMyTasksJson = __webpack_require__(851);
	var dataUtils = __webpack_require__(814);
	var myTasks = (function () {
	    function myTasks() {
	    }
	    myTasks.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var myTasks = /\/shim\/dashboard\/myTasks/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + myTasks.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(myTasks, url);
	            return [200, myTasksJson];
	        });
	        var logMyTasks = /\/ActivityTimeline\/customer\((\d+)\)\?\$filter=Activity\/ActivityId%20eq%20(\d+)/i;
	        $httpBackend.whenGET(logMyTasks).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(logMyTasks, url);
	            return [200, logMyTasksJson];
	        });
	    };
	    return myTasks;
	}());
	module.exports = myTasks;


/***/ },

/***/ 850:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "Task",
			"ActivityId": "688872",
			"LastUpdate": "3",
			"Age": "110",
			"ContactId": "1264439",
			"SalesOpportunityId": "1008",
			"FullName": "Test Tester",
			"ActivityType": "Appointment",
			"ActivityDateTime": "3/14/2016 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "4 - Write-Up",
			"FranchiseName": "Dealersocket",
			"HasIncentives": true,
			"Year": "2002",
			"Make": "GMC",
			"Model": "Yukon XL",
			"AssignedTo": "Toby",
			"AssignedBy": "Andrew",
			"ChromeStyleId": "379080",
			"ProductId": 888398,
			"HasPings": true,
			"PingCount": 1,
			"ActivePing": "105614",
			"NumberOfIncentives": "5"
		},
		{
			"$type": "Task",
			"ActivityId": "6888726",
			"LastUpdate": "7",
			"Age": "120",
			"ContactId": "1264439",
			"FullName": "Testing Tester",
			"ActivityType": "Appointment",
			"ActivityDateTime": "3/14/2025 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "4 - Write-Up",
			"FranchiseName": "Dealersocket",
			"Year": "2002",
			"Make": "GMC",
			"Model": "Yukon XL",
			"AssignedTo": "Toby",
			"AssignedBy": "Andrew",
			"ChromeStyleId": "379080",
			"HasIncentives": true,
			"ProductId": 888398,
			"HasPings": true,
			"PingCount": 1,
			"ActivePing": "105614",
			"NumberOfIncentives": "5"
		},
		{
			"$type": "Task",
			"ActivityId": "688890",
			"LastUpdate": "7",
			"Age": "110",
			"ContactId": "45678",
			"FullName": "Inbound Call Example",
			"ActivityType": "Inbound Call",
			"ActivityDateTime": "3/14/2016 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "6888758",
			"LastUpdate": "7",
			"Age": "110",
			"ContactId": "45678",
			"FullName": "Outbound Call Example",
			"ActivityType": "Outbound Call",
			"ActivityDateTime": "3/14/2016 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "6886782",
			"LastUpdate": "7",
			"Age": "110",
			"ContactId": "1264440",
			"SalesOpportunityId": "23456",
			"FullName": "Joe Tester",
			"ActivityType": "Web Lead",
			"ActivityDateTime": "3/14/2016 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "4 - Write-Up",
			"FranchiseName": "Dealersocket",
			"Year": "2002",
			"Make": "GMC",
			"Model": "Yukon XL",
			"AssignedTo": "Toby",
			"AssignedBy": "Andrew"
		},
		{
			"$type": "Task",
			"ActivityId": "688",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"ContactId": "1264441",
			"FullName": "Task2",
			"ActivityType": "Other",
			"ActivityDateTime": "3/14/2016 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "588782",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "23456",
			"FullName": "Jack Tester",
			"ActivityType": "Web Lead",
			"ActivityDateTime": "5/31/2025 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "4 - Write-Up",
			"FranchiseName": "Dealersocket",
			"Year": "2002",
			"Make": "GMC",
			"Model": "Yukon XL",
			"AssignedTo": "Toby",
			"AssignedBy": "Andrew"
		},
		{
			"$type": "Task",
			"ActivityId": "685582",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "34567",
			"FullName": "Task1",
			"ActivityType": "Email",
			"ShortDescription": "This is a short description",
			"ActivityDateTime": "3/14/2025 7:00 AM",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "68442",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "34567",
			"FullName": "Task1",
			"ActivityType": "Email",
			"ActivityDateTime": "3/14/2025 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "688823",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Task2",
			"ActivityType": "Other",
			"ActivityDateTime": "3/14/2025 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "688899",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Task2",
			"ActivityType": "Outbound Call",
			"ActivityDateTime": "3/14/2016 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "688898",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Task2",
			"ActivityType": "Outbound Call",
			"ActivityDateTime": "3/14/2025 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "688897",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Waka Flocka",
			"ActivityType": "Appointment",
			"ActivityDateTime": "5/31/2020 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "6888758",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Task2",
			"ActivityType": "Outbound Call",
			"ActivityDateTime": "5/31/2020 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "688895",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Task2",
			"ActivityType": "Other",
			"ActivityDateTime": "5/31/2020 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "688894",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Billy Joel",
			"ActivityType": "Appointment",
			"ActivityDateTime": "11/05/2015 2:00 PM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		},
		{
			"$type": "Task",
			"ActivityId": "688893",
			"LastUpdate": "7",
			"Age": "110",
			"SalesOpportunityId": "45678",
			"FullName": "Duke Silver",
			"ActivityType": "Outbound Call",
			"ActivityDateTime": "3/14/2016 7:00 AM",
			"ShortDescription": "This is a short description",
			"Description": "This is a long description",
			"OpportunityType": "sales",
			"EventStatus": "1 - Up/Contacted",
			"FranchiseName": "Dealersocket",
			"Year": "2000",
			"Make": "Lexus",
			"Model": "GS300",
			"AssignedTo": "Bill",
			"AssignedBy": "Joe"
		}
	];

/***/ },

/***/ 851:
/***/ function(module, exports) {

	module.exports = [
		{
			"ActivityTimelineId": 688,
			"Activity": {
				"ActivityId": 688,
				"Comment": "",
				"UpdatedBy": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"UpdateDate": "2016-03-14T15:43:57.69+00:00",
				"CreatedBy": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"CreatedDate": "2016-03-14T15:43:57.69+00:00",
				"ToDoCode": {
					"Key": 0,
					"Value": null
				},
				"Rank": {
					"Key": 100060,
					"Value": "Low"
				},
				"DueDate": "2016-03-14T06:00:00+00:00",
				"AssignedTo": {
					"UserId": 15237,
					"UserName": "fsandrewm",
					"FirstName": "DealerSocket",
					"LastName": "Automation"
				},
				"PhoneScript": {
					"Key": 0,
					"Value": null
				},
				"Transportation": {
					"Key": 0,
					"Value": null
				},
				"Status": {
					"Key": 100070,
					"Value": "Open"
				},
				"Type": {
					"Key": 100121,
					"Value": "Other"
				}
			},
			"WorkNote": null,
			"EventStatusGroup": null,
			"EventId": 45678,
			"EventType": 1,
			"CustomerId": 1264441,
			"WorkNotes": [],
			"CampaignSteps": [],
			"EventStatuses": [],
			"Type": 100121,
			"Status": 100070,
			"LastUpdated": "2016-03-14T15:43:57.69+00:00",
			"DateCreated": "2016-03-14T15:43:57.69+00:00"
		}
	];

/***/ },

/***/ 852:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var myOpportunitiesJson = __webpack_require__(853);
	var pingsJson = __webpack_require__(854);
	var dataUtils = __webpack_require__(814);
	var myOpportunities = (function () {
	    function myOpportunities() {
	    }
	    myOpportunities.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var myOpportunities = /\/shim\/dashboard\/myOpportunities/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + myOpportunities.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(myOpportunities, url);
	            return [200, myOpportunitiesJson];
	        });
	        var pings = /\/shim\/pingCollection\?entityId=((\d+))/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + pings.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(myOpportunities, url);
	            return [200, pingsJson];
	        });
	    };
	    return myOpportunities;
	}());
	module.exports = myOpportunities;


/***/ },

/***/ 853:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "opportunity",
			"ActivityId": 6888756,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 165461,
			"SalesOpportunityId": 2872330,
			"FullName": "Deloris Gilbert",
			"ActivityType": "Appointment",
			"ActivityDateTime": "11/15/2018 7:00 AM",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Unqualified",
			"FranchiseName": "Ken Garff Honda",
			"Year": "1988",
			"Make": "TOYOTA",
			"Model": "TERCEL",
			"AssignedTo": "kalam",
			"AssignedBy": "",
			"HasIncentives": false,
			"ProductId": 561330,
			"HasPings": true,
			"PingCount": 1,
			"ActivePing": "7052",
			"NumberOfIncentives": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 6888768,
			"LastUpdate": 1,
			"Age": 14,
			"ContactId": 1264437,
			"SalesOpportunityId": 8675333,
			"FullName": "Duke Silver",
			"ActivityType": "Outbound Call",
			"ActivityDateTime": "2/8/2016 7:00 AM",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Unqualified",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "kalam",
			"AssignedBy": "",
			"ChromeStyleId": "",
			"HasIncentives": true,
			"ProductId": 0,
			"HasPings": true,
			"PingCount": 1,
			"ActivePing": "4352",
			"NumberOfIncentives": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 6888779,
			"LastUpdate": 3,
			"Age": 3,
			"ContactId": 1264436,
			"SalesOpportunityId": 8675339,
			"FullName": "Zedd Jones",
			"ActivityType": "Update Your Event",
			"ActivityDateTime": "2/1/2016 7:00 AM",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Store Visit",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "kalam",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 14,
			"Age": 14,
			"ContactId": 1264445,
			"SalesOpportunityId": 8675335,
			"FullName": "Prestige Worldwide",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Unqualified",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 14,
			"Age": 14,
			"ContactId": 1264439,
			"SalesOpportunityId": 8675334,
			"FullName": "Leslie Knope",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Unqualified",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 20,
			"Age": 20,
			"ContactId": 1264437,
			"SalesOpportunityId": 8675331,
			"FullName": "Duke Silver",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Unqualified",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 1,
			"SalesOpportunityId": 1,
			"FullName": "Amber Orozco",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Unqualified",
			"FranchiseName": "Ken Garff Honda",
			"Year": "2014",
			"Make": "Ford",
			"Model": "Mustang",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 3,
			"SalesOpportunityId": 2,
			"FullName": "Test Tester",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Demo Vehicle",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 4,
			"SalesOpportunityId": 3,
			"FullName": "Dealersocket Test",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Store Visit",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 1264434,
			"SalesOpportunityId": 14,
			"FullName": "TesterFirstname TesterLastname",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Demo Vehicle",
			"FranchiseName": "Ken Garff Honda",
			"Year": "2013",
			"Make": "Honda",
			"Model": "Pilot",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 1264434,
			"SalesOpportunityId": 15,
			"FullName": "TesterFirstname TesterLastname",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Demo Vehicle",
			"FranchiseName": "Ken Garff Honda",
			"Year": "2013",
			"Make": "Honda",
			"Model": "Pilot",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 1264422,
			"SalesOpportunityId": 2216317,
			"FullName": "Robert Redford",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Write-Up",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "",
			"AssignedBy": ""
		},
		{
			"$type": "opportunity",
			"ActivityId": 0,
			"LastUpdate": 33,
			"Age": 33,
			"ContactId": 1226000,
			"SalesOpportunityId": 2215814,
			"FullName": "Frodo Baggins",
			"ActivityType": "",
			"ActivityDateTime": "",
			"ShortDescription": "",
			"Description": "",
			"OpportunityType": "sales",
			"EventStatus": "Demo Vehicle",
			"FranchiseName": "Ken Garff Honda",
			"Year": "",
			"Make": "",
			"Model": "",
			"AssignedTo": "",
			"AssignedBy": ""
		}
	];

/***/ },

/***/ 854:
/***/ function(module, exports) {

	module.exports = {
		"siteIdHash": "EK9GPRSPihU=",
		"userNameHash": "7fzBnsAgKi07dIAEsDJPeA==",
		"pingVehicles": [
			{
				"vehicleId": "434904",
				"vehicleTitle": "2005 CHEVROLET TRUCK TRAILBLAZER",
				"customerPings": [
					{
						"title": "Serviced Not Sold",
						"text": " Valuable service customer who has never purchased.  Potential sales opportunity.",
						"autoListDataIdHash": "22635rNFJkQ="
					}
				]
			}
		],
		"pingPreferenceOptions": [
			{
				"value": "0",
				"text": "Smart Payment"
			},
			{
				"value": "1",
				"text": "Equity"
			},
			{
				"value": "2",
				"text": "Lower APR"
			},
			{
				"value": "3",
				"text": "End of Term"
			},
			{
				"value": "4",
				"text": "Serviced Not Sold"
			},
			{
				"value": "5",
				"text": "Lease Over-Miles"
			},
			{
				"value": "6",
				"text": "Service Contract"
			},
			{
				"value": "7",
				"text": "Cash"
			},
			{
				"value": "8",
				"text": "No Service X Months"
			},
			{
				"value": "9",
				"text": "Sold Not Serviced"
			},
			{
				"value": "10",
				"text": "Declined Service"
			}
		],
		"selectedPingPreferences": [
			{
				"value": "0",
				"text": "Smart Payment"
			},
			{
				"value": "1",
				"text": "Equity"
			},
			{
				"value": "2",
				"text": "Lower APR"
			},
			{
				"value": "3",
				"text": "End of Term"
			},
			{
				"value": "4",
				"text": "Serviced Not Sold"
			},
			{
				"value": "5",
				"text": "Lease Over-Miles"
			},
			{
				"value": "6",
				"text": "Service Contract"
			},
			{
				"value": "7",
				"text": "Cash"
			},
			{
				"value": "8",
				"text": "No Service X Months"
			},
			{
				"value": "9",
				"text": "Sold Not Serviced"
			},
			{
				"value": "10",
				"text": "Declined Service"
			}
		]
	};

/***/ },

/***/ 855:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var filterPropertiesJson = __webpack_require__(856);
	var filterOptionsJson = __webpack_require__(857);
	var dataUtils = __webpack_require__(814);
	var filterProperties = (function () {
	    function filterProperties() {
	    }
	    filterProperties.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var filterPropertiesEndpoint = '/shim/filterProperties';
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + filterPropertiesEndpoint)).respond(function (method, url, data, headers) {
	            return [200, filterPropertiesJson];
	        });
	        var filterOptionsEndpoint = /\/shim\/filterManagerOptions\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + filterOptionsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, filterOptionsJson];
	        });
	    };
	    return filterProperties;
	}());
	module.exports = filterProperties;


/***/ },

/***/ 856:
/***/ function(module, exports) {

	module.exports = {
		"Categories": [
			{
				"key": "1400",
				"value": "Daily Responsibility"
			},
			{
				"key": "1401",
				"value": "Phone Call To Dos"
			},
			{
				"key": "1402",
				"value": "Appointment To Dos"
			},
			{
				"key": "1403",
				"value": "Unsold Traffic"
			},
			{
				"key": "1404",
				"value": "Internet Traffic"
			},
			{
				"key": "1405",
				"value": "Hot Opportunities"
			},
			{
				"key": "1406",
				"value": "Lost Opportunities"
			},
			{
				"key": "1407",
				"value": "Sold Opportunities"
			},
			{
				"key": "1408",
				"value": "Employees"
			},
			{
				"key": "1410",
				"value": "Service Opportunities"
			},
			{
				"key": "1411",
				"value": "Quality Assurance (CSI)"
			},
			{
				"key": "1409",
				"value": "Other"
			}
		],
		"SortOrderItems": [
			{
				"key": "e.dtInsertDate DESC",
				"value": "Insert Date - Event"
			},
			{
				"key": "e.dtInsertDate ASC",
				"value": "Insert Date - Event(ASC)"
			},
			{
				"key": "a.dtNextActivityDate DESC,e.dtInsertDate DESC",
				"value": "Due Date - To Do"
			},
			{
				"key": "a.dtNextActivityDate ASC,e.dtInsertDate ASC",
				"value": "Due Date - To Do(ASC)"
			},
			{
				"key": "FirstName,e.dtInsertDate DESC",
				"value": "First Name"
			},
			{
				"key": "LastName,e.dtInsertDate",
				"value": "Last Name"
			},
			{
				"key": "evtAssignedTo,e.dtInsertDate DESC",
				"value": "Assigned To - Event"
			},
			{
				"key": "BDCAssignedTo,e.dtInsertDate DESC",
				"value": "BDC Assigned To - Event"
			},
			{
				"key": "a.iActivityType,e.dtInsertDate DESC",
				"value": "To Do Type"
			},
			{
				"key": "actStatus,e.dtInsertDate DESC",
				"value": "To Do Status"
			},
			{
				"key": "e.dtUpdateDate,e.dtInsertDate DESC",
				"value": "Update Date - Event"
			}
		],
		"OpportunityTypes": [
			{
				"key": 1,
				"value": "Sales"
			},
			{
				"key": 2,
				"value": "Service"
			},
			{
				"key": 3,
				"value": "QA"
			}
		],
		"Users": {
			"0": {
				"dtlMaster_ctl00_Imagebutton1": "All Users"
			},
			"1": {
				"dtlMaster_ctl01_Imagebutton1": "Team List"
			},
			"2": {
				"dtlMaster_ctl02_Imagebutton1": "A kalam"
			},
			"3": {
				"dtlMaster_ctl03_Imagebutton1": "Adam Harper"
			},
			"4": {
				"dtlMaster_ctl04_Imagebutton1": "Al Kramer"
			},
			"5": {
				"dtlMaster_ctl05_Imagebutton1": "Alli Cerruti"
			},
			"6": {
				"dtlMaster_ctl06_Imagebutton1": "AlohaQA test"
			},
			"7": {
				"dtlMaster_ctl07_Imagebutton1": "Alpana Wadhwa"
			},
			"8": {
				"dtlMaster_ctl08_Imagebutton1": "Ameeta kghqa"
			},
			"9": {
				"dtlMaster_ctl09_Imagebutton1": "Ameeta Saxena"
			},
			"10": {
				"dtlMaster_ctl10_Imagebutton1": "Andrea Test (KG)"
			},
			"11": {
				"dtlMaster_ctl11_Imagebutton1": "Andrea Wyss (KG)"
			},
			"12": {
				"dtlMaster_ctl12_Imagebutton1": "Andy Test"
			},
			"13": {
				"dtlMaster_ctl13_Imagebutton1": "Angie Pehrson"
			},
			"14": {
				"dtlMaster_ctl14_Imagebutton1": "Barney Carlson"
			},
			"15": {
				"dtlMaster_ctl15_Imagebutton1": "Bill Carpenter"
			},
			"16": {
				"dtlMaster_ctl16_Imagebutton1": "Boyce Test (KGH)"
			},
			"17": {
				"dtlMaster_ctl17_Imagebutton1": "Brandon Crapo"
			},
			"18": {
				"dtlMaster_ctl18_Imagebutton1": "Brett Hopkins"
			},
			"19": {
				"dtlMaster_ctl19_Imagebutton1": "Brian George"
			},
			"20": {
				"dtlMaster_ctl20_Imagebutton1": "Bruce Fathers"
			},
			"21": {
				"dtlMaster_ctl21_Imagebutton1": "Carolyn Dimond"
			},
			"22": {
				"dtlMaster_ctl22_Imagebutton1": "Chris Carmody"
			},
			"23": {
				"dtlMaster_ctl23_Imagebutton1": "Chris Lenker"
			},
			"24": {
				"dtlMaster_ctl24_Imagebutton1": "D07508 Test"
			},
			"25": {
				"dtlMaster_ctl25_Imagebutton1": "D7508 test"
			},
			"26": {
				"dtlMaster_ctl26_Imagebutton1": "David Lytle"
			},
			"27": {
				"dtlMaster_ctl27_Imagebutton1": "David Lytle"
			},
			"28": {
				"dtlMaster_ctl28_Imagebutton1": "Delete Queue"
			},
			"29": {
				"dtlMaster_ctl29_Imagebutton1": "Dhawal J"
			},
			"30": {
				"dtlMaster_ctl30_Imagebutton1": "Don King"
			},
			"31": {
				"dtlMaster_ctl31_Imagebutton1": "Eddie Jeppson"
			},
			"32": {
				"dtlMaster_ctl32_Imagebutton1": "Edgar Reporter"
			},
			"33": {
				"dtlMaster_ctl33_Imagebutton1": "Erin Wilson"
			},
			"34": {
				"dtlMaster_ctl34_Imagebutton1": "Fake Fake"
			},
			"35": {
				"dtlMaster_ctl35_Imagebutton1": "Finbarr Kiely"
			},
			"36": {
				"dtlMaster_ctl36_Imagebutton1": "Garth Allred"
			},
			"37": {
				"dtlMaster_ctl37_Imagebutton1": "Internet Queue"
			},
			"38": {
				"dtlMaster_ctl38_Imagebutton1": "Jason Frampton"
			},
			"39": {
				"dtlMaster_ctl39_Imagebutton1": "Jeremy Clawson"
			},
			"40": {
				"dtlMaster_ctl40_Imagebutton1": "Jim Hutson"
			},
			"41": {
				"dtlMaster_ctl41_Imagebutton1": "Joe Blow"
			},
			"42": {
				"dtlMaster_ctl42_Imagebutton1": "Joel Uryan"
			},
			"43": {
				"dtlMaster_ctl43_Imagebutton1": "John Tester"
			},
			"44": {
				"dtlMaster_ctl44_Imagebutton1": "Johnny Test"
			},
			"45": {
				"dtlMaster_ctl45_Imagebutton1": "Julie Dougall"
			},
			"46": {
				"dtlMaster_ctl46_Imagebutton1": "Kimball Hewtest"
			},
			"47": {
				"dtlMaster_ctl47_Imagebutton1": "Kris Vreeken"
			},
			"48": {
				"dtlMaster_ctl48_Imagebutton1": "Krishna Ashok"
			},
			"49": {
				"dtlMaster_ctl49_Imagebutton1": "Lance Schomaker"
			},
			"50": {
				"dtlMaster_ctl50_Imagebutton1": "Laurie McElreath"
			},
			"51": {
				"dtlMaster_ctl51_Imagebutton1": "Leland Jones"
			},
			"52": {
				"dtlMaster_ctl52_Imagebutton1": "Mark Boehlen"
			},
			"53": {
				"dtlMaster_ctl53_Imagebutton1": "Mark Mamulski"
			},
			"54": {
				"dtlMaster_ctl54_Imagebutton1": "Mike Terry"
			},
			"55": {
				"dtlMaster_ctl55_Imagebutton1": "OEM Tester"
			},
			"56": {
				"dtlMaster_ctl56_Imagebutton1": "Paulo L Rosa"
			},
			"57": {
				"dtlMaster_ctl57_Imagebutton1": "phantom user"
			},
			"58": {
				"dtlMaster_ctl58_Imagebutton1": "Phillip Johnson"
			},
			"59": {
				"dtlMaster_ctl59_Imagebutton1": "Phone Queue"
			},
			"60": {
				"dtlMaster_ctl60_Imagebutton1": "QA Queue"
			},
			"61": {
				"dtlMaster_ctl61_Imagebutton1": "raj samy"
			},
			"62": {
				"dtlMaster_ctl62_Imagebutton1": "Rebecca Cook Anderson"
			},
			"63": {
				"dtlMaster_ctl63_Imagebutton1": "Receptionist Receptionist"
			},
			"64": {
				"dtlMaster_ctl64_Imagebutton1": "Rhett Prows"
			},
			"65": {
				"dtlMaster_ctl65_Imagebutton1": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
			},
			"66": {
				"dtlMaster_ctl66_Imagebutton1": "Ron Brown"
			},
			"67": {
				"dtlMaster_ctl67_Imagebutton1": "Russ Bales"
			},
			"68": {
				"dtlMaster_ctl68_Imagebutton1": "Sales Queue"
			},
			"69": {
				"dtlMaster_ctl69_Imagebutton1": "Sarah Hewtest (KGH)"
			},
			"70": {
				"dtlMaster_ctl70_Imagebutton1": "Scott Burgess"
			},
			"71": {
				"dtlMaster_ctl71_Imagebutton1": "Scott Elgram (CK)"
			},
			"72": {
				"dtlMaster_ctl72_Imagebutton1": "Scott Elgram (KG)"
			},
			"73": {
				"dtlMaster_ctl73_Imagebutton1": "Scott Layton"
			},
			"74": {
				"dtlMaster_ctl74_Imagebutton1": "Scott Miles"
			},
			"75": {
				"dtlMaster_ctl75_Imagebutton1": "Scott Test"
			},
			"76": {
				"dtlMaster_ctl76_Imagebutton1": "Service Queue"
			},
			"77": {
				"dtlMaster_ctl77_Imagebutton1": "Sherice Henriquez"
			},
			"78": {
				"dtlMaster_ctl78_Imagebutton1": "Slater Blum"
			},
			"79": {
				"dtlMaster_ctl79_Imagebutton1": "SocketTalk User1"
			},
			"80": {
				"dtlMaster_ctl80_Imagebutton1": "SocketTalk User2"
			},
			"81": {
				"dtlMaster_ctl81_Imagebutton1": "SocketTalk User3"
			},
			"82": {
				"dtlMaster_ctl82_Imagebutton1": "Stan Schubach"
			},
			"83": {
				"dtlMaster_ctl83_Imagebutton1": "Steve Polityka"
			},
			"84": {
				"dtlMaster_ctl84_Imagebutton1": "Surr Bales"
			},
			"85": {
				"dtlMaster_ctl85_Imagebutton1": "Tara Turkzadeh"
			},
			"86": {
				"dtlMaster_ctl86_Imagebutton1": "Taylor Johnson"
			},
			"87": {
				"dtlMaster_ctl87_Imagebutton1": "Therese Block"
			},
			"88": {
				"dtlMaster_ctl88_Imagebutton1": "Trevor Wilkins"
			},
			"89": {
				"dtlMaster_ctl89_Imagebutton1": "Wayne Petersen"
			}
		}
	};

/***/ },

/***/ 857:
/***/ function(module, exports) {

	module.exports = {
		"$type": "FilterManagerJson",
		"SortOrder": {
			"filterName": "Sort Order",
			"categoryName": "Filter Options",
			"options": [
				{
					"value": "",
					"text": "<-- Select one -->"
				},
				{
					"value": "e.dtInsertDate DESC",
					"text": "Insert Date - Event"
				},
				{
					"value": "e.dtInsertDate ASC",
					"text": "Insert Date - Event(ASC)"
				}
			],
			"selected": {}
		},
		"UserAccess": {
			"filterName": "User Access",
			"categoryName": "Filter Options",
			"options": [
				{
					"value": "kgvauto",
					"text": "vauto vauto"
				},
				{
					"value": "kgvauto1",
					"text": "vauto vauto"
				},
				{
					"value": "kgwpeterse",
					"text": "Wayne Petersen"
				},
				{
					"value": "kgyanderso",
					"text": "Ykceb Anderson"
				},
				{
					"value": "kgadamh",
					"text": "zAdam Harper"
				}
			],
			"selected": []
		},
		"OpportunityType": {
			"options": [
				{
					"value": "sales",
					"text": "Sales"
				},
				{
					"value": "service",
					"text": "Service"
				},
				{
					"value": "qa",
					"text": "QA"
				}
			],
			"selected": [
				{
					"value": "sales",
					"text": "Sales"
				}
			],
			"filterName": "Opportunity Type",
			"categoryName": "Filter Options"
		},
		"Categorized": {
			"taskType": {
				"filterName": "Task Type",
				"categoryName": "Task Filters",
				"options": [
					{
						"value": "100120",
						"text": "Outbound Call"
					},
					{
						"value": "100123",
						"text": "Appointment"
					},
					{
						"value": "100125",
						"text": "Run Credit Report"
					},
					{
						"value": "200004",
						"text": "Price Alert"
					}
				],
				"selected": []
			},
			"taskStatus": {
				"filterName": "Task Status",
				"categoryName": "Task Filters",
				"options": [
					{
						"value": "100070",
						"text": "Open"
					},
					{
						"value": "100082",
						"text": "Skipped"
					},
					{
						"value": "200366",
						"text": "Not in Market"
					}
				],
				"selected": []
			},
			"taskAssignedTo": {
				"filterName": "Assigned to",
				"categoryName": "Task Filters",
				"options": [
					{
						"value": "MY",
						"text": "Current User (MY)"
					},
					{
						"value": "ATest12321",
						"text": "$Test Aloha Aloha test"
					},
					{
						"value": "kganewman",
						"text": "Aaron Newman"
					},
					{
						"value": "kgadamh",
						"text": "zAdam Harper"
					}
				],
				"selected": []
			},
			"taskCreatedBy": {
				"filterName": "Created by",
				"categoryName": "Task Filters",
				"options": [
					{
						"value": "MY",
						"text": "Current User (MY)"
					},
					{
						"value": "ATest12321",
						"text": "$Test Aloha Aloha test"
					},
					{
						"value": "kgwpeterse",
						"text": "Wayne Petersen"
					},
					{
						"value": "kgyanderso",
						"text": "Ykceb Anderson"
					},
					{
						"value": "kgadamh",
						"text": "zAdam Harper"
					}
				],
				"selected": []
			},
			"taskCategory": {
				"filterName": "Task Category",
				"categoryName": "Task Filters",
				"options": [
					{
						"value": "1600",
						"text": "Unsold Prospect Follow Up"
					},
					{
						"value": "1601",
						"text": "High Mileage Sales Opportunity"
					},
					{
						"value": "200081",
						"text": "Hot Prospect"
					},
					{
						"value": "1004551",
						"text": "Lost Prospect"
					}
				],
				"selected": []
			},
			"taskDueDate": {
				"filterName": "Due Date",
				"categoryName": "Task Filters",
				"options": [
					{
						"value": "0",
						"text": "<-- Select one -->"
					},
					{
						"value": "111111",
						"text": "Today & Older"
					},
					{
						"value": "100301",
						"text": "Next 14 Days"
					},
					{
						"value": "100302",
						"text": "Next 30 Days"
					},
					{
						"value": "100303",
						"text": "Over 30 Days"
					}
				],
				"selected": {}
			},
			"taskCreationDate": {
				"filterName": "Creation Date",
				"categoryName": "Task Filters",
				"options": [
					{
						"value": "0",
						"text": "<-- Select one -->"
					},
					{
						"value": "111111",
						"text": "Today & Older"
					},
					{
						"value": "111112",
						"text": "Today"
					},
					{
						"value": "100302",
						"text": "Next 30 Days"
					},
					{
						"value": "100303",
						"text": "Over 30 Days"
					}
				],
				"selected": {}
			},
			"taskDescription": {
				"options": [],
				"selected": "",
				"filterName": "Description",
				"categoryName": "Task Filters"
			},
			"opportunityPrimaryAssigned": {
				"filterName": "Primary Assigned",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "MY",
						"text": "Current User (MY)"
					},
					{
						"value": "ATest12321",
						"text": "$Test Aloha Aloha test"
					},
					{
						"value": "kganewman",
						"text": "Aaron Newman"
					},
					{
						"value": "kgabc",
						"text": "abc pqr"
					},
					{
						"value": "kgaharper",
						"text": "Adam HarperT2"
					},
					{
						"value": "kgyanderso",
						"text": "Ykceb Anderson"
					},
					{
						"value": "kgadamh",
						"text": "zAdam Harper"
					}
				],
				"selected": []
			},
			"opportunitySecondaryAssigned": {
				"filterName": "Secondary Assigned",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "MY",
						"text": "Current User (MY)"
					},
					{
						"value": "ATest12321",
						"text": "$Test Aloha Aloha test"
					},
					{
						"value": "kganewman",
						"text": "Aaron Newman"
					},
					{
						"value": "kgabc",
						"text": "abc pqr"
					},
					{
						"value": "kgvauto1",
						"text": "vauto vauto"
					},
					{
						"value": "kgwpeterse",
						"text": "Wayne Petersen"
					},
					{
						"value": "kgyanderso",
						"text": "Ykceb Anderson"
					},
					{
						"value": "kgadamh",
						"text": "zAdam Harper"
					}
				],
				"selected": []
			},
			"opportunityBdcAssigned": {
				"filterName": "BDC Assigned",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "MY",
						"text": "Current User (MY)"
					},
					{
						"value": "ATest12321",
						"text": "$Test Aloha Aloha test"
					},
					{
						"value": "kgyanderso",
						"text": "Ykceb Anderson"
					},
					{
						"value": "kgadamh",
						"text": "zAdam Harper"
					}
				],
				"selected": []
			},
			"opportunityTrackingCode": {
				"filterName": "Tracking Code",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "6859",
						"text": "$TestTrackCamp1     "
					},
					{
						"value": "6107",
						"text": "1-Internet          "
					},
					{
						"value": "6479",
						"text": "zag                 "
					},
					{
						"value": "6483",
						"text": "zag 123             "
					}
				],
				"selected": []
			},
			"opportunityCreatedBy": {
				"filterName": "Created by",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "MY",
						"text": "Current User (MY)"
					},
					{
						"value": "kgyanderso",
						"text": "Ykceb Anderson"
					},
					{
						"value": "kgadamh",
						"text": "zAdam Harper"
					}
				],
				"selected": []
			},
			"opportunityUpdatedBy": {
				"filterName": "Updated by",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "MY",
						"text": "Current User (MY)"
					},
					{
						"value": "ATest12321",
						"text": "$Test Aloha Aloha test"
					},
					{
						"value": "kgyanderso",
						"text": "Ykceb Anderson"
					},
					{
						"value": "kgadamh",
						"text": "zAdam Harper"
					}
				],
				"selected": []
			},
			"opportunityTeamAssigned": {
				"filterName": "Team Assigned",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "1999",
						"text": "*Sales Manager B"
					},
					{
						"value": "2034",
						"text": "Testing Event Permissions"
					},
					{
						"value": "1918",
						"text": "Trade In Specialist"
					}
				],
				"selected": []
			},
			"opportunityDateCreated": {
				"filterName": "Date Created",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "0",
						"text": "<-- Select one -->"
					},
					{
						"value": "111111",
						"text": "Today & Older"
					},
					{
						"value": "100301",
						"text": "Next 14 Days"
					},
					{
						"value": "100302",
						"text": "Next 30 Days"
					},
					{
						"value": "100303",
						"text": "Over 30 Days"
					}
				],
				"selected": {}
			},
			"opportunityDateUpdated": {
				"filterName": "Date Updated",
				"categoryName": "Opportunity Filters (Shared)",
				"options": [
					{
						"value": "0",
						"text": "<-- Select one -->"
					},
					{
						"value": "111111",
						"text": "Today & Older"
					},
					{
						"value": "100302",
						"text": "Next 30 Days"
					},
					{
						"value": "100303",
						"text": "Over 30 Days"
					}
				],
				"selected": {}
			},
			"opportunityDescription": {
				"options": [],
				"selected": "",
				"filterName": "Description",
				"categoryName": "Opportunity Filters (Shared)"
			},
			"salesType": {
				"selected": [],
				"filterName": "Sales Type",
				"categoryName": "Sales Opportunity Filters",
				"options": [
					{
						"value": "100050",
						"text": "New Vehicle"
					},
					{
						"value": "100051",
						"text": "Used Vehicle"
					},
					{
						"value": "100052",
						"text": "Future Model"
					},
					{
						"value": "100053",
						"text": "Factory Order"
					},
					{
						"value": "100055",
						"text": "Unknown"
					},
					{
						"value": "100056",
						"text": "CPO"
					}
				]
			},
			"salesPurchaseType": {
				"selected": [],
				"filterName": "Purchase Type",
				"categoryName": "Sales Opportunity Filters",
				"options": [
					{
						"value": "100280",
						"text": "Unknown"
					},
					{
						"value": "100282",
						"text": "Cash"
					},
					{
						"value": "100283",
						"text": "Finance"
					},
					{
						"value": "100281",
						"text": "Lease"
					},
					{
						"value": "100284",
						"text": "Special Finance"
					},
					{
						"value": "1002840",
						"text": "Balloon"
					}
				]
			},
			"salesCloseDate": {
				"selected": [],
				"filterName": "Close Date",
				"categoryName": "Sales Opportunity Filters",
				"options": [
					{
						"value": "100316",
						"text": "Need Co-Signer"
					},
					{
						"value": "100315",
						"text": "Upside Down"
					},
					{
						"value": "100314",
						"text": "No Qualify"
					},
					{
						"value": "100313",
						"text": "No Document"
					},
					{
						"value": "100304",
						"text": "24 Hours"
					}
				]
			},
			"salesSource": {
				"selected": [],
				"filterName": "Source",
				"categoryName": "Sales Opportunity Filters",
				"options": [
					{
						"value": "1009561",
						"text": "Closed"
					},
					{
						"value": "240",
						"text": "Fresh Up"
					},
					{
						"value": "1009598",
						"text": "Test0223"
					}
				]
			},
			"salesStep": {
				"selected": [],
				"filterName": "Sales Step",
				"categoryName": "Sales Opportunity Filters",
				"options": [
					{
						"value": "220",
						"text": "0 - Unqualified"
					},
					{
						"value": "221",
						"text": "1 - Up/Contacted"
					},
					{
						"value": "226",
						"text": "7 - Lost"
					}
				]
			},
			"salesRanking": {
				"selected": [],
				"filterName": "Ranking",
				"categoryName": "Sales Opportunity Filters",
				"options": [
					{
						"value": "230",
						"text": "1 - Hot"
					},
					{
						"value": "231",
						"text": "2 - Medium"
					},
					{
						"value": "232",
						"text": "3 - Cold"
					},
					{
						"value": "233",
						"text": "4 - Disqualified"
					}
				]
			},
			"salesSoldDate": {
				"filterName": "Sold Date",
				"categoryName": "Sales Opportunity Filters",
				"options": [
					{
						"value": "0",
						"text": "<-- Select one -->"
					},
					{
						"value": "111111",
						"text": "Today & Older"
					},
					{
						"value": "100303",
						"text": "Over 30 Days"
					}
				],
				"selected": {}
			},
			"serviceType": {
				"selected": [],
				"filterName": "Service Type",
				"categoryName": "Service Opportunity Filters",
				"options": [
					{
						"value": "100159",
						"text": "Customer Pay"
					},
					{
						"value": "100158",
						"text": "Warranty"
					},
					{
						"value": "1002983",
						"text": "Parts"
					}
				]
			},
			"serviceOptions": {
				"selected": [],
				"filterName": "Service Options",
				"categoryName": "Service Opportunity Filters",
				"options": [
					{
						"value": "100164",
						"text": "Diagnostic"
					},
					{
						"value": "100161",
						"text": "Services-Minor"
					},
					{
						"value": "100162",
						"text": "Services-Intermediate"
					},
					{
						"value": "100163",
						"text": "Services-Major"
					},
					{
						"value": "200055",
						"text": "SOP"
					},
					{
						"value": "200074",
						"text": "Recall"
					},
					{
						"value": "200082",
						"text": "Service Reminder"
					}
				]
			},
			"serviceAppointmentDate": {
				"selected": [],
				"filterName": "Appointment Date",
				"categoryName": "Service Opportunity Filters",
				"options": [
					{
						"value": "100320",
						"text": "Today"
					},
					{
						"value": "100321",
						"text": "Next 2 Days"
					},
					{
						"value": "100322",
						"text": "Next 7 Days"
					},
					{
						"value": "100323",
						"text": "Next 2 Weeks"
					}
				]
			},
			"serviceSource": {
				"selected": [],
				"filterName": "Source",
				"categoryName": "Service Opportunity Filters",
				"options": [
					{
						"value": "100174",
						"text": "Walk-in"
					},
					{
						"value": "100175",
						"text": "Inbound Call"
					},
					{
						"value": "100176",
						"text": "Outbound Call"
					},
					{
						"value": "100177",
						"text": "Web"
					},
					{
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					{
						"value": "112182",
						"text": "Marketing/Biz Rule"
					},
					{
						"value": "100132",
						"text": "History Import"
					},
					{
						"value": "200079",
						"text": "SVC Coupon"
					},
					{
						"value": "1009548",
						"text": "RevenueRadar"
					},
					{
						"value": "200356",
						"text": "Service Reminder"
					},
					{
						"value": "112187",
						"text": "Call Center"
					},
					{
						"value": "1008004",
						"text": "Web/CallCenter"
					},
					{
						"value": "1009500",
						"text": "MobileGarage"
					},
					{
						"value": "1700",
						"text": "Web (3rd party)"
					}
				]
			},
			"serviceStep": {
				"selected": [],
				"filterName": "Service Step",
				"categoryName": "Service Opportunity Filters",
				"options": [
					{
						"value": "100165",
						"text": "0 - Unqualified"
					},
					{
						"value": "100166",
						"text": "1 - Appointment"
					},
					{
						"value": "100167",
						"text": "2 - Diagnosis"
					},
					{
						"value": "100168",
						"text": "3 - In Service"
					},
					{
						"value": "100169",
						"text": "4 - Completed"
					},
					{
						"value": "100170",
						"text": "5 - Lost"
					}
				]
			},
			"serviceRanking": {
				"selected": [],
				"filterName": "Ranking",
				"categoryName": "Service Opportunity Filters",
				"options": [
					{
						"value": "100171",
						"text": "1 - Hot"
					},
					{
						"value": "100172",
						"text": "2 - Medium"
					},
					{
						"value": "100173",
						"text": "3 - Cold"
					}
				]
			},
			"serviceCloseDate": {
				"filterName": "Close Date",
				"categoryName": "Service Opportunity Filters",
				"options": [
					{
						"value": "0",
						"text": "<-- Select one -->"
					},
					{
						"value": "111111",
						"text": "Today & Older"
					},
					{
						"value": "111112",
						"text": "Today"
					},
					{
						"value": "100200",
						"text": "Yesterday"
					},
					{
						"value": "100202",
						"text": "Tomorrow"
					},
					{
						"value": "100201",
						"text": "Past Week"
					},
					{
						"value": "100214",
						"text": "Past Two Weeks"
					},
					{
						"value": "100221",
						"text": "Month To Date"
					},
					{
						"value": "100220",
						"text": "Current Month"
					},
					{
						"value": "100230",
						"text": "Past Month"
					},
					{
						"value": "100260",
						"text": "Past Two Months"
					},
					{
						"value": "100266",
						"text": "Past Six Months"
					},
					{
						"value": "100300",
						"text": "Next 7 Days"
					},
					{
						"value": "100301",
						"text": "Next 14 Days"
					},
					{
						"value": "100302",
						"text": "Next 30 Days"
					},
					{
						"value": "100303",
						"text": "Over 30 Days"
					}
				],
				"selected": {}
			},
			"qaType": {
				"selected": [],
				"filterName": "QA Type",
				"categoryName": "QA Opportunity Filters",
				"options": [
					{
						"value": "100003",
						"text": "Sales"
					},
					{
						"value": "100004",
						"text": "Service"
					},
					{
						"value": "100006",
						"text": "QA"
					},
					{
						"value": "100005",
						"text": "Internet"
					},
					{
						"value": "200392",
						"text": "1 on 1"
					},
					{
						"value": "1009562",
						"text": "Support"
					}
				]
			},
			"qaProblem": {
				"selected": [],
				"filterName": "QA Problem",
				"categoryName": "QA Opportunity Filters",
				"options": [
					{
						"value": "100007",
						"text": "Complaint"
					},
					{
						"value": "100008",
						"text": "Person Greeting"
					},
					{
						"value": "100009",
						"text": "Understanding Needs"
					},
					{
						"value": "100010",
						"text": "Finance department"
					},
					{
						"value": "100011",
						"text": "Dealership Expectations"
					},
					{
						"value": "100012",
						"text": "Vehicle Expectations"
					},
					{
						"value": "100013",
						"text": "Price"
					},
					{
						"value": "100014",
						"text": "Equipped as promised"
					},
					{
						"value": "100015",
						"text": "Sales Experience"
					},
					{
						"value": "100016",
						"text": "Facility"
					},
					{
						"value": "100017",
						"text": "Parts Status"
					},
					{
						"value": "100018",
						"text": "Parts Back Order"
					},
					{
						"value": "100019",
						"text": "Parts Special Order"
					},
					{
						"value": "100020",
						"text": "Satisfied with service"
					},
					{
						"value": "100021",
						"text": "Understood Needs"
					},
					{
						"value": "100022",
						"text": "Advisor Courtesy"
					},
					{
						"value": "1004506",
						"text": "CLO"
					}
				]
			},
			"qaResolutionDate": {
				"selected": [],
				"filterName": "Resolution Date",
				"categoryName": "QA Opportunity Filters",
				"options": [
					{
						"value": "100324",
						"text": "Today"
					},
					{
						"value": "100325",
						"text": "Next 2 Days"
					},
					{
						"value": "100326",
						"text": "Next 7 Days"
					},
					{
						"value": "100327",
						"text": "Next 2 Weeks"
					}
				]
			},
			"qaSource": {
				"selected": [],
				"filterName": "Source",
				"categoryName": "QA Opportunity Filters",
				"options": [
					{
						"value": "100031",
						"text": "Walk-in"
					},
					{
						"value": "100032",
						"text": "Inbound Call"
					},
					{
						"value": "100033",
						"text": "Outbound Call"
					},
					{
						"value": "112169",
						"text": "Web"
					},
					{
						"value": "112170",
						"text": "Dealer Mgmt Sys"
					},
					{
						"value": "112181",
						"text": "Marketing/Biz Rule"
					},
					{
						"value": "100133",
						"text": "History Import"
					},
					{
						"value": "200200",
						"text": "Survey"
					},
					{
						"value": "1003500",
						"text": "Call Center"
					},
					{
						"value": "1006027",
						"text": "Support DashBoard"
					}
				]
			},
			"qaStep": {
				"selected": [],
				"filterName": "QA Step",
				"categoryName": "QA Opportunity Filters",
				"options": [
					{
						"value": "100023",
						"text": "1 - Open"
					},
					{
						"value": "100024",
						"text": "2 - Resolving"
					},
					{
						"value": "100025",
						"text": "3 - Escalated"
					},
					{
						"value": "100026",
						"text": "4 - Fall Out"
					},
					{
						"value": "100027",
						"text": "5 - Completed"
					}
				]
			},
			"qaRanking": {
				"selected": [],
				"filterName": "Ranking",
				"categoryName": "QA Opportunity Filters",
				"options": [
					{
						"value": "100028",
						"text": "1 - Hot"
					},
					{
						"value": "100029",
						"text": "2 - Medium"
					},
					{
						"value": "100030",
						"text": "3 - Cold"
					},
					{
						"value": "200083",
						"text": "4 - Disqualified"
					}
				]
			},
			"vehicleMake": {
				"options": [],
				"selected": "",
				"filterName": "Make",
				"categoryName": "Vehicle Record"
			},
			"vehicleModel": {
				"options": [],
				"selected": "",
				"filterName": "Model",
				"categoryName": "Vehicle Record"
			},
			"vehicleYear": {
				"options": [],
				"selected": "",
				"filterName": "Year",
				"categoryName": "Vehicle Record"
			},
			"vehicleExactMatch": {
				"options": [
					{
						"value": "make",
						"text": "Vehicle Make"
					},
					{
						"value": "model",
						"text": "Vehicle Model"
					}
				],
				"selected": [],
				"filterName": "Exact Match",
				"categoryName": "Vehicle Record"
			}
		}
	};

/***/ },

/***/ 858:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var dataUtils = __webpack_require__(814);
	var Username = (function () {
	    function Username() {
	    }
	    Username.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var usernameEndpoint = /\/shim\/username/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + usernameEndpoint.source)).respond(function (method, url, data, headers) {
	            dataUtils.checkIdIsPassed(usernameEndpoint, url);
	            return [200, 'DS Automation'];
	        });
	    };
	    return Username;
	}());
	module.exports = Username;


/***/ },

/***/ 859:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var lastContactJson = __webpack_require__(860);
	var addressJson = __webpack_require__(861);
	var LastContact = (function () {
	    function LastContact() {
	    }
	    LastContact.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var lastContactEndpoint = '/shim/LastContact';
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + lastContactEndpoint)).respond(function (method, url, data, headers) {
	            return [200, lastContactJson];
	        });
	        var carfaxAddressEndpoint = '/shim/Contacts';
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + carfaxAddressEndpoint)).respond(function (method, url, data, headers) {
	            return [200, addressJson];
	        });
	    };
	    return LastContact;
	}());
	module.exports = LastContact;


/***/ },

/***/ 860:
/***/ function(module, exports) {

	module.exports = {
		"SiteId": "154",
		"EntityId": "1264437",
		"CustomerType": "2"
	};

/***/ },

/***/ 861:
/***/ function(module, exports) {

	module.exports = {
		"Id": "1674674",
		"Address": {
			"$type": "Address",
			"Address1": "456 Main Street",
			"Address2": "",
			"Address3": "",
			"City": "Funky Town",
			"State": "AZ",
			"PostalCode": "34564",
			"County": "",
			"Country": "USA",
			"isComplete": true
		},
		"Email": [
			{
				"$type": "Email",
				"Type": "Personal",
				"Address": "randerson@dealersocket.com",
				"Preferred": true
			}
		],
		"SocialMedia": {
			"$type": "SocialMediaCollection",
			"Other": null,
			"Facebook": null,
			"Twitter": null,
			"LinkedIn": null
		},
		"Note": "",
		"ImgUrl": "",
		"Connections": null,
		"Active": false,
		"Deleted": false,
		"Created": null,
		"Source": {
			"value": "1002850",
			"text": "Fresh Up"
		},
		"Status": {
			"value": "328",
			"text": "Active"
		},
		"ContactType": {
			"value": "305",
			"text": "Prospect"
		},
		"ContactSubtype": {
			"value": "695",
			"text": "Hot (1-3 Weeks)"
		},
		"LastModified": null,
		"CreatedBy": null,
		"LastModifiedBy": null,
		"GlobalId": null,
		"ExternalReferences": [],
		"GmInfo": {
			"GmState": null,
			"SurrogateId": null
		},
		"$type": "Person",
		"Name": {
			"$type": "PersonName",
			"First": "Gladiator",
			"Middle": "",
			"Last": "Test",
			"Friendly": "",
			"Phonetic": "",
			"Prefix": {
				"value": "",
				"text": ""
			},
			"Suffix": ""
		},
		"Phones": {
			"$type": "PersonPhoneCollection",
			"Home": {
				"$type": "Phone",
				"Number": "7145554646",
				"Extension": null,
				"Preferred": false
			},
			"Work": null,
			"Mobile": {
				"$type": "Phone",
				"Number": "7148899377",
				"Extension": null,
				"Preferred": false
			},
			"Fax": null,
			"Other": null,
			"DncOption": ""
		},
		"Birthday": "10/10/1910",
		"Gender": "Male",
		"DriversLicense": "gj32226",
		"CompanyName": "",
		"ExternalReferenceId": "",
		"PreferredLanguage": {
			"value": "140",
			"text": "English"
		},
		"NeverContactVia": {
			"value": "314",
			"text": ""
		},
		"Income": {
			"value": "109",
			"text": "Blank"
		},
		"HasSSN": false
	};

/***/ },

/***/ 862:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var employeeNamesJson = __webpack_require__(863);
	var EmployeeNames = (function () {
	    function EmployeeNames() {
	    }
	    EmployeeNames.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var employeeNamesEndpoint = '/shim/employeeNames';
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + employeeNamesEndpoint)).respond(function (method, url, data, headers) {
	            return [200, employeeNamesJson];
	        });
	    };
	    return EmployeeNames;
	}());
	module.exports = EmployeeNames;


/***/ },

/***/ 863:
/***/ function(module, exports) {

	module.exports = [
		{
			"text": "A kalam",
			"value": "akalam"
		},
		{
			"text": "Adam Harper",
			"value": "kgaharper"
		},
		{
			"text": "Al Kramer",
			"value": "kgakramer"
		},
		{
			"text": "Alli Cerruti",
			"value": "kgallic"
		},
		{
			"text": "AlohaQA test",
			"value": "testentity"
		},
		{
			"text": "Alpana Wadhwa",
			"value": "kgATest"
		},
		{
			"text": "Ameeta kghqa",
			"value": "ame3"
		},
		{
			"text": "Ameeta Saxena",
			"value": "asaxena"
		},
		{
			"text": "Andrea Test (KG)",
			"value": "kgawysst"
		},
		{
			"text": "Andrea Wyss (KG)",
			"value": "kgawyss"
		},
		{
			"text": "Andy Test",
			"value": "kgandy"
		},
		{
			"text": "Angie Pehrson",
			"value": "kgapehrson"
		},
		{
			"text": "Barney Carlson",
			"value": "kgbarneyc"
		},
		{
			"text": "Bill Carpenter",
			"value": "kgbcarpent"
		},
		{
			"text": "Boyce Test (KGH)",
			"value": "kgbtest"
		},
		{
			"text": "Brandon Crapo",
			"value": "kgbcrapo"
		},
		{
			"text": "Brett Hopkins",
			"value": "kgbhopkins"
		},
		{
			"text": "Brian George",
			"value": "kgbgeorge"
		},
		{
			"text": "Bruce Fathers",
			"value": "kgbfathers"
		},
		{
			"text": "Carolyn Dimond",
			"value": "kgcdimond"
		},
		{
			"text": "Chris Carmody",
			"value": "kgccarmody"
		},
		{
			"text": "Chris Lenker",
			"value": "kgchrisl"
		},
		{
			"text": "D07508 Test",
			"value": "testent01"
		},
		{
			"text": "D7508 test",
			"value": "testent012"
		},
		{
			"text": "David Lytle",
			"value": "kgdavidl"
		},
		{
			"text": "David Lytle",
			"value": "kgdavel"
		},
		{
			"text": "Delete Queue",
			"value": "kgdel"
		},
		{
			"text": "Dhawal J",
			"value": "fsadhawal"
		},
		{
			"text": "Don King",
			"value": "kgdking"
		},
		{
			"text": "Eddie Jeppson",
			"value": "kgejeppson"
		},
		{
			"text": "Edgar Reporter",
			"value": "kgedr"
		},
		{
			"text": "Erin Wilson",
			"value": "kgewilson"
		}
	];

/***/ },

/***/ 864:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var customerSurveysJson = __webpack_require__(865);
	var CustomerSurveys = (function () {
	    function CustomerSurveys() {
	    }
	    CustomerSurveys.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var customerSurveys = /\/shim\/CustomerSurveys\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + customerSurveys.source)).respond(function (method, url, data, headers) {
	            return [200, customerSurveysJson];
	        });
	    };
	    return CustomerSurveys;
	}());
	module.exports = CustomerSurveys;


/***/ },

/***/ 865:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "CustomerSalesSurvey",
			"Id": "1011",
			"Name": "Sales Survey",
			"Score": 56,
			"PurchaseDate": "",
			"Vehicle": "2008 Chevrolet Golderado",
			"SurveyDate": "2/11/2016",
			"Price": 100,
			"Vin": "15151515",
			"VehicleOdometer": 8,
			"Type": "New Vehicle",
			"DmsNumber": "8675341",
			"Salesperson": "Angie Pehrson",
			"QuestionsAndResponses": [
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we courteous and respectful?",
					"Response": "6"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Did we listen to you and understood your needs?",
					"Response": "5"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we sensitive to your time?",
					"Response": "6"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we knowledgeable about our vehicles?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Were we truthful and honest?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Did we use gimmicks or high pressure sales tactics?",
					"Response": "7"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "How likely are you to recommend Ken Garff to friends or family members?",
					"Response": "4"
				},
				{
					"$type": "CustomerSurveyQuestionAndResponse",
					"Question": "Additional Comments",
					"Response": "Hello, world!"
				}
			]
		}
	];

/***/ },

/***/ 866:
/***/ function(module, exports) {

	///<reference path="../../typings/index.d.ts"/>
	"use strict";
	var Log = (function () {
	    function Log() {
	    }
	    Log.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        // /shim/log
	        var logEndpoint = /\/shim\/log/i;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + logEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, []];
	        });
	    };
	    return Log;
	}());
	module.exports = Log;


/***/ },

/***/ 867:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var salesOpportunityAddRefDefsJson = __webpack_require__(868);
	var salesOpportunityRefDefs = (function () {
	    function salesOpportunityRefDefs() {
	    }
	    salesOpportunityRefDefs.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        // /shim/RefDefs/SalesOpportunityAdd/undefined
	        var salesOpportunityAdd = /\/shim\/RefDefs\/SalesOpportunityAdd\/(undefined|\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + salesOpportunityAdd.source)).respond(function (method, url, data, headers) {
	            return [200, salesOpportunityAddRefDefsJson];
	        });
	    };
	    return salesOpportunityRefDefs;
	}());
	module.exports = salesOpportunityRefDefs;


/***/ },

/***/ 868:
/***/ function(module, exports) {

	module.exports = {
		"Types": [
			{
				"value": "100050",
				"text": "New Vehicle"
			},
			{
				"value": "100051",
				"text": "Used Vehicle"
			},
			{
				"value": "100052",
				"text": "Future Model"
			},
			{
				"value": "100053",
				"text": "Factory Order"
			},
			{
				"value": "100055",
				"text": "Unknown"
			},
			{
				"value": "100056",
				"text": "CPO"
			}
		],
		"PurchaseTypes": [
			{
				"value": "100280",
				"text": "Unknown"
			},
			{
				"value": "100282",
				"text": "Cash"
			},
			{
				"value": "100283",
				"text": "Finance"
			},
			{
				"value": "100281",
				"text": "Lease"
			},
			{
				"value": "100284",
				"text": "Special Finance"
			},
			{
				"value": "1002840",
				"text": "Balloon"
			}
		],
		"SalesSources": [
			{
				"value": "1009561",
				"text": "Closed"
			},
			{
				"value": "240",
				"text": "Fresh Up"
			},
			{
				"value": "241",
				"text": "Phone Up"
			},
			{
				"value": "242",
				"text": "Internet"
			},
			{
				"value": "1004571",
				"text": "TIM"
			},
			{
				"value": "243",
				"text": "Dealer Mgmt Sys"
			},
			{
				"value": "244",
				"text": "Marketing/Biz Rule"
			},
			{
				"value": "254",
				"text": "Lease Return"
			},
			{
				"value": "246",
				"text": "History Import"
			},
			{
				"value": "1009546",
				"text": "RevenueRadar"
			},
			{
				"value": "1009582",
				"text": "Test EDR"
			},
			{
				"value": "1009592",
				"text": "Test RefDef"
			},
			{
				"value": "1009598",
				"text": "Test0223"
			}
		],
		"TrackingCodes": [
			{
				"value": "6859",
				"text": "$TestTrackCamp1     "
			},
			{
				"value": "6528",
				"text": "123                 "
			},
			{
				"value": "6107",
				"text": "1-Internet          "
			},
			{
				"value": "1028",
				"text": "1-Location          "
			},
			{
				"value": "1023",
				"text": "1-Radio             "
			},
			{
				"value": "5639",
				"text": "2- AutoAlert        "
			},
			{
				"value": "4776",
				"text": "2-AutoTIM           "
			},
			{
				"value": "1305",
				"text": "2-Brand Loyalty Hond"
			},
			{
				"value": "1022",
				"text": "2-Brand Loyalty-Garf"
			},
			{
				"value": "3725",
				"text": "2-Cash4Clunker      "
			},
			{
				"value": "4059",
				"text": "2-Corp Partnership  "
			},
			{
				"value": "6208",
				"text": "2-Email Blasts      "
			},
			{
				"value": "2634",
				"text": "2-Keys2Success      "
			},
			{
				"value": "1047",
				"text": "2-Mail Email        "
			},
			{
				"value": "1072",
				"text": "2-Mail Postal       "
			},
			{
				"value": "3168",
				"text": "2-MonsterAd         "
			},
			{
				"value": "464",
				"text": "2-Newspaper         "
			},
			{
				"value": "2317",
				"text": "2-Other             "
			},
			{
				"value": "1589",
				"text": "2-Other Military    "
			},
			{
				"value": "1191",
				"text": "2-Other Sam's Club  "
			},
			{
				"value": "3769",
				"text": "2-Park City Arts Fes"
			},
			{
				"value": "2314",
				"text": "2-Prospecting       "
			},
			{
				"value": "5683",
				"text": "2-QR Code           "
			},
			{
				"value": "5395",
				"text": "2-Referral Customer "
			},
			{
				"value": "5393",
				"text": "2-Referral Service D"
			},
			{
				"value": "5394",
				"text": "2-Repeat            "
			},
			{
				"value": "3408",
				"text": "2-Thomas Arts       "
			},
			{
				"value": "462",
				"text": "2-TV                "
			},
			{
				"value": "3358",
				"text": "2-Yellow Pages      "
			},
			{
				"value": "6650",
				"text": "ADP saraht          "
			},
			{
				"value": "6488",
				"text": "Ask A Service Tech  "
			},
			{
				"value": "6521",
				"text": "Auto Club SoCal     "
			},
			{
				"value": "6476",
				"text": "Auto trader 958     "
			},
			{
				"value": "6468",
				"text": "AutoTrader 123      "
			},
			{
				"value": "6469",
				"text": "AutoTrader 1234     "
			},
			{
				"value": "6485",
				"text": "autotrader 404      "
			},
			{
				"value": "6475",
				"text": "Autotrader 957      "
			},
			{
				"value": "6465",
				"text": "AutoTrader New      "
			},
			{
				"value": "6466",
				"text": "AutoTrader Old      "
			},
			{
				"value": "6467",
				"text": "AutoTradertest      "
			},
			{
				"value": "6517",
				"text": "BG Tracking Code    "
			},
			{
				"value": "6486",
				"text": "billboard test      "
			},
			{
				"value": "6648",
				"text": "bogus               "
			},
			{
				"value": "6439",
				"text": "Car Finder - www.ken"
			},
			{
				"value": "6856",
				"text": "CarChat24           "
			},
			{
				"value": "6705",
				"text": "Chrysler USA - Get a"
			},
			{
				"value": "6544",
				"text": "D11933              "
			},
			{
				"value": "6545",
				"text": "D11933 Service      "
			},
			{
				"value": "6807",
				"text": "Dealer Website - $35"
			},
			{
				"value": "6808",
				"text": "Dealer Website - 000"
			},
			{
				"value": "6679",
				"text": "DealerSocket - Reven"
			},
			{
				"value": "6644",
				"text": "DealerSocket Support"
			},
			{
				"value": "6809",
				"text": "DealerTrack         "
			},
			{
				"value": "6806",
				"text": "DI - Please schedule"
			},
			{
				"value": "6514",
				"text": "eBrochure           "
			},
			{
				"value": "6444",
				"text": "Edmunds             "
			},
			{
				"value": "6421",
				"text": "Email Friend Vehicle"
			},
			{
				"value": "6573",
				"text": "Finance Application "
			},
			{
				"value": "6300",
				"text": "FREEPRESSRELEASE.COM"
			},
			{
				"value": "6693",
				"text": "Google              "
			},
			{
				"value": "6518",
				"text": "Google Advisor      "
			},
			{
				"value": "6622",
				"text": "HR - GM Handraiser  "
			},
			{
				"value": "5510",
				"text": "I-Net AutoAlert     "
			},
			{
				"value": "5707",
				"text": "I-Net Autobytel     "
			},
			{
				"value": "4111",
				"text": "I-Net AutoPriceFinde"
			},
			{
				"value": "4937",
				"text": "I-Net Autos.com     "
			},
			{
				"value": "4535",
				"text": "I-Net Autotegrity.co"
			},
			{
				"value": "455",
				"text": "I-Net AutoTrader.com"
			},
			{
				"value": "6206",
				"text": "I-Net AutoUSA ShowPr"
			},
			{
				"value": "2969",
				"text": "I-Net AutoUSA.com   "
			},
			{
				"value": "4981",
				"text": "I-Net BlackBook     "
			},
			{
				"value": "3880",
				"text": "I-Net CarLocate.com "
			},
			{
				"value": "456",
				"text": "I-Net Cars.com      "
			},
			{
				"value": "4534",
				"text": "I-Net CarsBestValue."
			},
			{
				"value": "4069",
				"text": "I-Net CarsDirect.com"
			},
			{
				"value": "5019",
				"text": "I-Net Carsforsale.co"
			},
			{
				"value": "2816",
				"text": "I-Net CarsNew.com   "
			},
			{
				"value": "459",
				"text": "I-Net CarSoup.com   "
			},
			{
				"value": "4975",
				"text": "I-Net Chat          "
			},
			{
				"value": "2885",
				"text": "I-Net Craigslist.com"
			},
			{
				"value": "2605",
				"text": "I-Net CREDCO        "
			},
			{
				"value": "4084",
				"text": "I-Net CreditJockey  "
			},
			{
				"value": "2120",
				"text": "I-Net CUDL.com      "
			},
			{
				"value": "5662",
				"text": "I-Net DealerRater   "
			},
			{
				"value": "4565",
				"text": "I-Net Dealix.com    "
			},
			{
				"value": "3539",
				"text": "I-Net Detroit TE    "
			},
			{
				"value": "3357",
				"text": "I-Net DexKnows.com  "
			},
			{
				"value": "4995",
				"text": "I-Net eBay          "
			},
			{
				"value": "3243",
				"text": "I-Net Edmonds.com   "
			},
			{
				"value": "4114",
				"text": "I-Net EveryCarListed"
			},
			{
				"value": "4105",
				"text": "I-Net Facebook.com  "
			},
			{
				"value": "5580",
				"text": "I-Net Google Adwords"
			},
			{
				"value": "3707",
				"text": "I-Net Gumiyo        "
			},
			{
				"value": "2793",
				"text": "I-Net Honda.com     "
			},
			{
				"value": "4072",
				"text": "I-Net iMotors.com   "
			},
			{
				"value": "1674",
				"text": "I-Net Jumpstart     "
			},
			{
				"value": "2160",
				"text": "I-Net KenGarff.com  "
			},
			{
				"value": "4060",
				"text": "I-Net KGMobile.com  "
			},
			{
				"value": "2822",
				"text": "I-Net KSL.com       "
			},
			{
				"value": "3900",
				"text": "I-Net LeadForward.co"
			},
			{
				"value": "5515",
				"text": "I-Net Lucy Marketing"
			},
			{
				"value": "4096",
				"text": "I-Net MyUtahAutos.co"
			},
			{
				"value": "2428",
				"text": "I-Net SamsClub.com  "
			},
			{
				"value": "6122",
				"text": "I-Net Shop4UsedCars."
			},
			{
				"value": "4104",
				"text": "I-Net SmartAutoSavin"
			},
			{
				"value": "4079",
				"text": "I-Net TA Microsite  "
			},
			{
				"value": "5437",
				"text": "I-Net Taylor Marketi"
			},
			{
				"value": "4892",
				"text": "I-Net Twitter       "
			},
			{
				"value": "4083",
				"text": "I-Net UtahBuyback.co"
			},
			{
				"value": "5102",
				"text": "I-Net UtahRides.com "
			},
			{
				"value": "461",
				"text": "I-Net Vehix.com     "
			},
			{
				"value": "4360",
				"text": "I-Net WP/Blogger    "
			},
			{
				"value": "3907",
				"text": "I-Net Yahoo.com     "
			},
			{
				"value": "5702",
				"text": "I-Net Youtube       "
			},
			{
				"value": "2968",
				"text": "I-Net Zag.com       "
			},
			{
				"value": "6059",
				"text": "Internet - KUTV     "
			},
			{
				"value": "6377",
				"text": "Karhunt             "
			},
			{
				"value": "6455",
				"text": "LDS Living          "
			},
			{
				"value": "6863",
				"text": "Lead Source Code Tes"
			},
			{
				"value": "6704",
				"text": "lincoln.com         "
			},
			{
				"value": "6538",
				"text": "MM-Birthday         "
			},
			{
				"value": "6533",
				"text": "MM-Cust In Equity   "
			},
			{
				"value": "6540",
				"text": "MM-Declined Svc     "
			},
			{
				"value": "6535",
				"text": "MM-End of Term      "
			},
			{
				"value": "6534",
				"text": "MM-Lower APR        "
			},
			{
				"value": "6536",
				"text": "MM-Not Svc X Months "
			},
			{
				"value": "6532",
				"text": "MM-Raise/Lower Pmt  "
			},
			{
				"value": "6537",
				"text": "MM-Sold No Service  "
			},
			{
				"value": "6541",
				"text": "MM-Svc No Purchase  "
			},
			{
				"value": "6539",
				"text": "MM-Veh Anniversary  "
			},
			{
				"value": "6620",
				"text": "Mobile Application  "
			},
			{
				"value": "6907",
				"text": "Mobile-Toyota.com - "
			},
			{
				"value": "379",
				"text": "NewProspect         "
			},
			{
				"value": "6610",
				"text": "Nissan.ca - Request "
			},
			{
				"value": "6929",
				"text": "NissanUSA - Contact "
			},
			{
				"value": "6920",
				"text": "Notification Test   "
			},
			{
				"value": "6794",
				"text": "PhoneLeads          "
			},
			{
				"value": "6659",
				"text": "Porsche USA - Get a "
			},
			{
				"value": "6936",
				"text": "PorscheDealer.com Th"
			},
			{
				"value": "6472",
				"text": "rdtwashere          "
			},
			{
				"value": "6473",
				"text": "rdtwashere 123      "
			},
			{
				"value": "6474",
				"text": "rdtwashere 956      "
			},
			{
				"value": "6428",
				"text": "Request More Info001"
			},
			{
				"value": "6509",
				"text": "RR-Cash             "
			},
			{
				"value": "6512",
				"text": "RR-Declined Service "
			},
			{
				"value": "6505",
				"text": "RR-End of Term      "
			},
			{
				"value": "6503",
				"text": "RR-Equity           "
			},
			{
				"value": "6507",
				"text": "RR-Lease Over-Miles "
			},
			{
				"value": "6504",
				"text": "RR-Lower APR        "
			},
			{
				"value": "6510",
				"text": "RR-No Svc X Months  "
			},
			{
				"value": "6508",
				"text": "RR-Service Contract "
			},
			{
				"value": "6506",
				"text": "RR-Serviced Not Sold"
			},
			{
				"value": "6502",
				"text": "RR-Smart Payment    "
			},
			{
				"value": "6511",
				"text": "RR-Sold Not Serviced"
			},
			{
				"value": "6596",
				"text": "Sarah06.24.13       "
			},
			{
				"value": "6597",
				"text": "Sarah06.24.13-2     "
			},
			{
				"value": "6598",
				"text": "Sarah06.24.13-3     "
			},
			{
				"value": "6594",
				"text": "Sarah062113         "
			},
			{
				"value": "6593",
				"text": "SarahC              "
			},
			{
				"value": "6590",
				"text": "SarahC06.19.13 1    "
			},
			{
				"value": "6470",
				"text": "saraht              "
			},
			{
				"value": "6477",
				"text": "saraht 1            "
			},
			{
				"value": "6495",
				"text": "saraht 1116         "
			},
			{
				"value": "6496",
				"text": "saraht 11162        "
			},
			{
				"value": "6501",
				"text": "Saraht 1206         "
			},
			{
				"value": "6471",
				"text": "saraht 123          "
			},
			{
				"value": "6478",
				"text": "saraht 2            "
			},
			{
				"value": "6480",
				"text": "saraht 404          "
			},
			{
				"value": "6481",
				"text": "saraht 405          "
			},
			{
				"value": "6482",
				"text": "saraht 406          "
			},
			{
				"value": "6487",
				"text": "saraht 409          "
			},
			{
				"value": "6494",
				"text": "SethDealerCentricSet"
			},
			{
				"value": "6858",
				"text": "Shift Digital - Get "
			},
			{
				"value": "6629",
				"text": "Subaru Dealer Sit000"
			},
			{
				"value": "6531",
				"text": "Subaru Dealer Site -"
			},
			{
				"value": "6513",
				"text": "Suck                "
			},
			{
				"value": "6546",
				"text": "test 1              "
			},
			{
				"value": "6464",
				"text": "Test AutoTrader     "
			},
			{
				"value": "6565",
				"text": "Test Click Through R"
			},
			{
				"value": "6922",
				"text": "Trilogy SmartLeads  "
			},
			{
				"value": "6935",
				"text": "Trilogy SmartLeads T"
			},
			{
				"value": "6654",
				"text": "Unavailable         "
			},
			{
				"value": "6301",
				"text": "Utah Honda Dealers M"
			},
			{
				"value": "6937",
				"text": "www.porschedealer.co"
			},
			{
				"value": "6479",
				"text": "zag                 "
			},
			{
				"value": "6483",
				"text": "zag 123             "
			}
		],
		"Rankings": [
			{
				"value": "230",
				"text": "1 - Hot"
			},
			{
				"value": "231",
				"text": "2 - Medium"
			},
			{
				"value": "232",
				"text": "3 - Cold"
			},
			{
				"value": "233",
				"text": "4 - Disqualified"
			}
		],
		"CloseDates": [
			{
				"value": "100316",
				"text": "Need Co-Signer"
			},
			{
				"value": "100315",
				"text": "Upside Down"
			},
			{
				"value": "100314",
				"text": "No Qualify"
			},
			{
				"value": "100313",
				"text": "No Document"
			},
			{
				"value": "100312",
				"text": "No License"
			},
			{
				"value": "100311",
				"text": "Need Parent"
			},
			{
				"value": "100310",
				"text": "Looker"
			},
			{
				"value": "100309",
				"text": "Had To Run"
			},
			{
				"value": "100308",
				"text": "Sold Spot"
			},
			{
				"value": "100307",
				"text": "Sold Deposit"
			},
			{
				"value": "100306",
				"text": "Delivery"
			},
			{
				"value": "100305",
				"text": "Second Auto"
			},
			{
				"value": "100303",
				"text": "Over 2 Months"
			},
			{
				"value": "100302",
				"text": "Next 2 Months"
			},
			{
				"value": "100301",
				"text": "Next 30 Days"
			},
			{
				"value": "100300",
				"text": "Next 7 Days"
			},
			{
				"value": "100304",
				"text": "24 Hours"
			}
		],
		"PrimaryAssigned": [
			{
				"value": "ATest12321",
				"text": "$Test Aloha Aloha test"
			},
			{
				"value": "kganewman",
				"text": "Aaron Newman"
			},
			{
				"value": "kgabc",
				"text": "abc pqr"
			},
			{
				"value": "kgaharper",
				"text": "Adam HarperT2"
			},
			{
				"value": "kgalui",
				"text": "Al KG Lui"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "atester",
				"text": "Alan aaTesting"
			},
			{
				"value": "kgalice5",
				"text": "Alice Developer"
			},
			{
				"value": "kgaloha",
				"text": "Aloha Test"
			},
			{
				"value": "kgtesting",
				"text": "aloha testing"
			},
			{
				"value": "kgalpana",
				"text": "Alpana Test"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "000adent",
				"text": "Arthur Dent"
			},
			{
				"value": "kgAPoddar",
				"text": "Arvind Poddar"
			},
			{
				"value": "kgat",
				"text": "at atat"
			},
			{
				"value": "kgatang",
				"text": "Aves Tang (sales)"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbeckya",
				"text": "Becky AndersonT1"
			},
			{
				"value": "kgbill5",
				"text": "Bill Shane"
			},
			{
				"value": "kgbboyle",
				"text": "Billy Garff Test"
			},
			{
				"value": "kgrmcb",
				"text": "Bobby McBride"
			},
			{
				"value": "kgboycet",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbmoss",
				"text": "Brandon Test"
			},
			{
				"value": "kgbrandonw",
				"text": "Brandon Wilson"
			},
			{
				"value": "NsBD",
				"text": "Breanna Dove"
			},
			{
				"value": "gfbbach",
				"text": "Brenda Bach"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgconnie",
				"text": "CC Test"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "kgcpackard",
				"text": "Christel Packard"
			},
			{
				"value": "kgchrisw",
				"text": "Christer Whitworth"
			},
			{
				"value": "kgCModien",
				"text": "Clint KG Modien"
			},
			{
				"value": "kgccameron",
				"text": "Cob Cameron"
			},
			{
				"value": "l10coryn",
				"text": "Cory Nannemann"
			},
			{
				"value": "kgedr2",
				"text": "Dallin DealerSocket"
			},
			{
				"value": "kgdmoon",
				"text": "Dallin Sprint"
			},
			{
				"value": "kgdgeddes",
				"text": "Dana Geddes"
			},
			{
				"value": "l10dadavis",
				"text": "Daniel Davis"
			},
			{
				"value": "kgDataEx",
				"text": "Data Export"
			},
			{
				"value": "kgHonda",
				"text": "Dealer User"
			},
			{
				"value": "kgdsauto1",
				"text": "DealerSocket Automation"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "l10ddavis",
				"text": "Derick Davis"
			},
			{
				"value": "drdesiree",
				"text": "Desiree Trevino"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "l10djacox",
				"text": "Doug Jacox"
			},
			{
				"value": "kgdougp",
				"text": "Doug Petersen"
			},
			{
				"value": "kgdraymond",
				"text": "Doug Raymond"
			},
			{
				"value": "kgDUseR",
				"text": "Dumb UserUserUserUserUserUserUserUserUserUserUserUs Use"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgernieh",
				"text": "Ernie Hasna"
			},
			{
				"value": "kgethan",
				"text": "Ethan Renner"
			},
			{
				"value": "kglongname",
				"text": "ExtremelyLongFirstName ExtremelyLongLastName"
			},
			{
				"value": "kgsomeone",
				"text": "First Name Last Name"
			},
			{
				"value": "kgfrankson",
				"text": "Frank Sonntag"
			},
			{
				"value": "kgflucero",
				"text": "Fred Lucero"
			},
			{
				"value": "kggenez",
				"text": "Gene Zdybowicz"
			},
			{
				"value": "kggsagen",
				"text": "George Sagen"
			},
			{
				"value": "kggsds",
				"text": "gs ds"
			},
			{
				"value": "kggsds2",
				"text": "gs2 ds2"
			},
			{
				"value": "kggsds3",
				"text": "gs3 ds3"
			},
			{
				"value": "GNhectorc",
				"text": "Hector Cisneros"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjackf",
				"text": "Jack Furbush"
			},
			{
				"value": "kgjfolker",
				"text": "Jacob Folkerson"
			},
			{
				"value": "kgjroyce",
				"text": "Jared Royce"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "GNjeand",
				"text": "Jean Daly"
			},
			{
				"value": "kgjillbowm",
				"text": "Jill Boman"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "kgjjj",
				"text": "jjj jjj"
			},
			{
				"value": "kgJJJJ",
				"text": "JJJJ JJJJ"
			},
			{
				"value": "kgjj",
				"text": "Joan Jones"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "kgjoeyb",
				"text": "Joey Burns"
			},
			{
				"value": "kgjforbes",
				"text": "John Forbes"
			},
			{
				"value": "gfjohns",
				"text": "John Sianava"
			},
			{
				"value": "kgjtester",
				"text": "Johnny Tester"
			},
			{
				"value": "kgjclarke1",
				"text": "Jon Clarke"
			},
			{
				"value": "kgjtang",
				"text": "Jon Tang (KG)"
			},
			{
				"value": "kgjclarke2",
				"text": "Jonathan Clarke"
			},
			{
				"value": "kgJ1Thomas",
				"text": "Jonathan Thomas"
			},
			{
				"value": "kgjgonzale",
				"text": "Jose Gonzalez"
			},
			{
				"value": "kgjoshl",
				"text": "Joshua Lucero"
			},
			{
				"value": "kgjulie5",
				"text": "Julie Blevo5"
			},
			{
				"value": "kgjuliei",
				"text": "Julie Issacson"
			},
			{
				"value": "juse7",
				"text": "justin tester"
			},
			{
				"value": "kgkgj",
				"text": "k gj"
			},
			{
				"value": "kgkjones",
				"text": "Kevin Jones"
			},
			{
				"value": "kg1",
				"text": "kg1 kg1"
			},
			{
				"value": "kgtest77",
				"text": "kg77test kglast"
			},
			{
				"value": "kghqa",
				"text": "kghqa kghqa"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "gfKrishna",
				"text": "Krishna A"
			},
			{
				"value": "kgkylebeck",
				"text": "Kyle Beckerman"
			},
			{
				"value": "kgstester",
				"text": "Lamar Thayne"
			},
			{
				"value": "lgoering",
				"text": "Larry Goering"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "lila",
				"text": "Lila Boudica"
			},
			{
				"value": "kglilak",
				"text": "Lila Knotwise"
			},
			{
				"value": "kgLLL",
				"text": "LLL LLL"
			},
			{
				"value": "kglorim",
				"text": "Lori McKee"
			},
			{
				"value": "kglucym",
				"text": "Lucy Monson"
			},
			{
				"value": "kgMLui",
				"text": "Main KG Lui"
			},
			{
				"value": "kgmgrqueue",
				"text": "Manager Queue"
			},
			{
				"value": "l10mdiaz",
				"text": "Marco Diaz"
			},
			{
				"value": "kgmm",
				"text": "Maria Mobo"
			},
			{
				"value": "kgmcecil",
				"text": "Marie Cecil"
			},
			{
				"value": "kgmfuentes",
				"text": "Marie Fuentes"
			},
			{
				"value": "kgmtarbet",
				"text": "Marissa Tarbet"
			},
			{
				"value": "kgmarkpb",
				"text": "Mark Bigler"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmlarson",
				"text": "Mark Larson"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmtest",
				"text": "Melody  Test"
			},
			{
				"value": "kgmelody",
				"text": "Melody C"
			},
			{
				"value": "mcecil",
				"text": "Melody Cecil"
			},
			{
				"value": "melodytest",
				"text": "Melody Test"
			},
			{
				"value": "l10mahsan",
				"text": "Mian Ahsan"
			},
			{
				"value": "l10mbeard",
				"text": "Michael Beard"
			},
			{
				"value": "kgmmontgom",
				"text": "Michelle Montgomery"
			},
			{
				"value": "michelle7",
				"text": "Michelle Seven"
			},
			{
				"value": "michelle6",
				"text": "Michelle Six"
			},
			{
				"value": "michellesp",
				"text": "Michelle Sprint"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kggreen",
				"text": "Milica Green"
			},
			{
				"value": "kgnusher",
				"text": "Nathan Usher"
			},
			{
				"value": "kgpcarroll",
				"text": "Patrick Carroll"
			},
			{
				"value": "kgppainter",
				"text": "Patty Painter"
			},
			{
				"value": "kgpaulw",
				"text": "Paul Warburton"
			},
			{
				"value": "kgpaula",
				"text": "Paula Sue"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "kgquser",
				"text": "QA User"
			},
			{
				"value": "kgquser1",
				"text": "QA User"
			},
			{
				"value": "kgQALui",
				"text": "QATEST KG Lui"
			},
			{
				"value": "kgqdebruyn",
				"text": "Quentin de Bruyn"
			},
			{
				"value": "kgrs",
				"text": "R S"
			},
			{
				"value": "kgraauto",
				"text": "Ra Automation"
			},
			{
				"value": "kgramobile",
				"text": "Ra Mobile"
			},
			{
				"value": "kgratest",
				"text": "Ra Test"
			},
			{
				"value": "kgrajesh",
				"text": "Rajesh Kgh Sprint"
			},
			{
				"value": "kgrajtest",
				"text": "Rajesh Test"
			},
			{
				"value": "kgtesttest",
				"text": "rara tata"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca AndersonT1"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "gnrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judson"
			},
			{
				"value": "RikiChar",
				"text": "Riki Char"
			},
			{
				"value": "Riki",
				"text": "Rikis Charc"
			},
			{
				"value": "kgringo",
				"text": "Ringo Delgado"
			},
			{
				"value": "kgrdttest",
				"text": "Rob Test"
			},
			{
				"value": "kgrtestmor",
				"text": "Robbi Tester"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrong",
				"text": "Ron Griffith"
			},
			{
				"value": "kgRTB1",
				"text": "RT Black1"
			},
			{
				"value": "kgrqa",
				"text": "Ryan QA"
			},
			{
				"value": "kgrtest",
				"text": "Ryan Test"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgSLui2",
				"text": "Sam KG Lui"
			},
			{
				"value": "kgspandey",
				"text": "Sanjeev Pandey"
			},
			{
				"value": "kgscast2",
				"text": "Sarah Castaneda"
			},
			{
				"value": "kgscast",
				"text": "Sarah Castantest"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsariahh",
				"text": "Sariah Heaton"
			},
			{
				"value": "lxSElgram",
				"text": "Scott Elgram"
			},
			{
				"value": "kgselgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgscottt",
				"text": "Scott Tanner"
			},
			{
				"value": "ljsallen",
				"text": "Sean Allen"
			},
			{
				"value": "kgswill",
				"text": "Selena Williams"
			},
			{
				"value": "kgsenedy",
				"text": "Senedy Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "ljsmartine",
				"text": "Simon Martinez"
			},
			{
				"value": "kgskylerp",
				"text": "Skyler Peterson"
			},
			{
				"value": "kgsocket",
				"text": "Socket Talker"
			},
			{
				"value": "SomeTest",
				"text": "SomeTest SomeTest"
			},
			{
				"value": "kgspacet ",
				"text": "Space Test"
			},
			{
				"value": "kgsprint",
				"text": "sprint test"
			},
			{
				"value": "kgsprint2",
				"text": "Sprint Test2"
			},
			{
				"value": "kgsthayne",
				"text": "stephan thayne"
			},
			{
				"value": "kgbigname",
				"text": "StephanTestLongFirstName StephanTestLongLastName"
			},
			{
				"value": "kgABCDEFGH",
				"text": "Stephen Lui"
			},
			{
				"value": "kgSLui",
				"text": "Steve KG Lui"
			},
			{
				"value": "l10SLui",
				"text": "Steve LHM Lui"
			},
			{
				"value": "tarakg",
				"text": "tara test"
			},
			{
				"value": "tara2kg",
				"text": "tara2 test"
			},
			{
				"value": "tara7kg",
				"text": "tara7 test7"
			},
			{
				"value": "kgtaylorc",
				"text": "Taylor Christensen"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgterryj",
				"text": "Terry Jensen"
			},
			{
				"value": "kgTest1305",
				"text": "Test 13-05 Test"
			},
			{
				"value": "fsub2b56f5",
				"text": "Test 35db4407-5017-42a3-a326-f48c3b2b56f5"
			},
			{
				"value": "notfsfrank",
				"text": "Test Frank"
			},
			{
				"value": "kgedrtest",
				"text": "Test Ken Garff Honda EDR"
			},
			{
				"value": "kgedradmin",
				"text": "Test Ken Garff Honda EDR Admin"
			},
			{
				"value": "kgvtest",
				"text": "test testV"
			},
			{
				"value": "testkgh",
				"text": "TestKGH TestKen"
			},
			{
				"value": "thaynetest",
				"text": "thayne tester"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgthomasa",
				"text": "Thomas Arts"
			},
			{
				"value": "tomtest",
				"text": "Thomas Knowlton"
			},
			{
				"value": "kgtaway",
				"text": "Throw Away"
			},
			{
				"value": "kgtienn",
				"text": "Tien Nguyen"
			},
			{
				"value": "CY3GWillen",
				"text": "Tim KG Lui"
			},
			{
				"value": "kgtqueue",
				"text": "TIM Queue"
			},
			{
				"value": "fs2TLui",
				"text": "Tom KG Lui"
			},
			{
				"value": "kgtristan",
				"text": "Tristan Cecil"
			},
			{
				"value": "kgTS02155",
				"text": "TS02155 TS02155"
			},
			{
				"value": "kgtylerb",
				"text": "Tyler Barker"
			},
			{
				"value": "kgTLui3",
				"text": "Tyler KG Lui"
			},
			{
				"value": "usr9269829",
				"text": "UI 9269829"
			},
			{
				"value": "usr9269729",
				"text": "UI test 9269729"
			},
			{
				"value": "kgUserTest",
				"text": "User Test"
			},
			{
				"value": "kgvarun",
				"text": "varun kumar"
			},
			{
				"value": "kgvauto",
				"text": "vauto vauto"
			},
			{
				"value": "kgvauto1",
				"text": "vauto vauto"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			},
			{
				"value": "kgyanderso",
				"text": "Ykceb Anderson"
			},
			{
				"value": "kgadamh",
				"text": "zAdam Harper"
			}
		],
		"SecondaryAssigned": [
			{
				"value": "ATest12321",
				"text": "$Test Aloha Aloha test"
			},
			{
				"value": "kganewman",
				"text": "Aaron Newman"
			},
			{
				"value": "kgabc",
				"text": "abc pqr"
			},
			{
				"value": "kgaharper",
				"text": "Adam HarperT2"
			},
			{
				"value": "kgalui",
				"text": "Al KG Lui"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "atester",
				"text": "Alan aaTesting"
			},
			{
				"value": "kgalice5",
				"text": "Alice Developer"
			},
			{
				"value": "kgaloha",
				"text": "Aloha Test"
			},
			{
				"value": "kgtesting",
				"text": "aloha testing"
			},
			{
				"value": "kgalpana",
				"text": "Alpana Test"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "000adent",
				"text": "Arthur Dent"
			},
			{
				"value": "kgAPoddar",
				"text": "Arvind Poddar"
			},
			{
				"value": "kgat",
				"text": "at atat"
			},
			{
				"value": "kgatang",
				"text": "Aves Tang (sales)"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbeckya",
				"text": "Becky AndersonT1"
			},
			{
				"value": "kgbill5",
				"text": "Bill Shane"
			},
			{
				"value": "kgbboyle",
				"text": "Billy Garff Test"
			},
			{
				"value": "kgrmcb",
				"text": "Bobby McBride"
			},
			{
				"value": "kgboycet",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbmoss",
				"text": "Brandon Test"
			},
			{
				"value": "kgbrandonw",
				"text": "Brandon Wilson"
			},
			{
				"value": "NsBD",
				"text": "Breanna Dove"
			},
			{
				"value": "gfbbach",
				"text": "Brenda Bach"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgconnie",
				"text": "CC Test"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "kgcpackard",
				"text": "Christel Packard"
			},
			{
				"value": "kgchrisw",
				"text": "Christer Whitworth"
			},
			{
				"value": "kgCModien",
				"text": "Clint KG Modien"
			},
			{
				"value": "kgccameron",
				"text": "Cob Cameron"
			},
			{
				"value": "l10coryn",
				"text": "Cory Nannemann"
			},
			{
				"value": "kgedr2",
				"text": "Dallin DealerSocket"
			},
			{
				"value": "kgdmoon",
				"text": "Dallin Sprint"
			},
			{
				"value": "kgdgeddes",
				"text": "Dana Geddes"
			},
			{
				"value": "l10dadavis",
				"text": "Daniel Davis"
			},
			{
				"value": "kgDataEx",
				"text": "Data Export"
			},
			{
				"value": "kgHonda",
				"text": "Dealer User"
			},
			{
				"value": "kgdsauto1",
				"text": "DealerSocket Automation"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "l10ddavis",
				"text": "Derick Davis"
			},
			{
				"value": "drdesiree",
				"text": "Desiree Trevino"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "l10djacox",
				"text": "Doug Jacox"
			},
			{
				"value": "kgdougp",
				"text": "Doug Petersen"
			},
			{
				"value": "kgdraymond",
				"text": "Doug Raymond"
			},
			{
				"value": "kgDUseR",
				"text": "Dumb UserUserUserUserUserUserUserUserUserUserUserUs Use"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgernieh",
				"text": "Ernie Hasna"
			},
			{
				"value": "kgethan",
				"text": "Ethan Renner"
			},
			{
				"value": "kglongname",
				"text": "ExtremelyLongFirstName ExtremelyLongLastName"
			},
			{
				"value": "kgsomeone",
				"text": "First Name Last Name"
			},
			{
				"value": "kgfrankson",
				"text": "Frank Sonntag"
			},
			{
				"value": "kgflucero",
				"text": "Fred Lucero"
			},
			{
				"value": "kggenez",
				"text": "Gene Zdybowicz"
			},
			{
				"value": "kggsagen",
				"text": "George Sagen"
			},
			{
				"value": "kggsds",
				"text": "gs ds"
			},
			{
				"value": "kggsds2",
				"text": "gs2 ds2"
			},
			{
				"value": "kggsds3",
				"text": "gs3 ds3"
			},
			{
				"value": "GNhectorc",
				"text": "Hector Cisneros"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjackf",
				"text": "Jack Furbush"
			},
			{
				"value": "kgjfolker",
				"text": "Jacob Folkerson"
			},
			{
				"value": "kgjroyce",
				"text": "Jared Royce"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "GNjeand",
				"text": "Jean Daly"
			},
			{
				"value": "kgjillbowm",
				"text": "Jill Boman"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "kgjjj",
				"text": "jjj jjj"
			},
			{
				"value": "kgJJJJ",
				"text": "JJJJ JJJJ"
			},
			{
				"value": "kgjj",
				"text": "Joan Jones"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "kgjoeyb",
				"text": "Joey Burns"
			},
			{
				"value": "kgjforbes",
				"text": "John Forbes"
			},
			{
				"value": "gfjohns",
				"text": "John Sianava"
			},
			{
				"value": "kgjtester",
				"text": "Johnny Tester"
			},
			{
				"value": "kgjclarke1",
				"text": "Jon Clarke"
			},
			{
				"value": "kgjtang",
				"text": "Jon Tang (KG)"
			},
			{
				"value": "kgjclarke2",
				"text": "Jonathan Clarke"
			},
			{
				"value": "kgJ1Thomas",
				"text": "Jonathan Thomas"
			},
			{
				"value": "kgjgonzale",
				"text": "Jose Gonzalez"
			},
			{
				"value": "kgjoshl",
				"text": "Joshua Lucero"
			},
			{
				"value": "kgjulie5",
				"text": "Julie Blevo5"
			},
			{
				"value": "kgjuliei",
				"text": "Julie Issacson"
			},
			{
				"value": "juse7",
				"text": "justin tester"
			},
			{
				"value": "kgkgj",
				"text": "k gj"
			},
			{
				"value": "kgkjones",
				"text": "Kevin Jones"
			},
			{
				"value": "kg1",
				"text": "kg1 kg1"
			},
			{
				"value": "kgtest77",
				"text": "kg77test kglast"
			},
			{
				"value": "kghqa",
				"text": "kghqa kghqa"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "gfKrishna",
				"text": "Krishna A"
			},
			{
				"value": "kgkylebeck",
				"text": "Kyle Beckerman"
			},
			{
				"value": "kgstester",
				"text": "Lamar Thayne"
			},
			{
				"value": "lgoering",
				"text": "Larry Goering"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "lila",
				"text": "Lila Boudica"
			},
			{
				"value": "kglilak",
				"text": "Lila Knotwise"
			},
			{
				"value": "kgLLL",
				"text": "LLL LLL"
			},
			{
				"value": "kglorim",
				"text": "Lori McKee"
			},
			{
				"value": "kglucym",
				"text": "Lucy Monson"
			},
			{
				"value": "kgMLui",
				"text": "Main KG Lui"
			},
			{
				"value": "kgmgrqueue",
				"text": "Manager Queue"
			},
			{
				"value": "l10mdiaz",
				"text": "Marco Diaz"
			},
			{
				"value": "kgmm",
				"text": "Maria Mobo"
			},
			{
				"value": "kgmcecil",
				"text": "Marie Cecil"
			},
			{
				"value": "kgmfuentes",
				"text": "Marie Fuentes"
			},
			{
				"value": "kgmtarbet",
				"text": "Marissa Tarbet"
			},
			{
				"value": "kgmarkpb",
				"text": "Mark Bigler"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmlarson",
				"text": "Mark Larson"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmtest",
				"text": "Melody  Test"
			},
			{
				"value": "kgmelody",
				"text": "Melody C"
			},
			{
				"value": "mcecil",
				"text": "Melody Cecil"
			},
			{
				"value": "melodytest",
				"text": "Melody Test"
			},
			{
				"value": "l10mahsan",
				"text": "Mian Ahsan"
			},
			{
				"value": "l10mbeard",
				"text": "Michael Beard"
			},
			{
				"value": "kgmmontgom",
				"text": "Michelle Montgomery"
			},
			{
				"value": "michelle7",
				"text": "Michelle Seven"
			},
			{
				"value": "michelle6",
				"text": "Michelle Six"
			},
			{
				"value": "michellesp",
				"text": "Michelle Sprint"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kggreen",
				"text": "Milica Green"
			},
			{
				"value": "kgnusher",
				"text": "Nathan Usher"
			},
			{
				"value": "kgpcarroll",
				"text": "Patrick Carroll"
			},
			{
				"value": "kgppainter",
				"text": "Patty Painter"
			},
			{
				"value": "kgpaulw",
				"text": "Paul Warburton"
			},
			{
				"value": "kgpaula",
				"text": "Paula Sue"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "kgquser",
				"text": "QA User"
			},
			{
				"value": "kgquser1",
				"text": "QA User"
			},
			{
				"value": "kgQALui",
				"text": "QATEST KG Lui"
			},
			{
				"value": "kgqdebruyn",
				"text": "Quentin de Bruyn"
			},
			{
				"value": "kgrs",
				"text": "R S"
			},
			{
				"value": "kgraauto",
				"text": "Ra Automation"
			},
			{
				"value": "kgramobile",
				"text": "Ra Mobile"
			},
			{
				"value": "kgratest",
				"text": "Ra Test"
			},
			{
				"value": "kgrajesh",
				"text": "Rajesh Kgh Sprint"
			},
			{
				"value": "kgrajtest",
				"text": "Rajesh Test"
			},
			{
				"value": "kgtesttest",
				"text": "rara tata"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca AndersonT1"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "gnrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judson"
			},
			{
				"value": "RikiChar",
				"text": "Riki Char"
			},
			{
				"value": "Riki",
				"text": "Rikis Charc"
			},
			{
				"value": "kgringo",
				"text": "Ringo Delgado"
			},
			{
				"value": "kgrdttest",
				"text": "Rob Test"
			},
			{
				"value": "kgrtestmor",
				"text": "Robbi Tester"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrong",
				"text": "Ron Griffith"
			},
			{
				"value": "kgRTB1",
				"text": "RT Black1"
			},
			{
				"value": "kgrqa",
				"text": "Ryan QA"
			},
			{
				"value": "kgrtest",
				"text": "Ryan Test"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgSLui2",
				"text": "Sam KG Lui"
			},
			{
				"value": "kgspandey",
				"text": "Sanjeev Pandey"
			},
			{
				"value": "kgscast2",
				"text": "Sarah Castaneda"
			},
			{
				"value": "kgscast",
				"text": "Sarah Castantest"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsariahh",
				"text": "Sariah Heaton"
			},
			{
				"value": "lxSElgram",
				"text": "Scott Elgram"
			},
			{
				"value": "kgselgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgscottt",
				"text": "Scott Tanner"
			},
			{
				"value": "ljsallen",
				"text": "Sean Allen"
			},
			{
				"value": "kgswill",
				"text": "Selena Williams"
			},
			{
				"value": "kgsenedy",
				"text": "Senedy Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "ljsmartine",
				"text": "Simon Martinez"
			},
			{
				"value": "kgskylerp",
				"text": "Skyler Peterson"
			},
			{
				"value": "kgsocket",
				"text": "Socket Talker"
			},
			{
				"value": "SomeTest",
				"text": "SomeTest SomeTest"
			},
			{
				"value": "kgspacet ",
				"text": "Space Test"
			},
			{
				"value": "kgsprint",
				"text": "sprint test"
			},
			{
				"value": "kgsprint2",
				"text": "Sprint Test2"
			},
			{
				"value": "kgsthayne",
				"text": "stephan thayne"
			},
			{
				"value": "kgbigname",
				"text": "StephanTestLongFirstName StephanTestLongLastName"
			},
			{
				"value": "kgABCDEFGH",
				"text": "Stephen Lui"
			},
			{
				"value": "kgSLui",
				"text": "Steve KG Lui"
			},
			{
				"value": "l10SLui",
				"text": "Steve LHM Lui"
			},
			{
				"value": "tarakg",
				"text": "tara test"
			},
			{
				"value": "tara2kg",
				"text": "tara2 test"
			},
			{
				"value": "tara7kg",
				"text": "tara7 test7"
			},
			{
				"value": "kgtaylorc",
				"text": "Taylor Christensen"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgterryj",
				"text": "Terry Jensen"
			},
			{
				"value": "kgTest1305",
				"text": "Test 13-05 Test"
			},
			{
				"value": "fsub2b56f5",
				"text": "Test 35db4407-5017-42a3-a326-f48c3b2b56f5"
			},
			{
				"value": "notfsfrank",
				"text": "Test Frank"
			},
			{
				"value": "kgedrtest",
				"text": "Test Ken Garff Honda EDR"
			},
			{
				"value": "kgedradmin",
				"text": "Test Ken Garff Honda EDR Admin"
			},
			{
				"value": "kgvtest",
				"text": "test testV"
			},
			{
				"value": "testkgh",
				"text": "TestKGH TestKen"
			},
			{
				"value": "thaynetest",
				"text": "thayne tester"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgthomasa",
				"text": "Thomas Arts"
			},
			{
				"value": "tomtest",
				"text": "Thomas Knowlton"
			},
			{
				"value": "kgtaway",
				"text": "Throw Away"
			},
			{
				"value": "kgtienn",
				"text": "Tien Nguyen"
			},
			{
				"value": "CY3GWillen",
				"text": "Tim KG Lui"
			},
			{
				"value": "kgtqueue",
				"text": "TIM Queue"
			},
			{
				"value": "fs2TLui",
				"text": "Tom KG Lui"
			},
			{
				"value": "kgtristan",
				"text": "Tristan Cecil"
			},
			{
				"value": "kgTS02155",
				"text": "TS02155 TS02155"
			},
			{
				"value": "kgtylerb",
				"text": "Tyler Barker"
			},
			{
				"value": "kgTLui3",
				"text": "Tyler KG Lui"
			},
			{
				"value": "usr9269829",
				"text": "UI 9269829"
			},
			{
				"value": "usr9269729",
				"text": "UI test 9269729"
			},
			{
				"value": "kgUserTest",
				"text": "User Test"
			},
			{
				"value": "kgvarun",
				"text": "varun kumar"
			},
			{
				"value": "kgvauto",
				"text": "vauto vauto"
			},
			{
				"value": "kgvauto1",
				"text": "vauto vauto"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			},
			{
				"value": "kgyanderso",
				"text": "Ykceb Anderson"
			},
			{
				"value": "kgadamh",
				"text": "zAdam Harper"
			}
		],
		"BDCAssigned": [
			{
				"value": "ATest12321",
				"text": "$Test Aloha Aloha test"
			},
			{
				"value": "kganewman",
				"text": "Aaron Newman"
			},
			{
				"value": "kgabc",
				"text": "abc pqr"
			},
			{
				"value": "kgaharper",
				"text": "Adam HarperT2"
			},
			{
				"value": "kgalui",
				"text": "Al KG Lui"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "atester",
				"text": "Alan aaTesting"
			},
			{
				"value": "kgalice5",
				"text": "Alice Developer"
			},
			{
				"value": "kgaloha",
				"text": "Aloha Test"
			},
			{
				"value": "kgtesting",
				"text": "aloha testing"
			},
			{
				"value": "kgalpana",
				"text": "Alpana Test"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "000adent",
				"text": "Arthur Dent"
			},
			{
				"value": "kgAPoddar",
				"text": "Arvind Poddar"
			},
			{
				"value": "kgat",
				"text": "at atat"
			},
			{
				"value": "kgatang",
				"text": "Aves Tang (sales)"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbeckya",
				"text": "Becky AndersonT1"
			},
			{
				"value": "kgbill5",
				"text": "Bill Shane"
			},
			{
				"value": "kgbboyle",
				"text": "Billy Garff Test"
			},
			{
				"value": "kgrmcb",
				"text": "Bobby McBride"
			},
			{
				"value": "kgboycet",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbmoss",
				"text": "Brandon Test"
			},
			{
				"value": "kgbrandonw",
				"text": "Brandon Wilson"
			},
			{
				"value": "NsBD",
				"text": "Breanna Dove"
			},
			{
				"value": "gfbbach",
				"text": "Brenda Bach"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgconnie",
				"text": "CC Test"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "kgcpackard",
				"text": "Christel Packard"
			},
			{
				"value": "kgchrisw",
				"text": "Christer Whitworth"
			},
			{
				"value": "kgCModien",
				"text": "Clint KG Modien"
			},
			{
				"value": "kgccameron",
				"text": "Cob Cameron"
			},
			{
				"value": "l10coryn",
				"text": "Cory Nannemann"
			},
			{
				"value": "kgedr2",
				"text": "Dallin DealerSocket"
			},
			{
				"value": "kgdmoon",
				"text": "Dallin Sprint"
			},
			{
				"value": "kgdgeddes",
				"text": "Dana Geddes"
			},
			{
				"value": "l10dadavis",
				"text": "Daniel Davis"
			},
			{
				"value": "kgDataEx",
				"text": "Data Export"
			},
			{
				"value": "kgHonda",
				"text": "Dealer User"
			},
			{
				"value": "kgdsauto1",
				"text": "DealerSocket Automation"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "l10ddavis",
				"text": "Derick Davis"
			},
			{
				"value": "drdesiree",
				"text": "Desiree Trevino"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "l10djacox",
				"text": "Doug Jacox"
			},
			{
				"value": "kgdougp",
				"text": "Doug Petersen"
			},
			{
				"value": "kgdraymond",
				"text": "Doug Raymond"
			},
			{
				"value": "kgDUseR",
				"text": "Dumb UserUserUserUserUserUserUserUserUserUserUserUs Use"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgernieh",
				"text": "Ernie Hasna"
			},
			{
				"value": "kgethan",
				"text": "Ethan Renner"
			},
			{
				"value": "kglongname",
				"text": "ExtremelyLongFirstName ExtremelyLongLastName"
			},
			{
				"value": "kgsomeone",
				"text": "First Name Last Name"
			},
			{
				"value": "kgfrankson",
				"text": "Frank Sonntag"
			},
			{
				"value": "kgflucero",
				"text": "Fred Lucero"
			},
			{
				"value": "kggenez",
				"text": "Gene Zdybowicz"
			},
			{
				"value": "kggsagen",
				"text": "George Sagen"
			},
			{
				"value": "kggsds",
				"text": "gs ds"
			},
			{
				"value": "kggsds2",
				"text": "gs2 ds2"
			},
			{
				"value": "kggsds3",
				"text": "gs3 ds3"
			},
			{
				"value": "GNhectorc",
				"text": "Hector Cisneros"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjackf",
				"text": "Jack Furbush"
			},
			{
				"value": "kgjfolker",
				"text": "Jacob Folkerson"
			},
			{
				"value": "kgjroyce",
				"text": "Jared Royce"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "GNjeand",
				"text": "Jean Daly"
			},
			{
				"value": "kgjillbowm",
				"text": "Jill Boman"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "kgjjj",
				"text": "jjj jjj"
			},
			{
				"value": "kgJJJJ",
				"text": "JJJJ JJJJ"
			},
			{
				"value": "kgjj",
				"text": "Joan Jones"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "kgjoeyb",
				"text": "Joey Burns"
			},
			{
				"value": "kgjforbes",
				"text": "John Forbes"
			},
			{
				"value": "gfjohns",
				"text": "John Sianava"
			},
			{
				"value": "kgjtester",
				"text": "Johnny Tester"
			},
			{
				"value": "kgjclarke1",
				"text": "Jon Clarke"
			},
			{
				"value": "kgjtang",
				"text": "Jon Tang (KG)"
			},
			{
				"value": "kgjclarke2",
				"text": "Jonathan Clarke"
			},
			{
				"value": "kgJ1Thomas",
				"text": "Jonathan Thomas"
			},
			{
				"value": "kgjgonzale",
				"text": "Jose Gonzalez"
			},
			{
				"value": "kgjoshl",
				"text": "Joshua Lucero"
			},
			{
				"value": "kgjulie5",
				"text": "Julie Blevo5"
			},
			{
				"value": "kgjuliei",
				"text": "Julie Issacson"
			},
			{
				"value": "juse7",
				"text": "justin tester"
			},
			{
				"value": "kgkgj",
				"text": "k gj"
			},
			{
				"value": "kgkjones",
				"text": "Kevin Jones"
			},
			{
				"value": "kg1",
				"text": "kg1 kg1"
			},
			{
				"value": "kgtest77",
				"text": "kg77test kglast"
			},
			{
				"value": "kghqa",
				"text": "kghqa kghqa"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "gfKrishna",
				"text": "Krishna A"
			},
			{
				"value": "kgkylebeck",
				"text": "Kyle Beckerman"
			},
			{
				"value": "kgstester",
				"text": "Lamar Thayne"
			},
			{
				"value": "lgoering",
				"text": "Larry Goering"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "lila",
				"text": "Lila Boudica"
			},
			{
				"value": "kglilak",
				"text": "Lila Knotwise"
			},
			{
				"value": "kgLLL",
				"text": "LLL LLL"
			},
			{
				"value": "kglorim",
				"text": "Lori McKee"
			},
			{
				"value": "kglucym",
				"text": "Lucy Monson"
			},
			{
				"value": "kgMLui",
				"text": "Main KG Lui"
			},
			{
				"value": "kgmgrqueue",
				"text": "Manager Queue"
			},
			{
				"value": "l10mdiaz",
				"text": "Marco Diaz"
			},
			{
				"value": "kgmm",
				"text": "Maria Mobo"
			},
			{
				"value": "kgmcecil",
				"text": "Marie Cecil"
			},
			{
				"value": "kgmfuentes",
				"text": "Marie Fuentes"
			},
			{
				"value": "kgmtarbet",
				"text": "Marissa Tarbet"
			},
			{
				"value": "kgmarkpb",
				"text": "Mark Bigler"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmlarson",
				"text": "Mark Larson"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmtest",
				"text": "Melody  Test"
			},
			{
				"value": "kgmelody",
				"text": "Melody C"
			},
			{
				"value": "mcecil",
				"text": "Melody Cecil"
			},
			{
				"value": "melodytest",
				"text": "Melody Test"
			},
			{
				"value": "l10mahsan",
				"text": "Mian Ahsan"
			},
			{
				"value": "l10mbeard",
				"text": "Michael Beard"
			},
			{
				"value": "kgmmontgom",
				"text": "Michelle Montgomery"
			},
			{
				"value": "michelle7",
				"text": "Michelle Seven"
			},
			{
				"value": "michelle6",
				"text": "Michelle Six"
			},
			{
				"value": "michellesp",
				"text": "Michelle Sprint"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kggreen",
				"text": "Milica Green"
			},
			{
				"value": "kgnusher",
				"text": "Nathan Usher"
			},
			{
				"value": "kgpcarroll",
				"text": "Patrick Carroll"
			},
			{
				"value": "kgppainter",
				"text": "Patty Painter"
			},
			{
				"value": "kgpaulw",
				"text": "Paul Warburton"
			},
			{
				"value": "kgpaula",
				"text": "Paula Sue"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "kgquser",
				"text": "QA User"
			},
			{
				"value": "kgquser1",
				"text": "QA User"
			},
			{
				"value": "kgQALui",
				"text": "QATEST KG Lui"
			},
			{
				"value": "kgqdebruyn",
				"text": "Quentin de Bruyn"
			},
			{
				"value": "kgrs",
				"text": "R S"
			},
			{
				"value": "kgraauto",
				"text": "Ra Automation"
			},
			{
				"value": "kgramobile",
				"text": "Ra Mobile"
			},
			{
				"value": "kgratest",
				"text": "Ra Test"
			},
			{
				"value": "kgrajesh",
				"text": "Rajesh Kgh Sprint"
			},
			{
				"value": "kgrajtest",
				"text": "Rajesh Test"
			},
			{
				"value": "kgtesttest",
				"text": "rara tata"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca AndersonT1"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "gnrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judson"
			},
			{
				"value": "RikiChar",
				"text": "Riki Char"
			},
			{
				"value": "Riki",
				"text": "Rikis Charc"
			},
			{
				"value": "kgringo",
				"text": "Ringo Delgado"
			},
			{
				"value": "kgrdttest",
				"text": "Rob Test"
			},
			{
				"value": "kgrtestmor",
				"text": "Robbi Tester"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrong",
				"text": "Ron Griffith"
			},
			{
				"value": "kgRTB1",
				"text": "RT Black1"
			},
			{
				"value": "kgrqa",
				"text": "Ryan QA"
			},
			{
				"value": "kgrtest",
				"text": "Ryan Test"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgSLui2",
				"text": "Sam KG Lui"
			},
			{
				"value": "kgspandey",
				"text": "Sanjeev Pandey"
			},
			{
				"value": "kgscast2",
				"text": "Sarah Castaneda"
			},
			{
				"value": "kgscast",
				"text": "Sarah Castantest"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsariahh",
				"text": "Sariah Heaton"
			},
			{
				"value": "lxSElgram",
				"text": "Scott Elgram"
			},
			{
				"value": "kgselgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgscottt",
				"text": "Scott Tanner"
			},
			{
				"value": "ljsallen",
				"text": "Sean Allen"
			},
			{
				"value": "kgswill",
				"text": "Selena Williams"
			},
			{
				"value": "kgsenedy",
				"text": "Senedy Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "ljsmartine",
				"text": "Simon Martinez"
			},
			{
				"value": "kgskylerp",
				"text": "Skyler Peterson"
			},
			{
				"value": "kgsocket",
				"text": "Socket Talker"
			},
			{
				"value": "SomeTest",
				"text": "SomeTest SomeTest"
			},
			{
				"value": "kgspacet ",
				"text": "Space Test"
			},
			{
				"value": "kgsprint",
				"text": "sprint test"
			},
			{
				"value": "kgsprint2",
				"text": "Sprint Test2"
			},
			{
				"value": "kgsthayne",
				"text": "stephan thayne"
			},
			{
				"value": "kgbigname",
				"text": "StephanTestLongFirstName StephanTestLongLastName"
			},
			{
				"value": "kgABCDEFGH",
				"text": "Stephen Lui"
			},
			{
				"value": "kgSLui",
				"text": "Steve KG Lui"
			},
			{
				"value": "l10SLui",
				"text": "Steve LHM Lui"
			},
			{
				"value": "tarakg",
				"text": "tara test"
			},
			{
				"value": "tara2kg",
				"text": "tara2 test"
			},
			{
				"value": "tara7kg",
				"text": "tara7 test7"
			},
			{
				"value": "kgtaylorc",
				"text": "Taylor Christensen"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgterryj",
				"text": "Terry Jensen"
			},
			{
				"value": "kgTest1305",
				"text": "Test 13-05 Test"
			},
			{
				"value": "fsub2b56f5",
				"text": "Test 35db4407-5017-42a3-a326-f48c3b2b56f5"
			},
			{
				"value": "notfsfrank",
				"text": "Test Frank"
			},
			{
				"value": "kgedrtest",
				"text": "Test Ken Garff Honda EDR"
			},
			{
				"value": "kgedradmin",
				"text": "Test Ken Garff Honda EDR Admin"
			},
			{
				"value": "kgvtest",
				"text": "test testV"
			},
			{
				"value": "testkgh",
				"text": "TestKGH TestKen"
			},
			{
				"value": "thaynetest",
				"text": "thayne tester"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgthomasa",
				"text": "Thomas Arts"
			},
			{
				"value": "tomtest",
				"text": "Thomas Knowlton"
			},
			{
				"value": "kgtaway",
				"text": "Throw Away"
			},
			{
				"value": "kgtienn",
				"text": "Tien Nguyen"
			},
			{
				"value": "CY3GWillen",
				"text": "Tim KG Lui"
			},
			{
				"value": "kgtqueue",
				"text": "TIM Queue"
			},
			{
				"value": "fs2TLui",
				"text": "Tom KG Lui"
			},
			{
				"value": "kgtristan",
				"text": "Tristan Cecil"
			},
			{
				"value": "kgTS02155",
				"text": "TS02155 TS02155"
			},
			{
				"value": "kgtylerb",
				"text": "Tyler Barker"
			},
			{
				"value": "kgTLui3",
				"text": "Tyler KG Lui"
			},
			{
				"value": "usr9269829",
				"text": "UI 9269829"
			},
			{
				"value": "usr9269729",
				"text": "UI test 9269729"
			},
			{
				"value": "kgUserTest",
				"text": "User Test"
			},
			{
				"value": "kgvarun",
				"text": "varun kumar"
			},
			{
				"value": "kgvauto",
				"text": "vauto vauto"
			},
			{
				"value": "kgvauto1",
				"text": "vauto vauto"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			},
			{
				"value": "kgyanderso",
				"text": "Ykceb Anderson"
			},
			{
				"value": "kgadamh",
				"text": "zAdam Harper"
			}
		],
		"ResolutionCode1": [
			{
				"value": "1004510",
				"text": "Future Interest"
			},
			{
				"value": "290",
				"text": "Price/Value"
			},
			{
				"value": "291",
				"text": "Fit/Features"
			},
			{
				"value": "292",
				"text": "Selling Skills"
			},
			{
				"value": "295",
				"text": "No Response"
			},
			{
				"value": "296",
				"text": "Disqualified"
			},
			{
				"value": "297",
				"text": "Lost To Competitor"
			},
			{
				"value": "298",
				"text": "Other"
			},
			{
				"value": "200084",
				"text": "Turned to BDC"
			},
			{
				"value": "1009547",
				"text": "Not Owner"
			},
			{
				"value": "1009567",
				"text": "Looking for New Car"
			},
			{
				"value": "1009568",
				"text": "Looking for Used Car"
			},
			{
				"value": "1009569",
				"text": "Should be Parts Lead"
			},
			{
				"value": "1009570",
				"text": "Should be Service Lead"
			}
		],
		"ResolutionCode2": {
			"290": [
				{
					"value": "320",
					"text": "Discount"
				},
				{
					"value": "321",
					"text": "Monthly Payment"
				},
				{
					"value": "322",
					"text": "Down Payment"
				},
				{
					"value": "323",
					"text": "Finance/Lease Rate"
				},
				{
					"value": "324",
					"text": "Trade In"
				}
			],
			"291": [
				{
					"value": "364",
					"text": "Performance"
				},
				{
					"value": "365",
					"text": "Economy"
				},
				{
					"value": "366",
					"text": "Safety"
				},
				{
					"value": "327",
					"text": "Color"
				},
				{
					"value": "328",
					"text": "Options"
				},
				{
					"value": "325",
					"text": "Availability"
				},
				{
					"value": "326",
					"text": "Package"
				},
				{
					"value": "329",
					"text": "Model"
				},
				{
					"value": "363",
					"text": "Brand"
				}
			],
			"292": [
				{
					"value": "370",
					"text": "Relationship"
				},
				{
					"value": "371",
					"text": "Follow Up"
				},
				{
					"value": "372",
					"text": "Objections"
				}
			],
			"296": [
				{
					"value": "380",
					"text": "Budget"
				},
				{
					"value": "381",
					"text": "Bad Credit"
				},
				{
					"value": "382",
					"text": "Negative Equity"
				}
			],
			"297": [
				{
					"value": "367",
					"text": "Same Make"
				},
				{
					"value": "368",
					"text": "Other Make"
				}
			],
			"298": [
				{
					"value": "200368",
					"text": "Invalid Number"
				},
				{
					"value": "200369",
					"text": "Invalid Email"
				},
				{
					"value": "200370",
					"text": "Not in Market"
				},
				{
					"value": "1004560",
					"text": "Do Not Contact"
				},
				{
					"value": "1004561",
					"text": "No Way to Contact"
				},
				{
					"value": "1004562",
					"text": "Non Sales Lead"
				},
				{
					"value": "1004563",
					"text": "Nothing Can be Done"
				}
			],
			"200084": [
				{
					"value": "200086",
					"text": "Hot"
				},
				{
					"value": "200087",
					"text": "Medium"
				},
				{
					"value": "200088",
					"text": "Cold"
				}
			],
			"200400": [
				{
					"value": "200401",
					"text": "Bad Contact"
				},
				{
					"value": "200402",
					"text": "Bad Phone #"
				},
				{
					"value": "200403",
					"text": "Bad Email"
				}
			]
		},
		"StatusSteps": [
			{
				"value": "220",
				"text": "0 - Unqualified"
			},
			{
				"value": "221",
				"text": "1 - Up/Contacted"
			},
			{
				"value": "227",
				"text": "2 - Store Visit"
			},
			{
				"value": "222",
				"text": "3 - Demo Vehicle"
			},
			{
				"value": "223",
				"text": "4 - Write-Up"
			},
			{
				"value": "224",
				"text": "5 - Pending F&I"
			},
			{
				"value": "228"
			},
			{
				"value": "225",
				"text": "6 - Sold"
			},
			{
				"value": "226",
				"text": "7 - Lost"
			}
		],
		"Franchises": [
			{
				"value": "29",
				"text": "Acura Franchise1"
			},
			{
				"value": "8",
				"text": "Ken Garff Honda"
			}
		]
	};

/***/ },

/***/ 869:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var socialMediaSuccessJson = __webpack_require__(870);
	var SocialMedia = (function () {
	    function SocialMedia() {
	    }
	    SocialMedia.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        // /shim/socialMedia - Successfull call, this passed that the social media was updated
	        var socialMediaSuccess = '/shim/socialMedia';
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + socialMediaSuccess)).respond(function (method, url, data, headers) {
	            return [200, socialMediaSuccessJson];
	        });
	    };
	    return SocialMedia;
	}());
	module.exports = SocialMedia;


/***/ },

/***/ 870:
/***/ function(module, exports) {

	module.exports = {
		"Success": "SocialMedia was Updated"
	};

/***/ },

/***/ 871:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var ssnSuccessJson = __webpack_require__(872);
	var SSN = (function () {
	    function SSN() {
	    }
	    SSN.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        // /shim/SSN - Successfull call, this passed that the SSN was updated
	        var ssnSuccess = '/shim/ssn';
	        $httpBackend.whenDELETE(new RegExp(shimBaseUrlRegex.source + ssnSuccess)).respond(function (method, url, data, headers) {
	            return [200, ssnSuccessJson];
	        });
	    };
	    return SSN;
	}());
	module.exports = SSN;


/***/ },

/***/ 872:
/***/ function(module, exports) {

	module.exports = {
		"Success": "SSN was updated"
	};

/***/ },

/***/ 873:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var connectionTypesJson = __webpack_require__(874);
	var organizationJson = __webpack_require__(875);
	var apiRefDefsJson = __webpack_require__(876);
	var RefDefs = (function () {
	    function RefDefs() {
	    }
	    RefDefs.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var connectionTypesEndpoint = /\/shim\/RefDefs\/ConnectionTypes/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + connectionTypesEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, connectionTypesJson];
	        });
	        var organizationRefs = /\/shim\/RefDefs\/Organization/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + organizationRefs.source)).respond(function (method, url, data, headers) {
	            return [200, organizationJson];
	        });
	        var apiRefDefs = /\/refDef\/getRefDefs/;
	        $httpBackend.whenPOST(apiRefDefs).respond(function (method, url, data, headers) {
	            return [200, apiRefDefsJson];
	        });
	    };
	    return RefDefs;
	}());
	module.exports = RefDefs;


/***/ },

/***/ 874:
/***/ function(module, exports) {

	module.exports = {
		"Types": [
			{
				"value": "200",
				"text": "Family Member"
			},
			{
				"value": "201",
				"text": "Friend"
			},
			{
				"value": "199",
				"text": "Co-Buyer"
			},
			{
				"value": "216",
				"text": "Driver"
			},
			{
				"value": "214",
				"text": "Dealership (Internal)"
			},
			{
				"value": "203",
				"text": "Employee (External)"
			},
			{
				"value": "211",
				"text": "Subsidiary/Parent"
			},
			{
				"value": "212",
				"text": "Vendor"
			},
			{
				"value": "213",
				"text": "Partner"
			},
			{
				"value": "215",
				"text": "Manufacturer"
			}
		],
		"SubTypes": {
			"199": [
				{
					"value": "943",
					"text": "Cash"
				},
				{
					"value": "944",
					"text": "Credit"
				},
				{
					"value": "945",
					"text": "Emotional"
				}
			],
			"200": [
				{
					"value": "616",
					"text": "Spouse"
				},
				{
					"value": "612",
					"text": "Father"
				},
				{
					"value": "613",
					"text": "Mother"
				},
				{
					"value": "610",
					"text": "Son"
				},
				{
					"value": "611",
					"text": "Daughter"
				},
				{
					"value": "618",
					"text": "Sister/Brother"
				},
				{
					"value": "614",
					"text": "Cousin"
				},
				{
					"value": "615",
					"text": "Aunt/Uncle"
				},
				{
					"value": "617",
					"text": "Niece/Nephew"
				},
				{
					"value": "619",
					"text": "Grandparnet"
				},
				{
					"value": "620",
					"text": "Step Parent"
				}
			],
			"201": [
				{
					"value": "946",
					"text": "Work"
				},
				{
					"value": "947",
					"text": "Family"
				},
				{
					"value": "950",
					"text": "Influencer"
				},
				{
					"value": "949",
					"text": "Athletic"
				},
				{
					"value": "948",
					"text": "Church"
				},
				{
					"value": "951",
					"text": "Other"
				}
			],
			"203": [
				{
					"value": "621",
					"text": "President"
				},
				{
					"value": "622",
					"text": "Vice President"
				},
				{
					"value": "623",
					"text": "Chief Executive Office"
				},
				{
					"value": "624",
					"text": "Chief Financial Officer"
				},
				{
					"value": "625",
					"text": "Chief Information Officer"
				},
				{
					"value": "626",
					"text": "Principal"
				},
				{
					"value": "627",
					"text": "Marketing"
				},
				{
					"value": "628",
					"text": "Sales"
				},
				{
					"value": "630",
					"text": "Service"
				},
				{
					"value": "631",
					"text": "Support"
				},
				{
					"value": "632",
					"text": "Quality Assurance"
				},
				{
					"value": "633",
					"text": "Business Development"
				},
				{
					"value": "629",
					"text": "Product Manager"
				}
			],
			"211": [],
			"212": [],
			"213": [],
			"214": [
				{
					"value": "937",
					"text": "General Manager"
				},
				{
					"value": "923",
					"text": "Sales Manager"
				},
				{
					"value": "924",
					"text": "Sales Person"
				},
				{
					"value": "921",
					"text": "Service Manager"
				},
				{
					"value": "922",
					"text": "Service Writer/Advisor"
				},
				{
					"value": "942",
					"text": "Service Technician"
				},
				{
					"value": "939",
					"text": "F&I"
				},
				{
					"value": "938",
					"text": "BDC/Customer Care"
				},
				{
					"value": "940",
					"text": "Parts"
				},
				{
					"value": "920",
					"text": "Lead Source"
				},
				{
					"value": "941",
					"text": "Other"
				}
			],
			"215": [],
			"216": [
				{
					"value": "952",
					"text": "Primary"
				},
				{
					"value": "953",
					"text": "Secondary"
				}
			]
		}
	};

/***/ },

/***/ 875:
/***/ function(module, exports) {

	module.exports = {
		"ContactType": [
			{
				"value": "1000",
				"text": "Prospect"
			},
			{
				"value": "1001",
				"text": "Customer"
			},
			{
				"value": "1002",
				"text": "Vendor"
			},
			{
				"value": "1004",
				"text": "Partner"
			}
		],
		"Source": [
			{
				"value": "1011",
				"text": "Walk In"
			},
			{
				"value": "1012",
				"text": "Web"
			},
			{
				"value": "1013",
				"text": "General Referral"
			},
			{
				"value": "1014",
				"text": "Sales Floor Referral"
			},
			{
				"value": "1015",
				"text": "Service Referral"
			},
			{
				"value": "1021",
				"text": "Contact Referral"
			},
			{
				"value": "1017",
				"text": "Dealer Mgmt Sys"
			},
			{
				"value": "1018",
				"text": "List Import"
			},
			{
				"value": "1019",
				"text": "Manufacturer"
			},
			{
				"value": "1020",
				"text": "Phone"
			},
			{
				"value": "200032",
				"text": "Ext Warranty Purchased"
			},
			{
				"value": "200078",
				"text": "SVC Coupon"
			}
		],
		"Status": [
			{
				"value": "328",
				"text": "Active"
			},
			{
				"value": "330",
				"text": "Inactive"
			}
		]
	};

/***/ },

/***/ 876:
/***/ function(module, exports) {

	module.exports = [
		{
			"key": "vehicle.drive",
			"refList": [
				{
					"value": "100146",
					"text": "2 Wheel"
				},
				{
					"value": "100147",
					"text": "4 Wheel"
				},
				{
					"value": "100148",
					"text": "All Wheel"
				}
			]
		},
		{
			"key": "contact.type",
			"refList": [
				{
					"value": "200",
					"text": "Family Member"
				},
				{
					"value": "201",
					"text": "Friend"
				},
				{
					"value": "199",
					"text": "Co-Buyer"
				},
				{
					"value": "216",
					"text": "Driver"
				},
				{
					"value": "214",
					"text": "Dealership (Internal)"
				},
				{
					"value": "203",
					"text": "Employee (External)"
				},
				{
					"value": "211",
					"text": "Subsidiary/Parent"
				},
				{
					"value": "212",
					"text": "Vendor"
				},
				{
					"value": "213",
					"text": "Partner"
				},
				{
					"value": "215",
					"text": "Manufacturer"
				}
			],
			"subRefList": [
				{
					"key": "200",
					"refList": [
						{
							"value": "610",
							"text": "Son"
						},
						{
							"value": "610",
							"text": "Son"
						},
						{
							"value": "611",
							"text": "Daughter"
						},
						{
							"value": "611",
							"text": "Daughter"
						},
						{
							"value": "612",
							"text": "Father"
						},
						{
							"value": "612",
							"text": "Father"
						},
						{
							"value": "613",
							"text": "Mother"
						},
						{
							"value": "613",
							"text": "Mother"
						},
						{
							"value": "614",
							"text": "Cousin"
						},
						{
							"value": "614",
							"text": "Cousin"
						},
						{
							"value": "615",
							"text": "Aunt/Uncle"
						},
						{
							"value": "615",
							"text": "Aunt/Uncle"
						},
						{
							"value": "616",
							"text": "Spouse"
						},
						{
							"value": "616",
							"text": "Spouse"
						},
						{
							"value": "617",
							"text": "Niece/Nephew"
						},
						{
							"value": "617",
							"text": "Niece/Nephew"
						},
						{
							"value": "618",
							"text": "Sister/Brother"
						},
						{
							"value": "618",
							"text": "Sister/Brother"
						},
						{
							"value": "619",
							"text": "Grandparnet"
						},
						{
							"value": "619",
							"text": "Grandparnet"
						},
						{
							"value": "620",
							"text": "Step Parent"
						},
						{
							"value": "620",
							"text": "Step Parent"
						}
					],
					"subRefList": []
				},
				{
					"key": "201",
					"refList": [
						{
							"value": "946",
							"text": "Work"
						},
						{
							"value": "946",
							"text": "Work"
						},
						{
							"value": "947",
							"text": "Family"
						},
						{
							"value": "947",
							"text": "Family"
						},
						{
							"value": "948",
							"text": "Church"
						},
						{
							"value": "948",
							"text": "Church"
						},
						{
							"value": "949",
							"text": "Athletic"
						},
						{
							"value": "949",
							"text": "Athletic"
						},
						{
							"value": "950",
							"text": "Influencer"
						},
						{
							"value": "950",
							"text": "Influencer"
						},
						{
							"value": "951",
							"text": "Other"
						},
						{
							"value": "951",
							"text": "Other"
						}
					],
					"subRefList": []
				},
				{
					"key": "199",
					"refList": [
						{
							"value": "943",
							"text": "Cash"
						},
						{
							"value": "943",
							"text": "Cash"
						},
						{
							"value": "944",
							"text": "Credit"
						},
						{
							"value": "944",
							"text": "Credit"
						},
						{
							"value": "945",
							"text": "Emotional"
						},
						{
							"value": "945",
							"text": "Emotional"
						}
					],
					"subRefList": []
				},
				{
					"key": "216",
					"refList": [
						{
							"value": "952",
							"text": "Primary"
						},
						{
							"value": "952",
							"text": "Primary"
						},
						{
							"value": "953",
							"text": "Secondary"
						},
						{
							"value": "953",
							"text": "Secondary"
						}
					],
					"subRefList": []
				},
				{
					"key": "214",
					"refList": [
						{
							"value": "920",
							"text": "Lead Source"
						},
						{
							"value": "920",
							"text": "Lead Source"
						},
						{
							"value": "921",
							"text": "Service Manager"
						},
						{
							"value": "921",
							"text": "Service Manager"
						},
						{
							"value": "922",
							"text": "Service Writer/Advisor"
						},
						{
							"value": "922",
							"text": "Service Writer/Advisor"
						},
						{
							"value": "923",
							"text": "Sales Manager"
						},
						{
							"value": "923",
							"text": "Sales Manager"
						},
						{
							"value": "924",
							"text": "Sales Person"
						},
						{
							"value": "924",
							"text": "Sales Person"
						},
						{
							"value": "937",
							"text": "General Manager"
						},
						{
							"value": "937",
							"text": "General Manager"
						},
						{
							"value": "938",
							"text": "BDC/Customer Care"
						},
						{
							"value": "938",
							"text": "BDC/Customer Care"
						},
						{
							"value": "939",
							"text": "F&I"
						},
						{
							"value": "939",
							"text": "F&I"
						},
						{
							"value": "940",
							"text": "Parts"
						},
						{
							"value": "940",
							"text": "Parts"
						},
						{
							"value": "941",
							"text": "Other"
						},
						{
							"value": "941",
							"text": "Other"
						},
						{
							"value": "942",
							"text": "Service Technician"
						},
						{
							"value": "942",
							"text": "Service Technician"
						}
					],
					"subRefList": []
				},
				{
					"key": "203",
					"refList": [
						{
							"value": "621",
							"text": "President"
						},
						{
							"value": "621",
							"text": "President"
						},
						{
							"value": "622",
							"text": "Vice President"
						},
						{
							"value": "622",
							"text": "Vice President"
						},
						{
							"value": "623",
							"text": "Chief Executive Office"
						},
						{
							"value": "623",
							"text": "Chief Executive Office"
						},
						{
							"value": "624",
							"text": "Chief Financial Officer"
						},
						{
							"value": "624",
							"text": "Chief Financial Officer"
						},
						{
							"value": "625",
							"text": "Chief Information Officer"
						},
						{
							"value": "625",
							"text": "Chief Information Officer"
						},
						{
							"value": "626",
							"text": "Principal"
						},
						{
							"value": "626",
							"text": "Principal"
						},
						{
							"value": "627",
							"text": "Marketing"
						},
						{
							"value": "627",
							"text": "Marketing"
						},
						{
							"value": "628",
							"text": "Sales"
						},
						{
							"value": "628",
							"text": "Sales"
						},
						{
							"value": "629",
							"text": "Product Manager"
						},
						{
							"value": "629",
							"text": "Product Manager"
						},
						{
							"value": "630",
							"text": "Service"
						},
						{
							"value": "630",
							"text": "Service"
						},
						{
							"value": "631",
							"text": "Support"
						},
						{
							"value": "631",
							"text": "Support"
						},
						{
							"value": "632",
							"text": "Quality Assurance"
						},
						{
							"value": "632",
							"text": "Quality Assurance"
						},
						{
							"value": "633",
							"text": "Business Development"
						},
						{
							"value": "633",
							"text": "Business Development"
						}
					],
					"subRefList": []
				},
				{
					"key": "211",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "212",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "213",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "215",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "company.type",
			"refList": [
				{
					"value": "1000",
					"text": "Prospect"
				},
				{
					"value": "1001",
					"text": "Customer"
				},
				{
					"value": "1002",
					"text": "Vendor"
				},
				{
					"value": "1004",
					"text": "Partner"
				}
			],
			"subRefList": [
				{
					"key": "1000",
					"refList": [
						{
							"value": "700",
							"text": "Hot (1-3 weeks)"
						},
						{
							"value": "701",
							"text": "Medium (4-6 weeks)"
						},
						{
							"value": "702",
							"text": "Cold (3-6 months)"
						}
					],
					"subRefList": []
				},
				{
					"key": "1001",
					"refList": [
						{
							"value": "705",
							"text": "Platinum"
						},
						{
							"value": "706",
							"text": "Gold"
						},
						{
							"value": "707",
							"text": "Silver"
						},
						{
							"value": "708",
							"text": "Bronze"
						}
					],
					"subRefList": []
				},
				{
					"key": "1002",
					"refList": [
						{
							"value": "709",
							"text": "Distributor"
						},
						{
							"value": "710",
							"text": "Retail"
						},
						{
							"value": "711",
							"text": "Professional Services"
						},
						{
							"value": "712",
							"text": "Manufacturer"
						},
						{
							"value": "713",
							"text": "Marketing"
						}
					],
					"subRefList": []
				},
				{
					"key": "1004",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "company.source",
			"refList": [
				{
					"value": "1011",
					"text": "Walk In"
				},
				{
					"value": "1012",
					"text": "Web"
				},
				{
					"value": "1013",
					"text": "General Referral"
				},
				{
					"value": "1014",
					"text": "Sales Floor Referral"
				},
				{
					"value": "1015",
					"text": "Service Referral"
				},
				{
					"value": "1021",
					"text": "Contact Referral"
				},
				{
					"value": "1017",
					"text": "Dealer Mgmt Sys"
				},
				{
					"value": "1018",
					"text": "List Import"
				},
				{
					"value": "1019",
					"text": "Manufacturer"
				},
				{
					"value": "1020",
					"text": "Phone"
				},
				{
					"value": "200032",
					"text": "Ext Warranty Purchased"
				},
				{
					"value": "200078",
					"text": "SVC Coupon"
				}
			],
			"subRefList": [
				{
					"key": "1011",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1012",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1013",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1014",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1015",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1021",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1017",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1018",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1019",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1020",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200032",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200078",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "company.income",
			"refList": [
				{
					"value": "599",
					"text": "Blank"
				},
				{
					"value": "606",
					"text": "Under $5 Million"
				},
				{
					"value": "600",
					"text": "$5 - 10 Million"
				},
				{
					"value": "601",
					"text": "$11 - 25 Million"
				},
				{
					"value": "602",
					"text": "$26 - 50 Million"
				},
				{
					"value": "603",
					"text": "$51 - 100 Million"
				},
				{
					"value": "604",
					"text": "$101 - 200 Million"
				},
				{
					"value": "605",
					"text": "$201 - 500 Million"
				},
				{
					"value": "607",
					"text": "$500 - 1 Billion"
				},
				{
					"value": "608",
					"text": "Over $1 Billion"
				}
			],
			"subRefList": [
				{
					"key": "599",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "606",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "600",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "601",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "602",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "603",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "604",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "605",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "607",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "608",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "company.noemp",
			"refList": [
				{
					"value": "500",
					"text": "Under 100"
				},
				{
					"value": "501",
					"text": "101 - 250"
				},
				{
					"value": "502",
					"text": "251 - 500"
				},
				{
					"value": "503",
					"text": "Over 500"
				}
			],
			"subRefList": [
				{
					"key": "500",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "501",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "502",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "503",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "company.status",
			"refList": [
				{
					"value": "328",
					"text": "Active"
				},
				{
					"value": "330",
					"text": "Inactive"
				}
			],
			"subRefList": [
				{
					"key": "328",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "330",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "industry.types",
			"refList": [
				{
					"value": "270",
					"text": "Manufacturing"
				},
				{
					"value": "271",
					"text": "Wholesale/Retail"
				},
				{
					"value": "272",
					"text": "High-Tech"
				},
				{
					"value": "273",
					"text": "Financial Services"
				},
				{
					"value": "274",
					"text": "Insurance"
				},
				{
					"value": "275",
					"text": "Telecommunications"
				},
				{
					"value": "276",
					"text": "General Services"
				},
				{
					"value": "277",
					"text": "Health-care"
				},
				{
					"value": "278",
					"text": "Consumer Products"
				},
				{
					"value": "279",
					"text": "Shipping/Delivery"
				},
				{
					"value": "280",
					"text": "Automotive"
				},
				{
					"value": "281",
					"text": "Government"
				},
				{
					"value": "282",
					"text": "Unknown"
				}
			],
			"subRefList": [
				{
					"key": "270",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "271",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "272",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "273",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "274",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "275",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "276",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "277",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "278",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "279",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "280",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "281",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "282",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "individual.salutation",
			"refList": [
				{
					"value": "101",
					"text": "Mr."
				},
				{
					"value": "102",
					"text": "Ms."
				},
				{
					"value": "103",
					"text": "Mrs."
				},
				{
					"value": "104",
					"text": "Dr."
				}
			],
			"subRefList": [
				{
					"key": "101",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "103",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "104",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "individual.source",
			"refList": [
				{
					"value": "1002850",
					"text": "Fresh Up"
				},
				{
					"value": "1002851",
					"text": "Phone Up"
				},
				{
					"value": "1002",
					"text": "Web"
				},
				{
					"value": "1002853",
					"text": "Repeat Cust"
				},
				{
					"value": "1002854",
					"text": "Referral"
				},
				{
					"value": "1007",
					"text": "Dealer Mgmt Sys"
				},
				{
					"value": "1002855",
					"text": "Marketing/Biz Rule"
				},
				{
					"value": "1002856",
					"text": "Lease Return"
				},
				{
					"value": "1002857",
					"text": "History Import"
				},
				{
					"value": "1002923",
					"text": "CoBuyer"
				}
			],
			"subRefList": [
				{
					"key": "1002850",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002851",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002",
					"refList": [
						{
							"value": "709",
							"text": "Distributor"
						},
						{
							"value": "710",
							"text": "Retail"
						},
						{
							"value": "711",
							"text": "Professional Services"
						},
						{
							"value": "712",
							"text": "Manufacturer"
						},
						{
							"value": "713",
							"text": "Marketing"
						}
					],
					"subRefList": []
				},
				{
					"key": "1002853",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002854",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1007",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002855",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002856",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002857",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002923",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "individual.status",
			"refList": [
				{
					"value": "328",
					"text": "Active"
				},
				{
					"value": "330",
					"text": "Inactive"
				}
			],
			"subRefList": [
				{
					"key": "328",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "330",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "individual.income",
			"refList": [
				{
					"value": "109",
					"text": "Blank"
				},
				{
					"value": "110",
					"text": "10,000-20,000"
				},
				{
					"value": "111",
					"text": "21,000-50,000"
				},
				{
					"value": "112",
					"text": "51,000-100,000"
				},
				{
					"value": "113",
					"text": "101,000-200,000"
				},
				{
					"value": "114",
					"text": "201,000 - over"
				}
			],
			"subRefList": [
				{
					"key": "109",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "110",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "111",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "112",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "113",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "114",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "individual.contactvia",
			"refList": [
				{
					"value": "304",
					"text": "Any Type"
				},
				{
					"value": "300",
					"text": "Email"
				},
				{
					"value": "301",
					"text": "Home Phone"
				},
				{
					"value": "302",
					"text": "Work Phone"
				},
				{
					"value": "303",
					"text": "Mobile Number"
				}
			],
			"subRefList": [
				{
					"key": "304",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "300",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "301",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "302",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "303",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "individual.nevervia",
			"refList": [
				{
					"value": "314",
					"text": ""
				},
				{
					"value": "315",
					"text": "Email"
				},
				{
					"value": "316",
					"text": "Home Phone"
				},
				{
					"value": "317",
					"text": "Work Phone"
				},
				{
					"value": "318",
					"text": "Mobile Number"
				},
				{
					"value": "219",
					"text": "Don't Contact (Internal)"
				},
				{
					"value": "319",
					"text": "Text Message"
				},
				{
					"value": "4004",
					"text": "Written Permission (Internal)"
				},
				{
					"value": "4000",
					"text": "DNC List - Don't Contact"
				},
				{
					"value": "4001",
					"text": "DNC List - Current Customer"
				},
				{
					"value": "4002",
					"text": "DNC List - Current Prospect"
				},
				{
					"value": "4003",
					"text": "DNC List - Written Permission"
				}
			],
			"subRefList": [
				{
					"key": "314",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "315",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "316",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "317",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "318",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "219",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "319",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "4004",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "4000",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "4001",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "4002",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "4003",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "individual.type",
			"refList": [
				{
					"value": "305",
					"text": "Prospect"
				},
				{
					"value": "306",
					"text": "Customer"
				},
				{
					"value": "307",
					"text": "Employee"
				},
				{
					"value": "308",
					"text": "Vendor"
				},
				{
					"value": "309",
					"text": "Partner"
				}
			],
			"subRefList": [
				{
					"key": "305",
					"refList": [
						{
							"value": "695",
							"text": "Hot (1-3 Weeks)"
						},
						{
							"value": "696",
							"text": "Medium (4-6 Weeks)"
						},
						{
							"value": "697",
							"text": "Cold (3-6 Months)"
						}
					],
					"subRefList": []
				},
				{
					"key": "306",
					"refList": [
						{
							"value": "690",
							"text": "Gold"
						},
						{
							"value": "691",
							"text": "Silver"
						},
						{
							"value": "692",
							"text": "Bronze"
						},
						{
							"value": "698",
							"text": "Platinum"
						}
					],
					"subRefList": []
				},
				{
					"key": "307",
					"refList": [
						{
							"value": "693",
							"text": "Sales"
						},
						{
							"value": "694",
							"text": "Marketing"
						},
						{
							"value": "800",
							"text": "Customer Service"
						},
						{
							"value": "801",
							"text": "Service"
						},
						{
							"value": "802",
							"text": "Finance"
						},
						{
							"value": "803",
							"text": "Operations"
						},
						{
							"value": "804",
							"text": "Administration"
						},
						{
							"value": "935",
							"text": "BDC"
						}
					],
					"subRefList": []
				},
				{
					"key": "308",
					"refList": [
						{
							"value": "805",
							"text": "Distributor"
						},
						{
							"value": "806",
							"text": "Retailer"
						},
						{
							"value": "807",
							"text": "Professional Service"
						},
						{
							"value": "808",
							"text": "Manufacturer"
						}
					],
					"subRefList": []
				},
				{
					"key": "309",
					"refList": [
						{
							"value": "809",
							"text": "Reseller"
						}
					],
					"subRefList": []
				}
			]
		},
		{
			"key": "inventory.status",
			"refList": [
				{
					"value": "100341",
					"text": "Not In Stock"
				},
				{
					"value": "100340",
					"text": "In Stock"
				},
				{
					"value": "100342",
					"text": "Check New Inventory"
				},
				{
					"value": "100343",
					"text": "Sold"
				}
			],
			"subRefList": [
				{
					"key": "100341",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100340",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100342",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100343",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "pref.languages",
			"refList": [
				{
					"value": "140",
					"text": "English"
				},
				{
					"value": "141",
					"text": "Spanish"
				},
				{
					"value": "142",
					"text": "French"
				},
				{
					"value": "143",
					"text": "German"
				},
				{
					"value": "144",
					"text": "Russian"
				},
				{
					"value": "145",
					"text": "Japanese"
				},
				{
					"value": "146",
					"text": "Mandarin"
				},
				{
					"value": "147",
					"text": "Korean"
				},
				{
					"value": "148",
					"text": "Portuguese"
				}
			],
			"subRefList": [
				{
					"key": "140",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "141",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "142",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "143",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "144",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "145",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "146",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "147",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "148",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.type",
			"refList": [
				{
					"value": "100050",
					"text": "New Vehicle"
				},
				{
					"value": "100051",
					"text": "Used Vehicle"
				},
				{
					"value": "100052",
					"text": "Future Model"
				},
				{
					"value": "100053",
					"text": "Factory Order"
				},
				{
					"value": "100055",
					"text": "Unknown"
				},
				{
					"value": "100056",
					"text": "CPO"
				}
			],
			"subRefList": [
				{
					"key": "100050",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100051",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100052",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100053",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100055",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100056",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.subtype",
			"refList": [
				{
					"value": "100280",
					"text": "Unknown"
				},
				{
					"value": "100282",
					"text": "Cash"
				},
				{
					"value": "100283",
					"text": "Finance"
				},
				{
					"value": "100281",
					"text": "Lease"
				},
				{
					"value": "100284",
					"text": "Special Finance"
				},
				{
					"value": "1002840",
					"text": "Balloon"
				}
			],
			"subRefList": [
				{
					"key": "100280",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100282",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100283",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100281",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100284",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1002840",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.rank",
			"refList": [
				{
					"value": "230",
					"text": "1 - Hot"
				},
				{
					"value": "231",
					"text": "2 - Medium"
				},
				{
					"value": "232",
					"text": "3 - Cold"
				},
				{
					"value": "233",
					"text": "4 - Disqualified"
				}
			],
			"subRefList": [
				{
					"key": "230",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "231",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "232",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "233",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.source",
			"refList": [
				{
					"value": "240",
					"text": "Fresh Up"
				},
				{
					"value": "241",
					"text": "Phone Up"
				},
				{
					"value": "242",
					"text": "Internet"
				},
				{
					"value": "247",
					"text": "Repeat cust"
				},
				{
					"value": "248",
					"text": "Referral"
				},
				{
					"value": "243",
					"text": "Dealer Mgmt Sys"
				},
				{
					"value": "244",
					"text": "Marketing/Biz Rule"
				},
				{
					"value": "254",
					"text": "Lease Return"
				},
				{
					"value": "246",
					"text": "History Import"
				},
				{
					"value": "260",
					"text": "Call Center"
				}
			],
			"subRefList": [
				{
					"key": "240",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "241",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "242",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "247",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "248",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "243",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "244",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "254",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "246",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "260",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.status",
			"refList": [
				{
					"value": "220",
					"text": "0 - Unqualified"
				},
				{
					"value": "221",
					"text": "1 - Up/Contacted"
				},
				{
					"value": "227",
					"text": "2 - Store Visit"
				},
				{
					"value": "222",
					"text": "3 - Demo Vehicle"
				},
				{
					"value": "223",
					"text": "4 - Write-Up"
				},
				{
					"value": "224",
					"text": "5 - Pending F&I"
				},
				{
					"value": "225",
					"text": "6 - Sold"
				},
				{
					"value": "226",
					"text": "7 - Lost"
				}
			],
			"subRefList": [
				{
					"key": "220",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "221",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "227",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "222",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "223",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "224",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "225",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "226",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.forecast",
			"refList": [
				{
					"value": "100306",
					"text": "Delivery"
				},
				{
					"value": "100303",
					"text": "Over 2 Months"
				},
				{
					"value": "100302",
					"text": "Next 2 Months"
				},
				{
					"value": "100301",
					"text": "Next 30 Days"
				},
				{
					"value": "100300",
					"text": "Next 7 Days"
				},
				{
					"value": "100304",
					"text": "24 Hours"
				}
			],
			"subRefList": [
				{
					"key": "100306",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100303",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100302",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100301",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100300",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100304",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.code1",
			"refList": [
				{
					"value": "1004510",
					"text": "Future Interest"
				},
				{
					"value": "290",
					"text": "Price/Value"
				},
				{
					"value": "291",
					"text": "Fit/Features"
				},
				{
					"value": "292",
					"text": "Selling Skills"
				},
				{
					"value": "295",
					"text": "No Response"
				},
				{
					"value": "296",
					"text": "Disqualified"
				},
				{
					"value": "297",
					"text": "Lost To Competitor"
				},
				{
					"value": "298",
					"text": "Other"
				},
				{
					"value": "200084",
					"text": "Turned to BDC"
				}
			],
			"subRefList": [
				{
					"key": "1004510",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "290",
					"refList": [
						{
							"value": "320",
							"text": "Discount"
						},
						{
							"value": "321",
							"text": "Monthly Payment"
						},
						{
							"value": "322",
							"text": "Down Payment"
						},
						{
							"value": "323",
							"text": "Finance/Lease Rate"
						},
						{
							"value": "324",
							"text": "Trade In"
						}
					],
					"subRefList": []
				},
				{
					"key": "291",
					"refList": [
						{
							"value": "325",
							"text": "Availability"
						},
						{
							"value": "326",
							"text": "Package"
						},
						{
							"value": "327",
							"text": "Color"
						},
						{
							"value": "328",
							"text": "Options"
						},
						{
							"value": "329",
							"text": "Model"
						},
						{
							"value": "363",
							"text": "Brand"
						},
						{
							"value": "364",
							"text": "Performance"
						},
						{
							"value": "365",
							"text": "Economy"
						},
						{
							"value": "366",
							"text": "Safety"
						}
					],
					"subRefList": []
				},
				{
					"key": "292",
					"refList": [
						{
							"value": "370",
							"text": "Relationship"
						},
						{
							"value": "371",
							"text": "Follow Up"
						},
						{
							"value": "372",
							"text": "Objections"
						}
					],
					"subRefList": []
				},
				{
					"key": "295",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "296",
					"refList": [
						{
							"value": "380",
							"text": "Budget"
						},
						{
							"value": "381",
							"text": "Bad Credit"
						},
						{
							"value": "382",
							"text": "Negative Equity"
						}
					],
					"subRefList": []
				},
				{
					"key": "297",
					"refList": [
						{
							"value": "367",
							"text": "Same Make"
						},
						{
							"value": "368",
							"text": "Other Make"
						}
					],
					"subRefList": []
				},
				{
					"key": "298",
					"refList": [
						{
							"value": "200368",
							"text": "Invalid Number"
						},
						{
							"value": "200369",
							"text": "Invalid Email"
						},
						{
							"value": "200370",
							"text": "Not in Market"
						}
					],
					"subRefList": []
				},
				{
					"key": "200084",
					"refList": [
						{
							"value": "200086",
							"text": "Hot"
						},
						{
							"value": "200087",
							"text": "Medium"
						},
						{
							"value": "200088",
							"text": "Cold"
						}
					],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.code2",
			"refList": [
				{
					"value": "320",
					"text": "Discount"
				},
				{
					"value": "364",
					"text": "Performance"
				},
				{
					"value": "367",
					"text": "Same Make"
				},
				{
					"value": "370",
					"text": "Relationship"
				},
				{
					"value": "380",
					"text": "Budget"
				},
				{
					"value": "200086",
					"text": "Hot"
				},
				{
					"value": "200368",
					"text": "Invalid Number"
				},
				{
					"value": "200401",
					"text": "Bad Contact"
				},
				{
					"value": "321",
					"text": "Monthly Payment"
				},
				{
					"value": "365",
					"text": "Economy"
				},
				{
					"value": "368",
					"text": "Other Make"
				},
				{
					"value": "371",
					"text": "Follow Up"
				},
				{
					"value": "381",
					"text": "Bad Credit"
				},
				{
					"value": "200087",
					"text": "Medium"
				},
				{
					"value": "200369",
					"text": "Invalid Email"
				},
				{
					"value": "200402",
					"text": "Bad Phone #"
				},
				{
					"value": "322",
					"text": "Down Payment"
				},
				{
					"value": "366",
					"text": "Safety"
				},
				{
					"value": "372",
					"text": "Objections"
				},
				{
					"value": "382",
					"text": "Negative Equity"
				},
				{
					"value": "200088",
					"text": "Cold"
				},
				{
					"value": "200370",
					"text": "Not in Market"
				},
				{
					"value": "200403",
					"text": "Bad Email"
				},
				{
					"value": "323",
					"text": "Finance/Lease Rate"
				},
				{
					"value": "327",
					"text": "Color"
				},
				{
					"value": "324",
					"text": "Trade In"
				},
				{
					"value": "328",
					"text": "Options"
				},
				{
					"value": "325",
					"text": "Availability"
				},
				{
					"value": "326",
					"text": "Package"
				},
				{
					"value": "329",
					"text": "Model"
				},
				{
					"value": "363",
					"text": "Brand"
				}
			],
			"subRefList": [
				{
					"key": "320",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "364",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "367",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "370",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "380",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200086",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200368",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200401",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "321",
					"refList": [
						{
							"value": "360",
							"text": "Performance"
						},
						{
							"value": "360",
							"text": "Performance"
						}
					],
					"subRefList": []
				},
				{
					"key": "365",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "368",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "371",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "381",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200087",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200369",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200402",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "322",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "366",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "372",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "382",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200088",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200370",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200403",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "323",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "327",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "324",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "328",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "325",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "326",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "329",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "363",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.code3",
			"refList": [
				{
					"value": "360",
					"text": "Performance"
				},
				{
					"value": "616",
					"text": "Spouse"
				},
				{
					"value": "621",
					"text": "President"
				},
				{
					"value": "634",
					"text": "Referral"
				},
				{
					"value": "937",
					"text": "General Manager"
				},
				{
					"value": "943",
					"text": "Cash"
				},
				{
					"value": "946",
					"text": "Work"
				},
				{
					"value": "952",
					"text": "Primary"
				},
				{
					"value": "612",
					"text": "Father"
				},
				{
					"value": "622",
					"text": "Vice President"
				},
				{
					"value": "635",
					"text": "Influencer"
				},
				{
					"value": "923",
					"text": "Sales Manager"
				},
				{
					"value": "944",
					"text": "Credit"
				},
				{
					"value": "947",
					"text": "Family"
				},
				{
					"value": "953",
					"text": "Secondary"
				},
				{
					"value": "613",
					"text": "Mother"
				},
				{
					"value": "623",
					"text": "Chief Executive Office"
				},
				{
					"value": "924",
					"text": "Sales Person"
				},
				{
					"value": "945",
					"text": "Emotional"
				},
				{
					"value": "950",
					"text": "Influencer"
				},
				{
					"value": "610",
					"text": "Son"
				},
				{
					"value": "624",
					"text": "Chief Financial Officer"
				},
				{
					"value": "921",
					"text": "Service Manager"
				},
				{
					"value": "949",
					"text": "Athletic"
				},
				{
					"value": "611",
					"text": "Daughter"
				},
				{
					"value": "625",
					"text": "Chief Information Officer"
				},
				{
					"value": "922",
					"text": "Service Writer/Advisor"
				},
				{
					"value": "948",
					"text": "Church"
				},
				{
					"value": "618",
					"text": "Sister/Brother"
				},
				{
					"value": "626",
					"text": "Principal"
				},
				{
					"value": "942",
					"text": "Service Technician"
				},
				{
					"value": "951",
					"text": "Other"
				},
				{
					"value": "614",
					"text": "Cousin"
				},
				{
					"value": "627",
					"text": "Marketing"
				},
				{
					"value": "939",
					"text": "F&I"
				},
				{
					"value": "615",
					"text": "Aunt/Uncle"
				},
				{
					"value": "628",
					"text": "Sales"
				},
				{
					"value": "938",
					"text": "BDC/Customer Care"
				},
				{
					"value": "617",
					"text": "Niece/Nephew"
				},
				{
					"value": "630",
					"text": "Service"
				},
				{
					"value": "940",
					"text": "Parts"
				},
				{
					"value": "619",
					"text": "Grandparnet"
				},
				{
					"value": "631",
					"text": "Support"
				},
				{
					"value": "920",
					"text": "Lead Source"
				},
				{
					"value": "941",
					"text": "Other"
				},
				{
					"value": "620",
					"text": "Step Parent"
				},
				{
					"value": "632",
					"text": "Quality Assurance"
				},
				{
					"value": "633",
					"text": "Business Development"
				},
				{
					"value": "629",
					"text": "Product Manager"
				}
			],
			"subRefList": [
				{
					"key": "360",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "616",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "621",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "634",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "937",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "943",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "946",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "952",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "612",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "622",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "635",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "923",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "944",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "947",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "953",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "613",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "623",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "924",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "945",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "950",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "610",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "624",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "921",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "949",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "611",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "625",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "922",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "948",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "618",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "626",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "942",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "951",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "614",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "627",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "939",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "615",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "628",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "938",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "617",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "630",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "940",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "619",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "631",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "920",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "941",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "620",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "632",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "633",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "629",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "sales.trackingCode",
			"refList": [
				{
					"value": "455",
					"text": "I-Net AutoTrader.com"
				},
				{
					"value": "456",
					"text": "I-Net Cars.com      "
				},
				{
					"value": "457",
					"text": "I-Net KSL.com       "
				},
				{
					"value": "458",
					"text": "Print - AutoMart    "
				},
				{
					"value": "459",
					"text": "I-Net Honda         "
				},
				{
					"value": "460",
					"text": "Internet Honda      "
				},
				{
					"value": "461",
					"text": "I-Net Vehix.com     "
				},
				{
					"value": "462",
					"text": "2-TV                "
				},
				{
					"value": "464",
					"text": "2-Newspaper         "
				},
				{
					"value": "518",
					"text": "Internet Honda      "
				},
				{
					"value": "779",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "842",
					"text": "Swing Into Summer   "
				},
				{
					"value": "1021",
					"text": "NGV Civic Mailer    "
				},
				{
					"value": "1022",
					"text": "2-Brand Loyalty-Garf"
				},
				{
					"value": "1023",
					"text": "2-Radio             "
				},
				{
					"value": "1024",
					"text": "I-Net eBay.com      "
				},
				{
					"value": "1026",
					"text": "Phonebook           "
				},
				{
					"value": "1028",
					"text": "1-Location          "
				},
				{
					"value": "1031",
					"text": "Internet Dealerskins"
				},
				{
					"value": "1047",
					"text": "2-Mail Email        "
				},
				{
					"value": "1072",
					"text": "2-Mail Postal       "
				},
				{
					"value": "1191",
					"text": "2-Other Sam's Club  "
				},
				{
					"value": "1206",
					"text": "zSVC Reminder       "
				},
				{
					"value": "1305",
					"text": "2-Brand Loyalty Hond"
				},
				{
					"value": "1589",
					"text": "2-Other Military    "
				},
				{
					"value": "1674",
					"text": "Internet Jumpstart  "
				},
				{
					"value": "1903",
					"text": "I-Net SamsClub.com  "
				},
				{
					"value": "1992",
					"text": "Internet CUDL       "
				},
				{
					"value": "2045",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "2120",
					"text": "I-Net CUDL.com      "
				},
				{
					"value": "2160",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "2210",
					"text": "2-Keys2Success      "
				},
				{
					"value": "2282",
					"text": "Other-4Play Concert "
				},
				{
					"value": "2314",
					"text": "1-Prospecting       "
				},
				{
					"value": "2317",
					"text": "2-Other             "
				},
				{
					"value": "2322",
					"text": "2-Mail Rastar       "
				},
				{
					"value": "2428",
					"text": "I-Net SamsClub.com  "
				},
				{
					"value": "2578",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "2605",
					"text": "Internet CREDCO     "
				},
				{
					"value": "2633",
					"text": "1 800 HONDA CARS    "
				},
				{
					"value": "2634",
					"text": "2-Keys2Success      "
				},
				{
					"value": "2636",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "2643",
					"text": "KTS Service Certific"
				},
				{
					"value": "2678",
					"text": "I-Net AutoTrader.com"
				},
				{
					"value": "2685",
					"text": "April Rastar Mail Pi"
				},
				{
					"value": "2792",
					"text": "I-Net Honda.com     "
				},
				{
					"value": "2793",
					"text": "I-Net Honda.com     "
				},
				{
					"value": "2797",
					"text": "I-Net Honda.com     "
				},
				{
					"value": "2798",
					"text": "I-Net Edmonds.com   "
				},
				{
					"value": "2799",
					"text": "Internet Honda      "
				},
				{
					"value": "2800",
					"text": "Internet Honda      "
				},
				{
					"value": "2816",
					"text": "I-Net CarsNew.com   "
				},
				{
					"value": "2822",
					"text": "I-Net KSL.com       "
				},
				{
					"value": "2826",
					"text": "Internet Honda      "
				},
				{
					"value": "2885",
					"text": "I-Net Craigslist.com"
				},
				{
					"value": "2888",
					"text": "I-Net Honda.com     "
				},
				{
					"value": "2962",
					"text": "I-Net Honda.com     "
				},
				{
					"value": "2968",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "2969",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "2983",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "2988",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "2990",
					"text": "I-Net KSL.com       "
				},
				{
					"value": "3079",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3120",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3159",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "3166",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "3168",
					"text": "2-MonsterAd         "
				},
				{
					"value": "3205",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "3235",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3243",
					"text": "I-Net Edmonds.com   "
				},
				{
					"value": "3259",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "3263",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3357",
					"text": "I-Net DexKnows.com  "
				},
				{
					"value": "3358",
					"text": "2-Yellow Pages      "
				},
				{
					"value": "3405",
					"text": "I-Net Honda.com     "
				},
				{
					"value": "3408",
					"text": "2-Thomas Arts       "
				},
				{
					"value": "3416",
					"text": "I-Net UtahBuyBack.co"
				},
				{
					"value": "3420",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "3484",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3535",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3539",
					"text": "I-Net Detroit TE    "
				},
				{
					"value": "3592",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3601",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3612",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3615",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3617",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3630",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3634",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3645",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3660",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3664",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3670",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3689",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3707",
					"text": "I-Net Gumiyo        "
				},
				{
					"value": "3713",
					"text": "I-Net Honda.com     "
				},
				{
					"value": "3725",
					"text": "2-Cash4Clunker      "
				},
				{
					"value": "3758",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "3769",
					"text": "2-Park City Arts Fes"
				},
				{
					"value": "3786",
					"text": "Internet            "
				},
				{
					"value": "3788",
					"text": "Internet Marketing  "
				},
				{
					"value": "3797",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3803",
					"text": "I-Net CarLocate.com "
				},
				{
					"value": "3809",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3877",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3878",
					"text": "I-Net KGMobile.com  "
				},
				{
					"value": "3880",
					"text": "I-Net CarLocate.com "
				},
				{
					"value": "3885",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "3892",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "3900",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3907",
					"text": "I-Net Yahoo.com     "
				},
				{
					"value": "3909",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3910",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3912",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3913",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3926",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3935",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3936",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3937",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3938",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3939",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3947",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3953",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3981",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3989",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3992",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3993",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "3995",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "4035",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "4039",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "4042",
					"text": "I-Net AutoUSA.com   "
				},
				{
					"value": "4052",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "4053",
					"text": "I-Net KGMobile.com  "
				},
				{
					"value": "4056",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "4059",
					"text": "2-Corp Partnership  "
				},
				{
					"value": "4060",
					"text": "I-Net KGMobile.com  "
				},
				{
					"value": "4069",
					"text": "I-Net CarsDirect.com"
				},
				{
					"value": "4072",
					"text": "I-Net iMotors.com   "
				},
				{
					"value": "4079",
					"text": "I-Net TA Microsite  "
				},
				{
					"value": "4083",
					"text": "I-Net UtahBuyback.co"
				},
				{
					"value": "4084",
					"text": "I-Net CreditJockey  "
				},
				{
					"value": "4089",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "4096",
					"text": "I-Net MyUtahAutos.co"
				},
				{
					"value": "4104",
					"text": "I-Net SmartAutoSavin"
				},
				{
					"value": "4105",
					"text": "I-Net Facebook.com  "
				},
				{
					"value": "4111",
					"text": "I-Net AutoPriceFinde"
				},
				{
					"value": "4114",
					"text": "I-Net EveryCarListed"
				},
				{
					"value": "4122",
					"text": "I-Net CarSoup.com   "
				},
				{
					"value": "4124",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "4142",
					"text": "Lite Service Departm"
				},
				{
					"value": "4174",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "4201",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "4221",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "4245",
					"text": "500_offer/?SC=FCBK  "
				},
				{
					"value": "4246",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "4274",
					"text": "I-Net LeadForward.co"
				},
				{
					"value": "4334",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "4335",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "4360",
					"text": "I-Net WP/Blogger    "
				},
				{
					"value": "4488",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "4534",
					"text": "I-Net CarsBestValue."
				},
				{
					"value": "4535",
					"text": "I-Net Autotegrity.co"
				},
				{
					"value": "4540",
					"text": "I-Net KenGarff.com  "
				},
				{
					"value": "4565",
					"text": "I-Net Dealix.com    "
				},
				{
					"value": "4596",
					"text": "I-Net Zag.com       "
				},
				{
					"value": "4601",
					"text": "iPhone Request More "
				},
				{
					"value": "4662",
					"text": "zag/AOL Best Deals  "
				},
				{
					"value": "4664",
					"text": "Honda Offers RAQ    "
				},
				{
					"value": "4667",
					"text": "Honda Certified Used"
				},
				{
					"value": "4669",
					"text": "SpecialOffer1 - Deal"
				},
				{
					"value": "4724",
					"text": "Honda Civic GX - Nat"
				},
				{
					"value": "4776",
					"text": "Autotrader.com TIM  "
				},
				{
					"value": "4778",
					"text": "eBrochure           "
				},
				{
					"value": "4781",
					"text": "my tracking code    "
				},
				{
					"value": "4788",
					"text": "I-Net Honda C       "
				},
				{
					"value": "4789",
					"text": "I-net-Honda         "
				},
				{
					"value": "4794",
					"text": "Audi Partner Lead   "
				},
				{
					"value": "4795",
					"text": "MINIUSA.com         "
				},
				{
					"value": "4796",
					"text": "Chrysler USA - Get a"
				},
				{
					"value": "4797",
					"text": "Jaguar USA - Get a Q"
				},
				{
					"value": "4798",
					"text": "MBUSA.com - New Vehi"
				},
				{
					"value": "4799",
					"text": "mitsubishicars.com  "
				},
				{
					"value": "4800",
					"text": "Porsche USA - Get a "
				},
				{
					"value": "4801",
					"text": "VW Partner Lead     "
				},
				{
					"value": "4802",
					"text": "Volvo Third Party   "
				},
				{
					"value": "4803",
					"text": "HR - GM Handraiser  "
				},
				{
					"value": "4804",
					"text": "lincoln.com         "
				},
				{
					"value": "4805",
					"text": "mazdaedmunds.com    "
				},
				{
					"value": "4806",
					"text": "LMRS                "
				},
				{
					"value": "4807",
					"text": "NissanUSA           "
				},
				{
					"value": "4808",
					"text": "Autobytel           "
				},
				{
					"value": "4809",
					"text": "Subaru Dealer Site C"
				},
				{
					"value": "4838",
					"text": "AutoTrader          "
				},
				{
					"value": "4840",
					"text": "Chrysler USA - Ge000"
				},
				{
					"value": "4841",
					"text": "Edmunds 1234        "
				},
				{
					"value": "4842",
					"text": "Costco 1234         "
				},
				{
					"value": "4843",
					"text": "TMSDealerRegistratio"
				},
				{
					"value": "4845",
					"text": "MBUSA - MBF - Payoff"
				},
				{
					"value": "4846",
					"text": "Autotrader sh       "
				},
				{
					"value": "4852",
					"text": "TMSDealerRegistra000"
				},
				{
					"value": "4853",
					"text": "TDDS 3rd Party Leads"
				},
				{
					"value": "4854",
					"text": "MBUSA - MBF - Pay000"
				},
				{
					"value": "4856",
					"text": "Unavailable         "
				},
				{
					"value": "4859",
					"text": "Audi Dealer Site    "
				},
				{
					"value": "4872",
					"text": "xxx                 "
				},
				{
					"value": "4968",
					"text": "Subaru ILM Network -"
				},
				{
					"value": "4969",
					"text": "Mobile Phone Pilot  "
				},
				{
					"value": "4970",
					"text": "eAutoBlaster        "
				},
				{
					"value": "4971",
					"text": "Edmunds             "
				},
				{
					"value": "4985",
					"text": "Corporate           "
				},
				{
					"value": "4988",
					"text": "Google Advisor      "
				}
			],
			"subRefList": []
		},
		{
			"key": "qa.status",
			"refList": [
				{
					"value": "100023",
					"text": "1 - Open"
				},
				{
					"value": "100024",
					"text": "2 - Resolving"
				},
				{
					"value": "100025",
					"text": "3 - Escalated"
				},
				{
					"value": "100026",
					"text": "4 - Completed"
				},
				{
					"value": "100027",
					"text": "5 - Fall Out"
				}
			],
			"subRefList": [
				{
					"key": "100023",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100024",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100025",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100026",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100027",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "qa.rank",
			"refList": [
				{
					"value": "100028",
					"text": "1 - Hot"
				},
				{
					"value": "100029",
					"text": "2 - Medium"
				},
				{
					"value": "100030",
					"text": "3 - Cold"
				},
				{
					"value": "200083",
					"text": "4 - Disqualified"
				}
			],
			"subRefList": [
				{
					"key": "100028",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100029",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100030",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200083",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "qa.source",
			"refList": [
				{
					"value": "100031",
					"text": "Walk-in"
				},
				{
					"value": "100032",
					"text": "Inbound Call"
				},
				{
					"value": "100033",
					"text": "Outbound Call"
				},
				{
					"value": "112169",
					"text": "Web"
				},
				{
					"value": "112170",
					"text": "Dealer Mgmt Sys"
				},
				{
					"value": "112181",
					"text": "Marketing/Biz Rule"
				},
				{
					"value": "100133",
					"text": "History Import"
				},
				{
					"value": "200200",
					"text": "Survey"
				},
				{
					"value": "1003500",
					"text": "Call Center"
				},
				{
					"value": "1006027",
					"text": "Support DashBoard"
				}
			],
			"subRefList": [
				{
					"key": "100031",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100032",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100033",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "112169",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "112170",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "112181",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100133",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200200",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1003500",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1006027",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "qa.type",
			"refList": [
				{
					"value": "100003",
					"text": "Sales"
				},
				{
					"value": "100004",
					"text": "Service"
				},
				{
					"value": "100006",
					"text": "QA"
				},
				{
					"value": "100005",
					"text": "Internet"
				},
				{
					"value": "200392",
					"text": "1 on 1"
				}
			],
			"subRefList": [
				{
					"key": "100003",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100004",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100006",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100005",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200392",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "qa.subtype",
			"refList": [
				{
					"value": "100007",
					"text": "Complaint"
				},
				{
					"value": "100008",
					"text": "Person Greeting"
				},
				{
					"value": "100009",
					"text": "Understanding Needs"
				},
				{
					"value": "100010",
					"text": "Finance department"
				},
				{
					"value": "100011",
					"text": "Dealership Expectations"
				},
				{
					"value": "100012",
					"text": "Vehicle Expectations"
				},
				{
					"value": "100013",
					"text": "Price"
				},
				{
					"value": "100014",
					"text": "Equipped as promised"
				},
				{
					"value": "100015",
					"text": "Sales Experience"
				},
				{
					"value": "100016",
					"text": "Facility"
				},
				{
					"value": "100017",
					"text": "Parts Status"
				},
				{
					"value": "100018",
					"text": "Parts Back Order"
				},
				{
					"value": "100019",
					"text": "Parts Special Order"
				},
				{
					"value": "100020",
					"text": "Satisfied with service"
				},
				{
					"value": "100021",
					"text": "Understood Needs"
				},
				{
					"value": "100022",
					"text": "Advisor Courtesy"
				},
				{
					"value": "1004506",
					"text": "CLO"
				}
			],
			"subRefList": [
				{
					"key": "100007",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100008",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100009",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100010",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100011",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100012",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100013",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100014",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100015",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100016",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100017",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100018",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100019",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100020",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100021",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100022",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1004506",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "qa.forecast",
			"refList": [
				{
					"value": "100324",
					"text": "Today"
				},
				{
					"value": "100325",
					"text": "Next 2 Days"
				},
				{
					"value": "100326",
					"text": "Next 7 Days"
				},
				{
					"value": "100327",
					"text": "Next 2 Weeks"
				}
			],
			"subRefList": [
				{
					"key": "100324",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100325",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100326",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100327",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "qa.code1",
			"refList": [
				{
					"value": "100034",
					"text": "Satisfied"
				},
				{
					"value": "100035",
					"text": "Unsatisfied"
				},
				{
					"value": "100036",
					"text": "Indifferent"
				},
				{
					"value": "100043",
					"text": "No Response"
				}
			],
			"subRefList": [
				{
					"key": "100034",
					"refList": [
						{
							"value": "100037",
							"text": "Valid Explanation"
						},
						{
							"value": "100038",
							"text": "Problem Corrected"
						},
						{
							"value": "100039",
							"text": "Customer Error"
						},
						{
							"value": "100040",
							"text": "Concession Given"
						},
						{
							"value": "100041",
							"text": "Response Time"
						},
						{
							"value": "100042",
							"text": "Response Effort"
						}
					],
					"subRefList": []
				},
				{
					"key": "100035",
					"refList": [
						{
							"value": "100100",
							"text": "Could Not Be Corrected"
						},
						{
							"value": "100101",
							"text": "Customer Error"
						},
						{
							"value": "100102",
							"text": "Corrected - Not Satisfied"
						},
						{
							"value": "100103",
							"text": "Unwilling to Correct"
						},
						{
							"value": "100104",
							"text": "Response Time"
						}
					],
					"subRefList": []
				},
				{
					"key": "100036",
					"refList": [
						{
							"value": "100105",
							"text": "Problem Corrected"
						},
						{
							"value": "100106",
							"text": "Cound Not Be Corrected"
						},
						{
							"value": "100107",
							"text": "Concession Given"
						},
						{
							"value": "100108",
							"text": "Valid Explanation"
						}
					],
					"subRefList": []
				},
				{
					"key": "100043",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "qa.code2",
			"refList": [
				{
					"value": "100038",
					"text": "Problem Corrected"
				},
				{
					"value": "100102",
					"text": "Corrected - Not Satisfied"
				},
				{
					"value": "100105",
					"text": "Problem Corrected"
				},
				{
					"value": "100041",
					"text": "Response Time"
				},
				{
					"value": "100100",
					"text": "Could Not Be Corrected"
				},
				{
					"value": "100106",
					"text": "Cound Not Be Corrected"
				},
				{
					"value": "100042",
					"text": "Response Effort"
				},
				{
					"value": "100101",
					"text": "Customer Error"
				},
				{
					"value": "100107",
					"text": "Concession Given"
				},
				{
					"value": "100037",
					"text": "Valid Explanation"
				},
				{
					"value": "100104",
					"text": "Response Time"
				},
				{
					"value": "100108",
					"text": "Valid Explanation"
				},
				{
					"value": "100040",
					"text": "Concession Given"
				},
				{
					"value": "100103",
					"text": "Unwilling to Correct"
				},
				{
					"value": "100039",
					"text": "Customer Error"
				}
			],
			"subRefList": [
				{
					"key": "100038",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100102",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100105",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100041",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100100",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100106",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100042",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100101",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100107",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100037",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100104",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100108",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100040",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100103",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100039",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "service.forecast",
			"refList": [
				{
					"value": "100320",
					"text": "Today"
				},
				{
					"value": "100321",
					"text": "Next 2 Days"
				},
				{
					"value": "100322",
					"text": "Next 7 Days"
				},
				{
					"value": "100323",
					"text": "Next 2 Weeks"
				}
			],
			"subRefList": [
				{
					"key": "100320",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100321",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100322",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100323",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "service.rank",
			"refList": [
				{
					"value": "100171",
					"text": "1 - Hot"
				},
				{
					"value": "100172",
					"text": "2 - Medium"
				},
				{
					"value": "100173",
					"text": "3 - Cold"
				}
			],
			"subRefList": [
				{
					"key": "100171",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100172",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100173",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "service.source",
			"refList": [
				{
					"value": "100174",
					"text": "Walk-in"
				},
				{
					"value": "100175",
					"text": "Inbound Call"
				},
				{
					"value": "100176",
					"text": "Outbound Call"
				},
				{
					"value": "100177",
					"text": "Web"
				},
				{
					"value": "100178",
					"text": "Dealer Mgmt Sys"
				},
				{
					"value": "112182",
					"text": "Marketing/Biz Rule"
				},
				{
					"value": "100132",
					"text": "History Import"
				},
				{
					"value": "200079",
					"text": "SVC Coupon"
				},
				{
					"value": "200356",
					"text": "Service Reminder"
				},
				{
					"value": "112187",
					"text": "Call Center"
				},
				{
					"value": "1008004",
					"text": "Web/CallCenter"
				},
				{
					"value": "1009500",
					"text": "MobileGarage"
				},
				{
					"value": "1700",
					"text": "Web (3rd party)"
				}
			],
			"subRefList": [
				{
					"key": "100174",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100175",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100176",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100177",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100178",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "112182",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100132",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200079",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200356",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "112187",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1008004",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1009500",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1700",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "service.status",
			"refList": [
				{
					"value": "100165",
					"text": "0 - Unqualified"
				},
				{
					"value": "100166",
					"text": "1 - Appointment"
				},
				{
					"value": "100167",
					"text": "2 - Diagnosis"
				},
				{
					"value": "100168",
					"text": "3 - In Service"
				},
				{
					"value": "100169",
					"text": "4 - Completed"
				},
				{
					"value": "100170",
					"text": "5 - Lost"
				}
			],
			"subRefList": [
				{
					"key": "100165",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100166",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100167",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100168",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100169",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100170",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "activity.duetime",
			"refList": [
				{
					"value": "102110",
					"text": "7:00 AM"
				},
				{
					"value": "100600",
					"text": "7:10 AM"
				},
				{
					"value": "100601",
					"text": "7:20 AM"
				},
				{
					"value": "102111",
					"text": "7:30 AM"
				},
				{
					"value": "100602",
					"text": "7:40 AM"
				},
				{
					"value": "100603",
					"text": "7:50 AM"
				},
				{
					"value": "102112",
					"text": "8:00 AM"
				},
				{
					"value": "100604",
					"text": "8:10 AM"
				},
				{
					"value": "100618",
					"text": "8:20 AM"
				},
				{
					"value": "102113",
					"text": "8:30 AM"
				},
				{
					"value": "100632",
					"text": "8:40 AM"
				},
				{
					"value": "100646",
					"text": "8:50 AM"
				},
				{
					"value": "102114",
					"text": "9:00 AM"
				},
				{
					"value": "100605",
					"text": "9:10 AM"
				},
				{
					"value": "100619",
					"text": "9:20 AM"
				},
				{
					"value": "102115",
					"text": "9:30 AM"
				},
				{
					"value": "100633",
					"text": "9:40 AM"
				},
				{
					"value": "100647",
					"text": "9:50 AM"
				},
				{
					"value": "102116",
					"text": "10:00 AM"
				},
				{
					"value": "100606",
					"text": "10:10 AM"
				},
				{
					"value": "100620",
					"text": "10:20 AM"
				},
				{
					"value": "102117",
					"text": "10:30 AM"
				},
				{
					"value": "100634",
					"text": "10:40 AM"
				},
				{
					"value": "100648",
					"text": "10:50 AM"
				},
				{
					"value": "102118",
					"text": "11:00 AM"
				},
				{
					"value": "100607",
					"text": "11:10 AM"
				},
				{
					"value": "100621",
					"text": "11:20 AM"
				},
				{
					"value": "102119",
					"text": "11:30 AM"
				},
				{
					"value": "100635",
					"text": "11:40 AM"
				},
				{
					"value": "100649",
					"text": "11:50 AM"
				},
				{
					"value": "102120",
					"text": "12:00 PM"
				},
				{
					"value": "200188",
					"text": "12:10 PM"
				},
				{
					"value": "200189",
					"text": "12:20 PM"
				},
				{
					"value": "102121",
					"text": "12:30 PM"
				},
				{
					"value": "200190",
					"text": "12:40 PM"
				},
				{
					"value": "200191",
					"text": "12:50 PM"
				},
				{
					"value": "102122",
					"text": "1:00 PM"
				},
				{
					"value": "100608",
					"text": "1:10 PM"
				},
				{
					"value": "100622",
					"text": "1:20 PM"
				},
				{
					"value": "102123",
					"text": "1:30 PM"
				},
				{
					"value": "100636",
					"text": "1:40 PM"
				},
				{
					"value": "100650",
					"text": "1:50 PM"
				},
				{
					"value": "102124",
					"text": "2:00 PM"
				},
				{
					"value": "100609",
					"text": "2:10 PM"
				},
				{
					"value": "100623",
					"text": "2:20 PM"
				},
				{
					"value": "102125",
					"text": "2:30 PM"
				},
				{
					"value": "100637",
					"text": "2:40 PM"
				},
				{
					"value": "100651",
					"text": "2:50 PM"
				},
				{
					"value": "102126",
					"text": "3:00 PM"
				},
				{
					"value": "100610",
					"text": "3:10 PM"
				},
				{
					"value": "100624",
					"text": "3:20 PM"
				},
				{
					"value": "102127",
					"text": "3:30 PM"
				},
				{
					"value": "100638",
					"text": "3:40 PM"
				},
				{
					"value": "100652",
					"text": "3:50 PM"
				},
				{
					"value": "102128",
					"text": "4:00 PM"
				},
				{
					"value": "100611",
					"text": "4:10 PM"
				},
				{
					"value": "100625",
					"text": "4:20 PM"
				},
				{
					"value": "102129",
					"text": "4:30 PM"
				},
				{
					"value": "100639",
					"text": "4:40 PM"
				},
				{
					"value": "100653",
					"text": "4:50 PM"
				},
				{
					"value": "102130",
					"text": "5:00 PM"
				},
				{
					"value": "100612",
					"text": "5:10 PM"
				},
				{
					"value": "100626",
					"text": "5:20 PM"
				},
				{
					"value": "102131",
					"text": "5:30 PM"
				},
				{
					"value": "100640",
					"text": "5:40 PM"
				},
				{
					"value": "100654",
					"text": "5:50 PM"
				},
				{
					"value": "102132",
					"text": "6:00 PM"
				},
				{
					"value": "100613",
					"text": "6:10 PM"
				},
				{
					"value": "100627",
					"text": "6:20 PM"
				},
				{
					"value": "102133",
					"text": "6:30 PM"
				},
				{
					"value": "100641",
					"text": "6:40 PM"
				},
				{
					"value": "100655",
					"text": "6:50 PM"
				},
				{
					"value": "102134",
					"text": "7:00 PM"
				},
				{
					"value": "100614",
					"text": "7:10 PM"
				},
				{
					"value": "100628",
					"text": "7:20 PM"
				},
				{
					"value": "102135",
					"text": "7:30 PM"
				},
				{
					"value": "100642",
					"text": "7:40 PM"
				},
				{
					"value": "100656",
					"text": "7:50 PM"
				},
				{
					"value": "102136",
					"text": "8:00 PM"
				},
				{
					"value": "100615",
					"text": "8:10 PM"
				},
				{
					"value": "100629",
					"text": "8:20 PM"
				},
				{
					"value": "102137",
					"text": "8:30 PM"
				},
				{
					"value": "100643",
					"text": "8:40 PM"
				},
				{
					"value": "100657",
					"text": "8:50 PM"
				},
				{
					"value": "102138",
					"text": "9:00 PM"
				},
				{
					"value": "200192",
					"text": "12:50 AM"
				},
				{
					"value": "200193",
					"text": "9:45 AM"
				},
				{
					"value": "200194",
					"text": "10:15 AM"
				},
				{
					"value": "200195",
					"text": "10:45 AM"
				},
				{
					"value": "200196",
					"text": "11:15 AM"
				},
				{
					"value": "200197",
					"text": "11:45 AM"
				},
				{
					"value": "200198",
					"text": "12:15 PM"
				},
				{
					"value": "200199",
					"text": "12:45 PM"
				},
				{
					"value": "200200",
					"text": "1:15 PM"
				},
				{
					"value": "200201",
					"text": "1:45 PM"
				},
				{
					"value": "200202",
					"text": "2:15 PM"
				},
				{
					"value": "200203",
					"text": "2:45 PM"
				},
				{
					"value": "200204",
					"text": "3:15 PM"
				},
				{
					"value": "200205",
					"text": "3:45 PM"
				},
				{
					"value": "200206",
					"text": "4:15 PM"
				},
				{
					"value": "200207",
					"text": "4:45 PM"
				},
				{
					"value": "200208",
					"text": "5:15 PM"
				},
				{
					"value": "200209",
					"text": "5:45 PM"
				},
				{
					"value": "200210",
					"text": "6:15 PM"
				},
				{
					"value": "200211",
					"text": "6:45 PM"
				},
				{
					"value": "200212",
					"text": "7:15 PM"
				},
				{
					"value": "200213",
					"text": "7:45 PM"
				},
				{
					"value": "200214",
					"text": "8:15 PM"
				},
				{
					"value": "200215",
					"text": "8:45 PM"
				}
			],
			"subRefList": [
				{
					"key": "102110",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100600",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100601",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102111",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100602",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100603",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102112",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100604",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100618",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102113",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100632",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100646",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102114",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100605",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100619",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102115",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100633",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100647",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102116",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100606",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100620",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102117",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100634",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100648",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102118",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100607",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100621",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102119",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100635",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100649",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102120",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200188",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200189",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102121",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200190",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200191",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102122",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100608",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100622",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102123",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100636",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100650",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102124",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100609",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100623",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102125",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100637",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100651",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102126",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100610",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100624",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102127",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100638",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100652",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102128",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100611",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100625",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102129",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100639",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100653",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102130",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100612",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100626",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102131",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100640",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100654",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102132",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100613",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100627",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102133",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100641",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100655",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102134",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100614",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100628",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102135",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100642",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100656",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102136",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100615",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100629",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102137",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100643",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100657",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "102138",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200192",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200193",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200194",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200195",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200196",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200197",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200198",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200199",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200200",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200201",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200202",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200203",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200204",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200205",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200206",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200207",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200208",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200209",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200210",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200211",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200212",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200213",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200214",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200215",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "activity.rank",
			"refList": [
				{
					"value": "100060",
					"text": "Low"
				},
				{
					"value": "100061",
					"text": "Medium"
				},
				{
					"value": "100062",
					"text": "High"
				}
			],
			"subRefList": [
				{
					"key": "100060",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100061",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100062",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "activity.status",
			"refList": [
				{
					"value": "100070",
					"text": "Open"
				},
				{
					"value": "100074",
					"text": "Left Message"
				},
				{
					"value": "100075",
					"text": "No Answer"
				},
				{
					"value": "100071",
					"text": "Confirmed"
				},
				{
					"value": "100072",
					"text": "Completed"
				},
				{
					"value": "100078",
					"text": "No Response"
				},
				{
					"value": "100076",
					"text": "Bad Phone #"
				},
				{
					"value": "100073",
					"text": "No Show"
				},
				{
					"value": "100079",
					"text": "Cancelled"
				},
				{
					"value": "100080",
					"text": "Unreported Show"
				},
				{
					"value": "100081",
					"text": "Incomplete"
				},
				{
					"value": "100082",
					"text": "Skipped"
				},
				{
					"value": "200366",
					"text": "Not in Market"
				}
			],
			"subRefList": [
				{
					"key": "100070",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100074",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100075",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100071",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100072",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100078",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100076",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100073",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100079",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100080",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100081",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100082",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200366",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "activity.tracking",
			"refList": [
				{
					"value": "1600",
					"text": "Unsold Prospect Follow Up"
				},
				{
					"value": "1601",
					"text": "High Mileage Sales Opportunity"
				},
				{
					"value": "1602",
					"text": "Lease Renewal Opportunity"
				},
				{
					"value": "1603",
					"text": "Sold Customer Follow Up"
				},
				{
					"value": "1604",
					"text": "Sold Customer CSI"
				},
				{
					"value": "1605",
					"text": "Customer Retention"
				},
				{
					"value": "1606",
					"text": "Service Customer CSI  (Blue Oval)"
				},
				{
					"value": "1607",
					"text": "Service Reminder"
				},
				{
					"value": "1608",
					"text": "Extended Warranty Up Sell"
				},
				{
					"value": "1609",
					"text": "Birthday"
				},
				{
					"value": "200357",
					"text": "SOP"
				},
				{
					"value": "200081",
					"text": "Hot Prospect"
				}
			],
			"subRefList": [
				{
					"key": "1600",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1601",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1602",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1603",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1604",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1605",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1606",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1607",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1608",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1609",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200357",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200081",
					"refList": [],
					"subRefList": []
				}
			]
		},
		{
			"key": "activity.transportation",
			"refList": [],
			"subRefList": []
		},
		{
			"key": "activity.type",
			"refList": [
				{
					"value": "100120",
					"text": "Outbound Call"
				},
				{
					"value": "100123",
					"text": "Appointment"
				},
				{
					"value": "100125",
					"text": "Run Credit Report"
				},
				{
					"value": "100124",
					"text": "Survey"
				},
				{
					"value": "100122",
					"text": "Escalated"
				},
				{
					"value": "100126",
					"text": "Update Your Event"
				},
				{
					"value": "111127",
					"text": "Send Email"
				},
				{
					"value": "100121",
					"text": "Other"
				},
				{
					"value": "100127",
					"text": "Inventory Search"
				},
				{
					"value": "111126",
					"text": "Read Work Notes"
				},
				{
					"value": "200000",
					"text": "Email Received"
				},
				{
					"value": "200001",
					"text": "Web Lead"
				},
				{
					"value": "200002",
					"text": "Inbound Call"
				},
				{
					"value": "200059",
					"text": "1-on-1"
				},
				{
					"value": "200348",
					"text": "Appt Confirm"
				},
				{
					"value": "200349",
					"text": "Unsold Traffic"
				},
				{
					"value": "200350",
					"text": "No Appt Follow Up"
				},
				{
					"value": "1003541",
					"text": "eBrochure Request"
				},
				{
					"value": "1003552",
					"text": "Service Commitment"
				},
				{
					"value": "1004516",
					"text": "Skate Alert"
				},
				{
					"value": "200004",
					"text": "Price Alert"
				}
			],
			"subRefList": [
				{
					"key": "100120",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100123",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100125",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100124",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100122",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100126",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "111127",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100121",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "100127",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "111126",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200000",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200001",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200002",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200059",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200348",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200349",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200350",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1003541",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1003552",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "1004516",
					"refList": [],
					"subRefList": []
				},
				{
					"key": "200004",
					"refList": [],
					"subRefList": []
				}
			]
		}
	];

/***/ },

/***/ 877:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../typings/index.d.ts"/>
	var sitesJson = __webpack_require__(878);
	var taskFiltersJson = __webpack_require__(879);
	var opportunityFiltersJson = __webpack_require__(880);
	var FilterDropdowns = (function () {
	    function FilterDropdowns() {
	    }
	    FilterDropdowns.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var sitesEndpoint = '/franchise/employeeDashboard';
	        var taskFiltersEndpoint = '/shim/getTaskFilters';
	        var opportunityFiltersEndpoint = '/shim/getOpportunityFilters';
	        $httpBackend.whenGET(new RegExp(sitesEndpoint)).respond(function (method, url, data, headers) {
	            return [200, sitesJson];
	        });
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + taskFiltersEndpoint)).respond(function (method, url, data, headers) {
	            return [200, taskFiltersJson];
	        });
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + opportunityFiltersEndpoint)).respond(function (method, url, data, headers) {
	            return [200, opportunityFiltersJson];
	        });
	    };
	    return FilterDropdowns;
	}());
	module.exports = FilterDropdowns;


/***/ },

/***/ 878:
/***/ function(module, exports) {

	module.exports = [
		{
			"value": "154",
			"text": "Ken Garff Honda"
		}
	];

/***/ },

/***/ 879:
/***/ function(module, exports) {

	module.exports = [
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "You've Got Mail",
			"id": 2931
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Service Appts Yesterday",
			"id": 546
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Service Appts Today",
			"id": 545
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Service Appts Last Week",
			"id": 547
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Service Appts (Tomorrow)",
			"id": 739
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Sales Team Steve",
			"id": 872
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Sales Team Rhett",
			"id": 837
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Sales Team Lance",
			"id": 838
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Sales Team Honda",
			"id": 434
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Price Alerts",
			"id": 2965
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Price Alerts",
			"id": 2966
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "No Show Appts (Previous Day)",
			"id": 741
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My To Dos (Due Next 7 Days)",
			"id": 256
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My To Do (Completed Yesterday)",
			"id": 576
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My To Do (Completed Today)",
			"id": 575
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My Open To Dos (All)",
			"id": 257
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Lucy's Open To-Dos",
			"id": 2766
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Ernie's Open To-Dos",
			"id": 2765
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Email Received",
			"id": 2964
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Email received",
			"id": 2963
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "BDC To Do's",
			"id": 2933
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "BDC Internet To Do's",
			"id": 1059
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "All TIM To-Dos",
			"id": 2809
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "Service Appts Tomorrow",
			"id": 567
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "My Open Appts (Tomorrow)",
			"id": 738
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "All Open Appts (Tomorrow)",
			"id": 737
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "All Open Appts (Today)",
			"id": 413
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "All Open Appointments",
			"id": 661
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "All No Show Appointments",
			"id": 265
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "All Confirmed Appointments",
			"id": 263
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "All Completed Appointments",
			"id": 264
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Untouched TIM Leads",
			"id": 2735
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Billys Activity Test",
			"id": 3061
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1410,
			"filterCategory": "Service Opportunities",
			"name": "Sale No Service",
			"id": 770
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1410,
			"filterCategory": "Service Opportunities",
			"name": "Past Due Committments",
			"id": 2303
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1410,
			"filterCategory": "Service Opportunities",
			"name": "Open Service Commitments",
			"id": 2261
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1410,
			"filterCategory": "Service Opportunities",
			"name": "10-Day Service Commitment Calls",
			"id": 2238
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1411,
			"filterCategory": "Quality Assurance (CSI)",
			"name": "Taylors outbound calls",
			"id": 1033
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1409,
			"filterCategory": "Other",
			"name": "Today's Incoming Emails",
			"id": 2767
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1409,
			"filterCategory": "Other",
			"name": "Brad Test (open phone calls)",
			"id": 2943
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "08-7-Day Uncontacted Lead Follow-Up",
			"id": 2414
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "07-30-Day Contacted Unsold Follow-Up",
			"id": 2417
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "06-7-Day Store Visit Unsold Follow-up",
			"id": 2421
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "05-Lost Prospect Review",
			"id": 2429
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "04-Appointment Confirmation Calls",
			"id": 2433
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "03-No Show Appointment Calls",
			"id": 2438
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "02-Unsold Appointment Calls",
			"id": 2442
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": true,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My To Do (Today & Older)",
			"id": 249
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My Open Service ToDos",
			"id": 2269
		}
	];

/***/ },

/***/ 880:
/***/ function(module, exports) {

	module.exports = [
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "ZZZ Test filter - Frank 07/29/2015",
			"id": 250
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Usher Filter o' Filters",
			"id": 2942
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "user789",
			"id": 3006
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Trudy Test 2",
			"id": 3040
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "tkm_Test123",
			"id": 3034
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "testtttttt",
			"id": 3013
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "testtootsie",
			"id": 3014
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "testtest",
			"id": 3017
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "testtara",
			"id": 3016
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "testshane2",
			"id": 3011
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "TestShane",
			"id": 3010
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "testfilters",
			"id": 3008
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "testfilters",
			"id": 3021
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Test for D-17608 Sprint",
			"id": 2974
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Test Filter By Last Name",
			"id": 3028
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Test Filter",
			"id": 3037
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "test filter",
			"id": 3020
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "TEst",
			"id": 3030
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "test",
			"id": 3007
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "test",
			"id": 3018
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "taratest7777",
			"id": 3009
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "taratest123",
			"id": 3005
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "taratest",
			"id": 3019
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Tarafilter7777",
			"id": 3004
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Tarafilter",
			"id": 3003
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Stephan Tester",
			"id": 3022
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Stephan Test 12121",
			"id": 3036
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Stephan Test 02/18",
			"id": 3058
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "ScrumReportTest",
			"id": 2954
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Recent Leads (Past Week)",
			"id": 2939
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Over 30 days",
			"id": 2990
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "new filter",
			"id": 3015
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Nathan Test3",
			"id": 3042
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Nathan Test",
			"id": 3041
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "myFirstNameTest",
			"id": 3026
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My Open Service Events",
			"id": 2270
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": true,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "My Open Events",
			"id": 3025
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "June Open Events",
			"id": 2959
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "jones 2",
			"id": 3039
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Giant Test 2",
			"id": 2988
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "First Name test",
			"id": 3027
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "Fargo regression testing of RT-07151",
			"id": 2984
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "dailyrespfilter",
			"id": 3049
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "cffda",
			"id": 3060
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "BDC Assigned ",
			"id": 2161
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "bada",
			"id": 3055
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "0000 Test Franklin",
			"id": 3031
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1400,
			"filterCategory": "Daily Responsibility",
			"name": "0000 Test",
			"id": 3029
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "Test",
			"id": 3046
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "Test",
			"id": 3048
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "Slacking",
			"id": 3054
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "please call them",
			"id": 3044
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "Phone Queue",
			"id": 1029
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "hey greg",
			"id": 3053
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "Hello",
			"id": 3056
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "Hello",
			"id": 3057
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "Dima's Shiz",
			"id": 3051
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "call them",
			"id": 3045
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1401,
			"filterCategory": "Phone Call To Dos",
			"name": "All Phone Calls - Past Week",
			"id": 1030
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "tarafilternondeafult",
			"id": 3002
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "tara7777",
			"id": 2994
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1402,
			"filterCategory": "Appointment To Dos",
			"name": "My shiz",
			"id": 3050
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "Yesterdays New Sales Events",
			"id": 267
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "Todays New Sales Events",
			"id": 266
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "Test",
			"id": 3047
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "My Open Split Deals",
			"id": 268
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "My Future Model Vehicles",
			"id": 258
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "C-My 5-Pending F and I Prospects",
			"id": 2152
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "C-My 4-Write-Up Prospects",
			"id": 2151
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "C-My 3-Demo Vehicle Prospects",
			"id": 2150
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "C-My 2-Store Visit Prospects",
			"id": 2149
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "C-My 1-Up/Contacted Prospects",
			"id": 2148
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "C-My 0-Unqualified Prospects",
			"id": 2147
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "B-My Pre-Owned Prospects",
			"id": 1915
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My S2000 Prospects",
			"id": 1913
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Ridgeline Prospects",
			"id": 1914
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Pilot Prospects",
			"id": 1916
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Odyssey Prospects",
			"id": 1917
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Insight Prospects",
			"id": 1922
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Fit Prospects",
			"id": 1923
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Element Prospects",
			"id": 1918
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My CR-V Prospects",
			"id": 1919
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Crosstour Prospects",
			"id": 1924
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Civic Prospects",
			"id": 1920
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1403,
			"filterCategory": "Unsold Traffic",
			"name": "A-My Accord Prospects",
			"id": 1921
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Untouched Webleads",
			"id": 270
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Untouched Webleads",
			"id": 2937
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Untouched Service Webleads",
			"id": 1301
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Untouched Parts Webleads",
			"id": 1302
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Test for Filter from FS11",
			"id": 2956
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Internet Leads (New)",
			"id": 260
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Internet Leads (Active)",
			"id": 261
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "Billys Sales Test",
			"id": 3063
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1404,
			"filterCategory": "Internet Traffic",
			"name": "anything",
			"id": 3052
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "Test",
			"id": 3059
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "My Lost Events",
			"id": 506
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "jones",
			"id": 3038
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost S2000 Deals",
			"id": 1948
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Ridgeline Deals",
			"id": 1929
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Pilot Deals",
			"id": 1930
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Odyssey Deals",
			"id": 1931
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Insight Deals",
			"id": 1932
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Fit Deals",
			"id": 1933
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Element Deals",
			"id": 1934
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost CR-V Deals",
			"id": 1936
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Crosstour Deals",
			"id": 1935
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Civic Deals",
			"id": 1927
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1406,
			"filterCategory": "Lost Opportunities",
			"name": "A-My Lost Accord Deals",
			"id": 1928
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "Sold internet past month",
			"id": 2300
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "Nathan Sold Test 1",
			"id": 3043
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "My Sold Split Deals",
			"id": 269
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "My Sold Deals This Month",
			"id": 254
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "My Sold Deals Past 6 Months",
			"id": 762
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "My Sold Deals Past 45 Days",
			"id": 255
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "My Sold Deals (ALL)",
			"id": 251
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold S2000 Deals",
			"id": 1947
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Ridgeline Deals",
			"id": 1946
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Pilot Deals",
			"id": 1945
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Odyssey Deals",
			"id": 1944
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Insight Deals",
			"id": 1943
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Fit Deals",
			"id": 1942
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Element Deals",
			"id": 1941
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold CR-V Deals",
			"id": 1939
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Crosstour Deals",
			"id": 1940
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Civic Deals",
			"id": 1937
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "A-My Sold Accord Deals",
			"id": 1938
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "All Sold Deals This Month",
			"id": 253
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1407,
			"filterCategory": "Sold Opportunities",
			"name": "All Sold Deals Last Month",
			"id": 252
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1410,
			"filterCategory": "Service Opportunities",
			"name": "Stephan Test 000",
			"id": 3023
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1410,
			"filterCategory": "Service Opportunities",
			"name": "new filter",
			"id": 2977
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1410,
			"filterCategory": "Service Opportunities",
			"name": "Completed Roo's",
			"id": 2153
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1411,
			"filterCategory": "Quality Assurance (CSI)",
			"name": "Z-ALL Open CLO Events",
			"id": 2180
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1411,
			"filterCategory": "Quality Assurance (CSI)",
			"name": "Y-ALL Resolving CLO Events",
			"id": 2181
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1411,
			"filterCategory": "Quality Assurance (CSI)",
			"name": "X-ALL Completed CLO Events",
			"id": 2182
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1411,
			"filterCategory": "Quality Assurance (CSI)",
			"name": "Sarah Test",
			"id": 3024
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1411,
			"filterCategory": "Quality Assurance (CSI)",
			"name": "Open Service QA Events",
			"id": 1027
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1411,
			"filterCategory": "Quality Assurance (CSI)",
			"name": "Completed QA CSI Events",
			"id": 1002
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1009589,
			"filterCategory": "ET regression test",
			"name": "ET regression filter",
			"id": 2975
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "11-Today's Internet Leads",
			"id": 2398
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "10-Yesterday's Internet Leads",
			"id": 2403
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "09-Past Week's Internet Leads",
			"id": 2407
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1005007,
			"filterCategory": "Manager Responsibilities",
			"name": "01- Today's TIM Leads",
			"id": 2400
		},
		{
			"isMyFilter": false,
			"type": 0,
			"isDefault": false,
			"isEnterprise": false,
			"categoryId": 1009595,
			"filterCategory": "**Opportunity Management**",
			"name": "V-All 1-Up/Contacted Prospects",
			"id": 3032
		}
	];

/***/ },

/***/ 881:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var vehicleOfInterestSearchJson = __webpack_require__(882);
	var VehicleOfInterestPostJson = __webpack_require__(883);
	var addVOIBodyStyleRefDefJson = __webpack_require__(884);
	var saveVehicleOfInterestPostJson = __webpack_require__(885);
	var VehicleOfInterest = (function () {
	    function VehicleOfInterest() {
	    }
	    VehicleOfInterest.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var inventorySearchEndpoint = /search\/dealership\((\d+)\)\/InventoryVehicle/;
	        $httpBackend.whenPOST(new RegExp(inventorySearchEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, vehicleOfInterestSearchJson];
	        });
	        // Note: Switching top choice vehicle will use this, so plan for any other vehicles to go away
	        // /shim/SalesOpportunities/VehiclesOfInterest/1815458/3310693/5372043
	        var postVehicleOfInterest = /\/shim\/SalesOpportunities\/VehiclesOfInterest\/(\d+)\/(\d+)\/(\d+)/;
	        $httpBackend.whenPOST(new RegExp(postVehicleOfInterest.source)).respond(function (method, url, data, headers) {
	            return [200, VehicleOfInterestPostJson];
	        });
	        var addVOIBodyStyleRefDefsEndpoint = /\/shim\/RefDefs\/VehicleOfInterest\/BodyStyles/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + addVOIBodyStyleRefDefsEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, addVOIBodyStyleRefDefJson];
	        });
	        var saveVehicleOfInterest = /\/shim\/SalesOpportunities\/ManualVehicleOfInterest\/(\d+)\/(\d+)/;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrlRegex.source + saveVehicleOfInterest.source)).respond(function (method, url, data, headers) {
	            return [200, saveVehicleOfInterestPostJson];
	        });
	    };
	    return VehicleOfInterest;
	}());
	module.exports = VehicleOfInterest;


/***/ },

/***/ 882:
/***/ function(module, exports) {

	module.exports = {
		"took": 14,
		"timed_out": false,
		"_shards": {
			"total": 5,
			"successful": 5,
			"failed": 0
		},
		"hits": {
			"total": 333,
			"max_score": 0,
			"hits": [
				{
					"_index": "database-154-0-0-0-151",
					"_type": "inventoryvehicle",
					"_id": "5400416",
					"_score": 1,
					"_source": {
						"$type": "InventoryVehicle Vehicle",
						"Id": 5400416,
						"NewUsedCpo": "New",
						"Mileage": 0,
						"Prices": {
							"$type": "PriceCollection",
							"MSRP": 0,
							"Sales": 39585,
							"Internet": 0,
							"Advertised": 0
						},
						"BodyClass": "SUV",
						"ExteriorColor": {
							"$type": "Color",
							"Name": ""
						},
						"InteriorColor": {
							"$type": "Color",
							"Name": ""
						},
						"EngineSize": "V6 Cylinder Engine",
						"Transmission": "6-Speed A/T",
						"EBrochureLink": "/NewEbrochure/eBrochure/Index?SiteID=jfF3LdByNbQ=&InventoryID=9OuVqhct5DE=&RemoteSiteID=jfF3LdByNbQ=",
						"ReceiveDate": "2014-10-15T14:37:10.727",
						"Trim": "4WD 4dr EX-L w/Honda Sensing",
						"LotLocation": "",
						"DealershipId": 154,
						"FranchiseName": "Dealersocket",
						"Deleted": false,
						"Make": "Honda",
						"Model": "Pilot",
						"Year": 2016,
						"Plate": "",
						"Vin": "5FNYF6H62GB033963 ",
						"StockNumber": "1H60295 ",
						"Image": null
					},
					"highlight": {
						"Trim": [
							"4WD 4dr EX-L w/<span class='text-highlight'>Honda</span> Sensing"
						],
						"Make": [
							"<span class='text-highlight'>Honda</span>"
						]
					}
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "inventoryvehicle",
					"_id": "5400403",
					"_score": 1,
					"_source": {
						"$type": "InventoryVehicle Vehicle",
						"Id": 5400403,
						"NewUsedCpo": "New",
						"Mileage": 0,
						"Prices": {
							"$type": "PriceCollection",
							"MSRP": 0,
							"Sales": 31390,
							"Internet": 0,
							"Advertised": 0
						},
						"BodyClass": "Sedan",
						"ExteriorColor": {
							"$type": "Color",
							"Name": ""
						},
						"InteriorColor": {
							"$type": "Color",
							"Name": ""
						},
						"EngineSize": "4 Cylinder Engine",
						"Transmission": "CVT Transmission",
						"EBrochureLink": "/NewEbrochure/eBrochure/Index?SiteID=jfF3LdByNbQ=&InventoryID=sRifrH8KdhQ=&RemoteSiteID=jfF3LdByNbQ=",
						"ReceiveDate": "2015-10-15T14:31:12.88",
						"Trim": "4dr I4 CVT EX-L w/Navi & Honda Sensing",
						"LotLocation": "",
						"DealershipId": 154,
						"FranchiseName": "Ken Garff Honda",
						"Deleted": false,
						"Make": "Honda",
						"Model": "Accord Sedan",
						"Year": 2016,
						"Plate": "",
						"Vin": "1HGCR2F90GA045966 ",
						"StockNumber": "1H60302 ",
						"Image": null
					},
					"highlight": {
						"Trim": [
							"4dr I4 CVT EX-L w/Navi & <span class='text-highlight'>Honda</span> Sensing"
						],
						"Make": [
							"<span class='text-highlight'>Honda</span>"
						]
					}
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "inventoryvehicle",
					"_id": "5529144",
					"_score": 1,
					"_source": {
						"$type": "InventoryVehicle Vehicle",
						"Id": 5529144,
						"NewUsedCpo": "New",
						"Mileage": 11,
						"Prices": {
							"$type": "PriceCollection",
							"MSRP": 26785,
							"Sales": 26785,
							"Internet": 25315,
							"Advertised": 0
						},
						"BodyClass": "Sedan",
						"ExteriorColor": {
							"$type": "Color",
							"Name": "San Marino Red"
						},
						"InteriorColor": {
							"$type": "Color",
							"Name": "Black"
						},
						"EngineSize": "4 Cylinder Engine",
						"Transmission": "CVT",
						"EBrochureLink": "/NewEbrochure/eBrochure/Index?SiteID=jfF3LdByNbQ=&InventoryID=Qg9sjoBGgR8=&RemoteSiteID=jfF3LdByNbQ=",
						"ReceiveDate": "2015-09-20T00:00:00",
						"Trim": "4dr I4 CVT Sport w/Honda Sensing",
						"LotLocation": "",
						"DealershipId": 154,
						"FranchiseName": "Ken Garff Honda",
						"Deleted": false,
						"Make": "Honda",
						"Model": "Accord Sedan",
						"Year": 2016,
						"Plate": "",
						"Vin": "1HGCR2F61GA028017",
						"StockNumber": "1H60206",
						"Image": "http://media.carbook.com/MediaGallery/media/Mjg2MDk0Xk1lZGlhIEdhbGxlcnk/ABTc9rKOGdxW_ubtNhj34XEJGkT2KknyKz_ZJ9ZjP7V8enrfCAQT1yiXlkOq5k5Q/2016HOC010008_1280_01.png"
					},
					"highlight": {
						"Trim": [
							"4dr I4 CVT Sport w/<span class='text-highlight'>Honda</span> Sensing"
						],
						"Make": [
							"<span class='text-highlight'>Honda</span>"
						]
					}
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "inventoryvehicle",
					"_id": "5532072",
					"_score": 1,
					"_source": {
						"$type": "InventoryVehicle Vehicle",
						"Id": 5532072,
						"NewUsedCpo": "New",
						"Mileage": 11,
						"Prices": {
							"$type": "PriceCollection",
							"MSRP": 39585,
							"Sales": 39585,
							"Internet": 39585,
							"Advertised": 20000
						},
						"BodyClass": "SUV",
						"ExteriorColor": {
							"$type": "Color",
							"Name": "Polished Metal Metallic"
						},
						"InteriorColor": {
							"$type": "Color",
							"Name": "Gray"
						},
						"EngineSize": "V6 Cylinder Engine",
						"Transmission": "6-Speed Automatic",
						"EBrochureLink": "/NewEbrochure/eBrochure/Index?SiteID=jfF3LdByNbQ=&InventoryID=P39L+e9Dp3w=&RemoteSiteID=jfF3LdByNbQ=",
						"ReceiveDate": "2015-10-02T00:00:00",
						"Trim": "4WD 4dr EX-L w/Honda Sensing",
						"LotLocation": "",
						"DealershipId": 154,
						"FranchiseName": "Ken Garff Honda",
						"Deleted": false,
						"Make": "Honda",
						"Model": "Pilot",
						"Year": 2016,
						"Plate": "",
						"Vin": "5FNYF6H64GB032250",
						"StockNumber": "1H60253",
						"Image": "http://media.carbook.com/MediaGallery/media/Mjg2MDk0Xk1lZGlhIEdhbGxlcnk/mF4hB5-LjQIFoY7D10vVA81FyUnvHW84vMdZtBYv6IeO5dj5ILWJpkIEjsfVuopQ/2016HOS030009_1280_01.png"
					},
					"highlight": {
						"Trim": [
							"4WD 4dr EX-L w/<span class='text-highlight'>Honda</span> Sensing"
						],
						"Make": [
							"<span class='text-highlight'>Honda</span>"
						]
					}
				},
				{
					"_index": "database-154-0-0-0-151",
					"_type": "inventoryvehicle",
					"_id": "5508023",
					"_score": 0,
					"_source": {
						"$type": "InventoryVehicle Vehicle",
						"Id": 5508023,
						"NewUsedCpo": "New",
						"Mileage": 11,
						"Prices": {
							"$type": "PriceCollection",
							"MSRP": 42161,
							"Sales": 42161,
							"Internet": 42161,
							"Advertised": 0
						},
						"BodyClass": "SUV",
						"ExteriorColor": {
							"$type": "Color",
							"Name": "Crystal Black Pearl"
						},
						"InteriorColor": {
							"$type": "Color",
							"Name": "Black"
						},
						"EngineSize": "V6 Cylinder Engine",
						"Transmission": "6-Speed Automatic",
						"EBrochureLink": "/NewEbrochure/eBrochure/Index?SiteID=jfF3LdByNbQ=&InventoryID=UF3yw3e1X4E=&RemoteSiteID=jfF3LdByNbQ=",
						"ReceiveDate": "2015-07-15T00:00:00",
						"Trim": "4WD 4dr EX-L",
						"LotLocation": "",
						"DealershipId": 154,
						"FranchiseName": "Ken Garff Honda",
						"Deleted": false,
						"Make": "Honda",
						"Model": "Pilot",
						"Year": 2016,
						"Plate": "",
						"Vin": "5FNYF6H52GB011615",
						"StockNumber": "1H60064",
						"Image": "http://media.carbook.com/MediaGallery/media/Mjg2MDk0Xk1lZGlhIEdhbGxlcnk/mF4hB5-LjQIFoY7D10vVA81FyUnvHW84be8MQqYOxddTREekrCcUcYLmdJaFry9Q/2016HOS030009_2100_01.png"
					},
					"highlight": {
						"Make": [
							"<span class='text-highlight'>Honda</span>"
						]
					}
				}
			]
		},
		"aggregations": null
	};

/***/ },

/***/ 883:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "VehicleOfInterest",
			"Id": "973788",
			"StockNumber": "1H40387",
			"Vin": "5FNRL5H69EB055365",
			"Make": "Honda",
			"Model": "Odyssey",
			"Trim": "",
			"Year": "2014",
			"PurchasedDate": null,
			"Status": false,
			"Engine": "V6 Cylinder Engine",
			"Transmission": "6-Speed A/T",
			"Style": null,
			"FuelEfficiency": null,
			"Odometer": "11",
			"Cylinders": 0,
			"ExteriorColor": null,
			"InteriorColor": null,
			"LastServiced": null,
			"ServiceEvents": null,
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"ImageUrls": [
				"http://media.carbook.com/MediaGallery/media/Mjg2MDk0Xk1lZGlhIEdhbGxlcnk/iY_tcBIkJu-hy8TQRa_nOTxAbEXvQuZK24rk5-FdRA2-xsu5ViGy0Q/2014HON010b_320_12.jpg"
			],
			"Preferred": true,
			"MSRP": "38055",
			"Price": "$38,055",
			"ModelCode": "RL5H6EJXW",
			"Class": {
				"value": "-1",
				"text": ""
			},
			"AdditionalOptions": "4.25 Axle Ratio|17'' x 7'' Alloy Wheels|Heated Front Bucket Seats|Leather Seat Trim|4-Wheel Disc Brakes|Air Conditioning|Electronic Stability Control|Front Bucket Seats|Leather Shift Knob|Spoiler|Tachometer|3rd row seats: split-bench|ABS brakes|Anti-whipl",
			"Exterior": "Crystal Black Pearl",
			"Interior": "",
			"Drivetrain": "Front Wheel Drive",
			"CashDown": "$",
			"LotLocation": "",
			"Franchise": "Ken Garff Honda",
			"FuelType": "Gasoline Fuel",
			"CityMiles": "19",
			"HighwayMiles": "28",
			"Condition": "New",
			"DaysOnLot": "860"
		}
	];

/***/ },

/***/ 884:
/***/ function(module, exports) {

	module.exports = [
		{
			"value": "1",
			"text": "Coupe"
		},
		{
			"value": "2",
			"text": "Sedan"
		},
		{
			"value": "3",
			"text": "Pickup Truck"
		}
	];

/***/ },

/***/ 885:
/***/ function(module, exports) {

	module.exports = [
		{
			"$type": "Vehicle",
			"Id": "",
			"Vin": "",
			"Year": 2016,
			"Make": "Toyota",
			"Model": "Tundra",
			"Price": 20000,
			"DateAdded": "",
			"Preferred": false,
			"MSRP": 0,
			"ModelCode": "",
			"Class": {
				"value": "3",
				"text": "Pickup Truck"
			},
			"AdditionalOptions": "",
			"ExteriorColor": "Phantom Gray Pearl",
			"InteriorColor": "Dark Charcoal",
			"Drivetrain": "",
			"CashDown": 500,
			"LotLocation": "",
			"Franchise": "",
			"FuelType": "Gasoline Fuel",
			"Trim": "RegCab V8 SR5 4WD (SE)",
			"CityMiles": 14,
			"HighwayMiles": 17,
			"Condition": "N",
			"DaysOnLot": 0,
			"Odometer": 50000,
			"Transmission": "4-Speed A/T"
		}
	];

/***/ },

/***/ 886:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var duplicateIndividualJson = __webpack_require__(887);
	var DuplicateIndividual = (function () {
	    function DuplicateIndividual() {
	    }
	    DuplicateIndividual.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var duplicatesIndividual = /\/shim\/duplicates/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + duplicatesIndividual.source)).respond(function (method, url, data, headers) {
	            return [200, duplicateIndividualJson];
	        });
	    };
	    return DuplicateIndividual;
	}());
	module.exports = DuplicateIndividual;


/***/ },

/***/ 887:
/***/ function(module, exports) {

	module.exports = [
		{
			"Id": "1684866",
			"Address": {
				"$type": "Address",
				"Address1": "",
				"Address2": "",
				"Address3": "",
				"City": "",
				"State": "UT",
				"PostalCode": "",
				"County": "",
				"Country": "",
				"isComplete": false
			},
			"Email": [],
			"SocialMedia": {
				"$type": "SocialMediaCollection",
				"Other": null,
				"Facebook": null,
				"Twitter": null,
				"LinkedIn": null
			},
			"Note": "",
			"ImgUrl": "",
			"Connections": null,
			"Active": false,
			"Deleted": false,
			"Created": null,
			"Source": null,
			"Status": null,
			"ContactType": null,
			"ContactSubtype": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"GlobalId": null,
			"ExternalReferences": [],
			"GmInfo": {
				"GmState": null,
				"SurrogateId": null
			},
			"$type": "Person",
			"Name": {
				"$type": "PersonName",
				"First": "Bester",
				"Middle": "",
				"Last": "Tester",
				"Friendly": "",
				"Phonetic": "",
				"Prefix": null,
				"Suffix": ""
			},
			"Phones": {
				"$type": "PersonPhoneCollection",
				"Home": null,
				"Work": {
					"$type": "Phone",
					"Number": "(674) 807-8070",
					"Extension": null,
					"Preferred": false
				},
				"Mobile": {
					"$type": "Phone",
					"Number": "(674) 807-8070",
					"Extension": null,
					"Preferred": false
				},
				"Fax": null,
				"Other": null,
				"DncOption": ""
			},
			"Birthday": "",
			"Gender": "",
			"DriversLicense": "",
			"CompanyName": "",
			"ExternalReferenceId": "",
			"PreferredLanguage": null,
			"NeverContactVia": null,
			"Income": null,
			"HasSSN": false
		}
	];

/***/ },

/***/ 888:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var auditLogsJson = __webpack_require__(889);
	var AuditLogs = (function () {
	    function AuditLogs() {
	    }
	    AuditLogs.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var auditLogs = /\/shim\/audit-logs\/contact\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + auditLogs.source)).respond(function (method, url, data, headers) {
	            return [200, auditLogsJson];
	        });
	    };
	    return AuditLogs;
	}());
	module.exports = AuditLogs;


/***/ },

/***/ 889:
/***/ function(module, exports) {

	module.exports = [
		{
			"EntryDateTime": "3/6/2014 10:16:44 AM",
			"Entries": [
				"Update By: fsrmcbride                     Update Date: Mar  6 2014 10:16AM ***** Contact Info: Frederick Von Test 123 Fake St RIVERSIDE PR   92509 Home Phone: 1234567899 Work Phone: 1123456789 Mobile Phone: 9876543211 Email Address: rmcbride@dealersocket.com NeverContactType:  ",
				"",
				""
			]
		},
		{
			"EntryDateTime": "9/23/2013 4:26:32 PM",
			"Entries": [
				"Insert By: fsrmcbride Insert Date: Sep 23 2013  4:26PM ***** Contact Info: Frederick Von Test 123 Fake St Riverside PR   92509 Home Phone: 1234567899 Work Phone: 1123456789 Mobile Phone: 9876543211 Email Address:  NeverContactType: 314 "
			]
		}
	];

/***/ },

/***/ 890:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var auditLogJson = __webpack_require__(891);
	var SalesAuditLog = (function () {
	    function SalesAuditLog() {
	    }
	    SalesAuditLog.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var auditLog = /\/shim\/audit-logs\/sales-opp\/(\d+)\/(\d+)/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + auditLog.source)).respond(function (method, url, data, headers) {
	            return [200, auditLogJson];
	        });
	    };
	    return SalesAuditLog;
	}());
	module.exports = SalesAuditLog;


/***/ },

/***/ 891:
/***/ function(module, exports) {

	module.exports = [
		{
			"EntryDateTime": "5/4/2016 5:12 PM",
			"InsertBy": "kggsagen",
			"UpdatedFields": [
				{
					"UpdateFieldName": "status",
					"PriorValue": "2 - Store Visit",
					"NewValue": "4 - Write-Up"
				}
			]
		},
		{
			"EntryDateTime": "5/4/2016 5:12 PM",
			"InsertBy": "kggsagen",
			"UpdatedFields": [
				{
					"UpdateFieldName": "bdc",
					"PriorValue": "0",
					"NewValue": "kgaharper"
				}
			]
		},
		{
			"EntryDateTime": "5/4/2016 4:48 PM",
			"InsertBy": "kggsagen",
			"UpdatedFields": [
				{
					"UpdateFieldName": "assigned",
					"PriorValue": "blank",
					"NewValue": "kggsagen"
				},
				{
					"UpdateFieldName": "type",
					"PriorValue": "blank",
					"NewValue": "New Vehicle"
				},
				{
					"UpdateFieldName": "subtype",
					"PriorValue": "blank",
					"NewValue": "Unknown"
				},
				{
					"UpdateFieldName": "status",
					"PriorValue": "blank",
					"NewValue": "2 - Store Visit"
				},
				{
					"UpdateFieldName": "ranking",
					"PriorValue": "blank",
					"NewValue": "1 - Hot"
				},
				{
					"UpdateFieldName": "source",
					"PriorValue": "blank",
					"NewValue": "Fresh Up"
				},
				{
					"UpdateFieldName": "bdc",
					"PriorValue": "blank",
					"NewValue": "0"
				},
				{
					"UpdateFieldName": "resCode",
					"PriorValue": "blank",
					"NewValue": "None"
				},
				{
					"UpdateFieldName": "salesMgr",
					"PriorValue": "blank",
					"NewValue": "None"
				}
			]
		}
	];

/***/ },

/***/ 892:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var draperPostalCodeLookupJson = __webpack_require__(893);
	var postalCodeLookupJson = __webpack_require__(894);
	var PostalCodeLookup = (function () {
	    function PostalCodeLookup() {
	    }
	    PostalCodeLookup.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var postalCodeEndpoint = /\/shim\/postalLookup\((\d+)\)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + postalCodeEndpoint.source)).respond(function (method, url, data, headers) {
	            var matches = postalCodeEndpoint.exec(url);
	            if (matches[1] == '84020') {
	                return [200, draperPostalCodeLookupJson];
	            }
	            return [200, postalCodeLookupJson];
	        });
	    };
	    return PostalCodeLookup;
	}());
	module.exports = PostalCodeLookup;


/***/ },

/***/ 893:
/***/ function(module, exports) {

	module.exports = {
		"state": "UT",
		"counties": [
			"SALT LAKE",
			"UTAH"
		],
		"cities": [
			"DRAPER",
			"SANDY",
			"UNINCORPORATED"
		]
	};

/***/ },

/***/ 894:
/***/ function(module, exports) {

	module.exports = {
		"state": "UT",
		"counties": [
			"UTAH"
		],
		"cities": [
			"OREM",
			"LINDON",
			"PROVO"
		]
	};

/***/ },

/***/ 895:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var CreditApplication = (function () {
	    function CreditApplication() {
	        this.creditApplicationData = __webpack_require__(896);
	    }
	    CreditApplication.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        var creditApplicationUrl = /\/shim\/creditapp\/(\d+)/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + creditApplicationUrl.source)).respond(function (method, url, data, headers) {
	            var contactId = creditApplicationUrl.exec(url)[1];
	            var data = contactId == "11111" ? _this.creditApplicationData.badUrl : _this.creditApplicationData.url;
	            return [200, data];
	        });
	    };
	    return CreditApplication;
	}());
	module.exports = CreditApplication;


/***/ },

/***/ 896:
/***/ function(module, exports) {

	module.exports = {
		"url": "about:blank",
		"badUrl": null
	};

/***/ },

/***/ 897:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var surveyJson = __webpack_require__(898);
	var surveyPermissionJson = __webpack_require__(899);
	var SalesOpportunitySurveys = (function () {
	    function SalesOpportunitySurveys() {
	    }
	    SalesOpportunitySurveys.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var surveys = /\/shim\/surveys\/sales-opp\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrl + surveys.source)).respond(function (method, url, data, headers) {
	            return [200, surveyJson];
	        });
	        var surveysPermission = /\/shim\/SalesOpportunitySurveys\/permissions\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrl + surveysPermission.source)).respond(function (method, url, data, headers) {
	            return [200, surveyPermissionJson];
	        });
	    };
	    return SalesOpportunitySurveys;
	}());
	module.exports = SalesOpportunitySurveys;


/***/ },

/***/ 898:
/***/ function(module, exports) {

	module.exports = [
		{
			"Name": "Test Survey 1",
			"Url": "http://www.dealersocket.com"
		},
		{
			"Name": "Test Survey 2",
			"Url": "http://www.google.com"
		}
	];

/***/ },

/***/ 899:
/***/ function(module, exports) {

	module.exports = {
		"restricted": false
	};

/***/ },

/***/ 900:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var checklistJson = __webpack_require__(901);
	var viewPermissionsJson = __webpack_require__(902);
	var addRemoveEditPermissionsJson = __webpack_require__(903);
	var SalesChecklist = (function () {
	    function SalesChecklist() {
	    }
	    SalesChecklist.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var checklist = /\/shim\/SalesOpportunities\/(\d+)\/(\d+)\/Checklist/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrl + checklist.source)).respond(function (method, url, data, headers) {
	            return [200, checklistJson];
	        });
	        var viewPermissions = /\/shim\/SalesOpportunities\/(\d+)\/(\d+)\/Checklist\/Permissions\/View/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrl + viewPermissions.source)).respond(function (method, url, data, headers) {
	            return [200, viewPermissionsJson];
	        });
	        var addRemoveEditPermissions = /\/shim\/SalesOpportunity\/(\d+)\/(\d+)\/Checklist\/Permissions\/AddEditRemove/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrl + addRemoveEditPermissions.source)).respond(function (method, url, data, headers) {
	            return [200, addRemoveEditPermissionsJson];
	        });
	    };
	    return SalesChecklist;
	}());
	module.exports = SalesChecklist;


/***/ },

/***/ 901:
/***/ function(module, exports) {

	module.exports = [
		{
			"Name": "Test Checklist Item 1",
			"Completed": true,
			"Files": []
		},
		{
			"Name": "Test Checklist Item 2",
			"Completed": false,
			"Files": []
		}
	];

/***/ },

/***/ 902:
/***/ function(module, exports) {

	module.exports = {
		"restricted": false
	};

/***/ },

/***/ 903:
/***/ function(module, exports) {

	module.exports = {
		"add": false,
		"remove": false,
		"edit": true
	};

/***/ },

/***/ 904:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var CsiAuditLogs = (function () {
	    function CsiAuditLogs() {
	    }
	    CsiAuditLogs.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var auditLogs = /\/shim\/audit-logs\/csi\/(\d+)\/(\d+)/i;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + auditLogs.source)).respond(function (method, url, data, headers) {
	            return [200, __webpack_require__(905)];
	        });
	    };
	    return CsiAuditLogs;
	}());
	module.exports = CsiAuditLogs;


/***/ },

/***/ 905:
/***/ function(module, exports) {

	module.exports = [
		{
			"EntryDateTime": "6/3/2016 10:54 AM",
			"InsertBy": "fskarlt",
			"UpdatedFields": [
				{
					"UpdateFieldName": "assigned",
					"PriorValue": "fsmlawton",
					"NewValue": "fskarlt"
				},
				{
					"UpdateNameField": "source",
					"PriorValue": "Walk-in",
					"NewValue": "Phone"
				}
			]
		},
		{
			"EntryDateTime": "5/23/2016 1:42 PM",
			"InsertBy": "fsmlawton",
			"UpdatedFields": [
				{
					"UpdateFieldName": "assigned",
					"PriorValue": "blank",
					"NewValue": "fsmlawton"
				}
			]
		}
	];

/***/ },

/***/ 906:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../../typings/index.d.ts"/>
	var convertOpportunityTypePermissionJson = __webpack_require__(907);
	var convertOpportunityTypeIsValidJson = __webpack_require__(908);
	var convertOpportunityTypeJson = __webpack_require__(909);
	var ConvertOpportunityType = (function () {
	    function ConvertOpportunityType() {
	    }
	    ConvertOpportunityType.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var viewPermissions = /\/shim\/Permissions\/ConvertOpportunityType\/(\d+)\/(\d+)\/(\w+)/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrl + viewPermissions.source)).respond(function (method, url, data, headers) {
	            return [200, convertOpportunityTypePermissionJson];
	        });
	        var typeIsValid = /\/shim\/ConvertOpportunityTypeIsValid\/(\d+)\/(\d+)\/(\w+)/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrl + typeIsValid.source)).respond(function (method, url, data, headers) {
	            return [200, convertOpportunityTypeIsValidJson];
	        });
	        var opportunityType = /\/shim\/ConvertOpportunityType\/(\d+)\/(\d+)\/(\w+)\/(\w+)/;
	        $httpBackend.whenPOST(new RegExp(shimBaseUrl + opportunityType.source)).respond(function (method, url, data, headers) {
	            return [200, convertOpportunityTypeJson];
	        });
	    };
	    return ConvertOpportunityType;
	}());
	module.exports = ConvertOpportunityType;


/***/ },

/***/ 907:
/***/ function(module, exports) {

	module.exports = {
		"CanView": true
	};

/***/ },

/***/ 908:
/***/ function(module, exports) {

	module.exports = {
		"IsSuccess": true,
		"Message": null
	};

/***/ },

/***/ 909:
/***/ function(module, exports) {

	module.exports = {
		"IsSuccess": true,
		"Message": null
	};

/***/ },

/***/ 910:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var PrintForms = (function () {
	    function PrintForms() {
	        this.printFormsData = __webpack_require__(911);
	    }
	    PrintForms.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        var auditLog = /\/shim\/printforms\/(\d+)\/(\d+)/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + auditLog.source)).respond(function (method, url, data, headers) {
	            return [200, _this.printFormsData.url];
	        });
	    };
	    return PrintForms;
	}());
	module.exports = PrintForms;


/***/ },

/***/ 911:
/***/ function(module, exports) {

	module.exports = {
		"url": "about:blank"
	};

/***/ },

/***/ 912:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../../typings/index.d.ts"/>
	"use strict";
	var serviceEventDropDowns = __webpack_require__(913);
	var serviceEventSingle = __webpack_require__(914);
	var serviceEvents = (function () {
	    function serviceEvents() {
	    }
	    serviceEvents.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var serviceEventDropDown = /\/shim\/service\/refdefs/i;
	        $httpBackend.whenGET(new RegExp(serviceEventDropDown.source)).respond(function (method, url, data, headers) {
	            return [200, serviceEventDropDowns];
	        });
	        var vehicleSaveEndpoint = /\/customer\/serviceapp\/(\d+)\/(\d+)\/(\d+)\/customerVehicle\/save/i;
	        $httpBackend.whenPOST(new RegExp(vehicleSaveEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, saveVehicle(data)];
	        });
	        var serviceEventSaveEndpoint = /\/shim\/service\/saveEvent/i;
	        $httpBackend.whenPOST(new RegExp(serviceEventSaveEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, saveServiceEvent(data)];
	        });
	        var serviceEventGetEndpoint = /\/shim\/service\/get/i;
	        $httpBackend.whenGET(new RegExp(serviceEventGetEndpoint.source)).respond(function (method, url, data, headers) {
	            return [200, serviceEventSingle];
	        });
	        function saveVehicle(data) {
	            data.id = 1;
	            return data;
	        }
	        function saveServiceEvent(data) {
	            var result = {
	                Id: 1
	            };
	            return result;
	        }
	    };
	    return serviceEvents;
	}());
	module.exports = serviceEvents;


/***/ },

/***/ 913:
/***/ function(module, exports) {

	module.exports = {
		"Type": [
			{
				"value": "100159",
				"text": "Monthly Summary/Raving Fan"
			},
			{
				"value": "100158",
				"text": "Scheduling"
			},
			{
				"value": "1004546",
				"text": "Performance"
			},
			{
				"value": "1004581",
				"text": "CarMind - Sales"
			},
			{
				"value": "1006165",
				"text": "Carmind - Service"
			},
			{
				"value": "112166",
				"text": "CP/Warranty"
			},
			{
				"value": "1003721",
				"text": "Parts"
			},
			{
				"value": "1003723",
				"text": "Parts in Stock"
			},
			{
				"value": "1003724",
				"text": "Part Ordered"
			}
		],
		"ServiceProduct": [
			{
				"value": "100007",
				"text": "Diagnosis"
			},
			{
				"value": "100008",
				"text": "Services - Minor"
			},
			{
				"value": "100009",
				"text": "Serivces - Intermediate"
			},
			{
				"value": "100010",
				"text": "Services - Major"
			},
			{
				"value": "100011",
				"text": "Carmind - Sales"
			},
			{
				"value": "100012",
				"text": "Carmind - Service"
			},
			{
				"value": "100013",
				"text": "2.5"
			},
			{
				"value": "100014",
				"text": "3"
			},
			{
				"value": "100015",
				"text": "3.5"
			},
			{
				"value": "100016",
				"text": "6.5"
			}
		],
		"Source": [
			{
				"value": "100031",
				"text": "Walk-in"
			},
			{
				"value": "100032",
				"text": "Inbound Call"
			},
			{
				"value": "100033",
				"text": "Outbound Call"
			},
			{
				"value": "112169",
				"text": "Web"
			},
			{
				"value": "112170",
				"text": "Dealer Mgmt Sys"
			},
			{
				"value": "112181",
				"text": "Marketing/Biz Rule"
			},
			{
				"value": "100133",
				"text": "History Import"
			},
			{
				"value": "200200",
				"text": "Survey"
			},
			{
				"value": "1003500",
				"text": "Call Center"
			},
			{
				"value": "1006027",
				"text": "Support DashBoard"
			}
		],
		"AssignedTo": [
			{
				"value": "akalam",
				"text": "A kalam"
			},
			{
				"value": "kgaharper",
				"text": "Adam Harper"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "kgallic",
				"text": "Alli Cerruti"
			},
			{
				"value": "testentity",
				"text": "AlohaQA test"
			},
			{
				"value": "kgATest",
				"text": "Alpana Wadhwa"
			},
			{
				"value": "ame3",
				"text": "Ameeta kghqa"
			},
			{
				"value": "asaxena",
				"text": "Ameeta Saxena"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test (KG)"
			},
			{
				"value": "kgawyss",
				"text": "Andrea Wyss (KG)"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbcarpent",
				"text": "Bill Carpenter"
			},
			{
				"value": "kgbtest",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbgeorge",
				"text": "Brian George"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgcdimond",
				"text": "Carolyn Dimond"
			},
			{
				"value": "kgccarmody",
				"text": "Chris Carmody"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "testent01",
				"text": "D07508 Test"
			},
			{
				"value": "testent012",
				"text": "D7508 test"
			},
			{
				"value": "kgdavel",
				"text": "David Lytle"
			},
			{
				"value": "kgdavidl",
				"text": "David Lytle"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "fsadhawal",
				"text": "Dhawal J"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgedr",
				"text": "Edgar Reporter"
			},
			{
				"value": "kgewilson",
				"text": "Erin Wilson"
			},
			{
				"value": "fake",
				"text": "Fake Fake"
			},
			{
				"value": "finster",
				"text": "Finbarr Kiely"
			},
			{
				"value": "kggartha",
				"text": "Garth Allred"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "kgjclawson",
				"text": "Jeremy Clawson"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "jblow",
				"text": "Joe Blow"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "testfinan",
				"text": "John Tester"
			},
			{
				"value": "johntest",
				"text": "Johnny Test"
			},
			{
				"value": "kgjulied",
				"text": "Julie Dougall"
			},
			{
				"value": "kgkhewtest",
				"text": "Kimball Hewtest"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "kgKrishna",
				"text": "Krishna Ashok"
			},
			{
				"value": "kglschomak",
				"text": "Lance Schomaker"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "kgljones",
				"text": "Leland Jones"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kgOEMTeste",
				"text": "OEM Tester"
			},
			{
				"value": "pldrosa",
				"text": "Paulo L Rosa"
			},
			{
				"value": "puser",
				"text": "phantom user"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "raj",
				"text": "raj samy"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca Cook Anderson"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "kgrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrbales",
				"text": "Russ Bales"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsburgess",
				"text": "Scott Burgess"
			},
			{
				"value": "ckSElgram",
				"text": "Scott Elgram (CK)"
			},
			{
				"value": "kgSElgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgslayton",
				"text": "Scott Layton"
			},
			{
				"value": "kgsmiles",
				"text": "Scott Miles"
			},
			{
				"value": "kgSTest",
				"text": "Scott Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "kgsblum",
				"text": "Slater Blum"
			},
			{
				"value": "kgstuser1",
				"text": "SocketTalk User1"
			},
			{
				"value": "kgstuser2",
				"text": "SocketTalk User2"
			},
			{
				"value": "kgstuser3",
				"text": "SocketTalk User3"
			},
			{
				"value": "kgsschubac",
				"text": "Stan Schubach"
			},
			{
				"value": "kgspolityk",
				"text": "Steve Polityka"
			},
			{
				"value": "kgsbales",
				"text": "Surr Bales"
			},
			{
				"value": "taratest",
				"text": "Tara Turkzadeh"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgtwilkins",
				"text": "Trevor Wilkins"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			}
		],
		"BDCAssigned": [
			{
				"value": "akalam",
				"text": "A kalam"
			},
			{
				"value": "kgaharper",
				"text": "Adam Harper"
			},
			{
				"value": "kgakramer",
				"text": "Al Kramer"
			},
			{
				"value": "kgallic",
				"text": "Alli Cerruti"
			},
			{
				"value": "testentity",
				"text": "AlohaQA test"
			},
			{
				"value": "kgATest",
				"text": "Alpana Wadhwa"
			},
			{
				"value": "ame3",
				"text": "Ameeta kghqa"
			},
			{
				"value": "asaxena",
				"text": "Ameeta Saxena"
			},
			{
				"value": "kgawysst",
				"text": "Andrea Test (KG)"
			},
			{
				"value": "kgawyss",
				"text": "Andrea Wyss (KG)"
			},
			{
				"value": "kgandy",
				"text": "Andy Test"
			},
			{
				"value": "kgapehrson",
				"text": "Angie Pehrson"
			},
			{
				"value": "kgbarneyc",
				"text": "Barney Carlson"
			},
			{
				"value": "kgbcarpent",
				"text": "Bill Carpenter"
			},
			{
				"value": "kgbtest",
				"text": "Boyce Test (KGH)"
			},
			{
				"value": "kgbcrapo",
				"text": "Brandon Crapo"
			},
			{
				"value": "kgbhopkins",
				"text": "Brett Hopkins"
			},
			{
				"value": "kgbgeorge",
				"text": "Brian George"
			},
			{
				"value": "kgbfathers",
				"text": "Bruce Fathers"
			},
			{
				"value": "kgcdimond",
				"text": "Carolyn Dimond"
			},
			{
				"value": "kgccarmody",
				"text": "Chris Carmody"
			},
			{
				"value": "kgchrisl",
				"text": "Chris Lenker"
			},
			{
				"value": "testent01",
				"text": "D07508 Test"
			},
			{
				"value": "testent012",
				"text": "D7508 test"
			},
			{
				"value": "kgdavel",
				"text": "David Lytle"
			},
			{
				"value": "kgdavidl",
				"text": "David Lytle"
			},
			{
				"value": "kgdel",
				"text": "Delete Queue"
			},
			{
				"value": "fsadhawal",
				"text": "Dhawal J"
			},
			{
				"value": "kgdking",
				"text": "Don King"
			},
			{
				"value": "kgejeppson",
				"text": "Eddie Jeppson"
			},
			{
				"value": "kgedr",
				"text": "Edgar Reporter"
			},
			{
				"value": "kgewilson",
				"text": "Erin Wilson"
			},
			{
				"value": "fake",
				"text": "Fake Fake"
			},
			{
				"value": "finster",
				"text": "Finbarr Kiely"
			},
			{
				"value": "kggartha",
				"text": "Garth Allred"
			},
			{
				"value": "kgiqueue",
				"text": "Internet Queue"
			},
			{
				"value": "kgjframpto",
				"text": "Jason Frampton"
			},
			{
				"value": "kgjclawson",
				"text": "Jeremy Clawson"
			},
			{
				"value": "jimh",
				"text": "Jim Hutson"
			},
			{
				"value": "jblow",
				"text": "Joe Blow"
			},
			{
				"value": "kgjuryan",
				"text": "Joel Uryan"
			},
			{
				"value": "testfinan",
				"text": "John Tester"
			},
			{
				"value": "johntest",
				"text": "Johnny Test"
			},
			{
				"value": "kgjulied",
				"text": "Julie Dougall"
			},
			{
				"value": "kgkhewtest",
				"text": "Kimball Hewtest"
			},
			{
				"value": "kgkvreeken",
				"text": "Kris Vreeken"
			},
			{
				"value": "kgKrishna",
				"text": "Krishna Ashok"
			},
			{
				"value": "kglschomak",
				"text": "Lance Schomaker"
			},
			{
				"value": "kglmcelrea",
				"text": "Laurie McElreath"
			},
			{
				"value": "kgljones",
				"text": "Leland Jones"
			},
			{
				"value": "kgmboehlen",
				"text": "Mark Boehlen"
			},
			{
				"value": "kgmarkm",
				"text": "Mark Mamulski"
			},
			{
				"value": "kgmterry",
				"text": "Mike Terry"
			},
			{
				"value": "kgOEMTeste",
				"text": "OEM Tester"
			},
			{
				"value": "pldrosa",
				"text": "Paulo L Rosa"
			},
			{
				"value": "puser",
				"text": "phantom user"
			},
			{
				"value": "kgphillj",
				"text": "Phillip Johnson"
			},
			{
				"value": "kgwho",
				"text": "Phone Queue"
			},
			{
				"value": "154QA",
				"text": "QA Queue"
			},
			{
				"value": "raj",
				"text": "raj samy"
			},
			{
				"value": "kgrcook",
				"text": "Rebecca Cook Anderson"
			},
			{
				"value": "kgrec",
				"text": "Receptionist Receptionist"
			},
			{
				"value": "kgrprows",
				"text": "Rhett Prows"
			},
			{
				"value": "kgrjudson",
				"text": "Rick Judsonsonsonsonsonsonsonsonsonsonsonsonsonsonsonso"
			},
			{
				"value": "kgrbrown",
				"text": "Ron Brown"
			},
			{
				"value": "kgrbales",
				"text": "Russ Bales"
			},
			{
				"value": "154Sales",
				"text": "Sales Queue"
			},
			{
				"value": "kgshewett",
				"text": "Sarah Hewtest (KGH)"
			},
			{
				"value": "kgsburgess",
				"text": "Scott Burgess"
			},
			{
				"value": "ckSElgram",
				"text": "Scott Elgram (CK)"
			},
			{
				"value": "kgSElgram",
				"text": "Scott Elgram (KG)"
			},
			{
				"value": "kgslayton",
				"text": "Scott Layton"
			},
			{
				"value": "kgsmiles",
				"text": "Scott Miles"
			},
			{
				"value": "kgSTest",
				"text": "Scott Test"
			},
			{
				"value": "154Service",
				"text": "Service Queue"
			},
			{
				"value": "kgshenriqu",
				"text": "Sherice Henriquez"
			},
			{
				"value": "kgsblum",
				"text": "Slater Blum"
			},
			{
				"value": "kgstuser1",
				"text": "SocketTalk User1"
			},
			{
				"value": "kgstuser2",
				"text": "SocketTalk User2"
			},
			{
				"value": "kgstuser3",
				"text": "SocketTalk User3"
			},
			{
				"value": "kgsschubac",
				"text": "Stan Schubach"
			},
			{
				"value": "kgspolityk",
				"text": "Steve Polityka"
			},
			{
				"value": "kgsbales",
				"text": "Surr Bales"
			},
			{
				"value": "taratest",
				"text": "Tara Turkzadeh"
			},
			{
				"value": "kgtaylorj",
				"text": "Taylor Johnson"
			},
			{
				"value": "kgtblock",
				"text": "Therese Block"
			},
			{
				"value": "kgtwilkins",
				"text": "Trevor Wilkins"
			},
			{
				"value": "kgwpeterse",
				"text": "Wayne Petersen"
			}
		],
		"TrackingCode": [
			{
				"value": "100034",
				"text": "2011 DD#10 Orlando  "
			},
			{
				"value": "100035",
				"text": "2011 DSES Las Vegas "
			},
			{
				"value": "100036",
				"text": "2012 NADA Las Vegas "
			},
			{
				"value": "100037",
				"text": "No Century Interactive "
			},
			{
				"value": "100038",
				"text": "Consulting QA"
			},
			{
				"value": "100039",
				"text": "Craigslist"
			},
			{
				"value": "100040",
				"text": "Customers"
			},
			{
				"value": "100041",
				"text": "Email Blast"
			}
		],
		"Ranking": [
			{
				"value": "100034",
				"text": "1 - Hot"
			},
			{
				"value": "100035",
				"text": "0 Not Ranked"
			},
			{
				"value": "100036",
				"text": "2 - Medium"
			},
			{
				"value": "100037",
				"text": "3 - Cold"
			},
			{
				"value": "100038",
				"text": "4 Bronze"
			},
			{
				"value": "100039",
				"text": "5 Bronze.25"
			},
			{
				"value": "100040",
				"text": "8 Silver"
			},
			{
				"value": "100041",
				"text": "12 Gold"
			}
		],
		"ServiceDate": [
			{
				"value": "100034",
				"text": "Today"
			},
			{
				"value": "100035",
				"text": "Next 2 Days"
			},
			{
				"value": "100036",
				"text": "Next 7 Days"
			},
			{
				"value": "100043",
				"text": "Next 2 Weeks"
			}
		]
	};

/***/ },

/***/ 914:
/***/ function(module, exports) {

	module.exports = {
		"Id": "2753425",
		"LastUpdate": "11/18/2015",
		"$type": "ServiceEvent",
		"Status": {
			"value": "100023",
			"text": "1 - Open"
		},
		"Description": "Test Service Event",
		"Type": {
			"value": "1004546",
			"text": "Performance"
		},
		"ServiceProduct": {
			"value": "100007",
			"text": "Diagnosis"
		},
		"Source": {
			"value": "100031",
			"text": "Walk-in"
		},
		"TrackingCode": {
			"value": "100034",
			"text": "2011 DD#10 Orlando  "
		},
		"AssignTo": {
			"value": "pldrosa",
			"text": "Paulo L Rosa"
		},
		"BDCAssigned": {
			"value": "akalam",
			"text": "A kalam"
		},
		"Ranking": {
			"value": "123456",
			"text": "Hot"
		},
		"ServiceDate": {
			"value": "100034",
			"text": "Today"
		},
		"VehicleId": "668294",
		"ServiceAdviser": "Cristian Stoichin",
		"FirstName": "Justin",
		"LastName": "Dennison",
		"TotalCost": 10000,
		"CurrentMiKm": 1234,
		"Vehicle": {
			"$type": "Vehicle",
			"Id": "434904",
			"StockNumber": "999",
			"VehicleOwnership": null,
			"Vin": "1GNDS13S352370795",
			"Make": "CHEVROLET TRUCK",
			"Model": "TRAILBLAZER",
			"Trim": "",
			"Year": "2005",
			"PurchasedDate": null,
			"Status": true,
			"Engine": "v8",
			"Transmission": null,
			"Drivetrain": "AWD",
			"Style": null,
			"FuelEfficiency": null,
			"Odometer": "007",
			"BodyStyle": "Sedan",
			"Cylinders": null,
			"ExteriorColor": "WHITE",
			"InteriorColor": "Beige",
			"LastServiced": "6/1/2012",
			"ServiceEvents": [
				{
					"$type": "ServiceEvent",
					"Id": "1792202",
					"Status": {
						"value": "100169",
						"text": "4 - Completed"
					},
					"Type": {
						"value": "100159",
						"text": "Customer Pay"
					},
					"Source": {
						"value": "100178",
						"text": "Dealer Mgmt Sys"
					},
					"ServiceAdviser": "John Bishop",
					"DueDate": "2012-06-02T13:00:00.000Z",
					"CurrentMiKm": 111007,
					"VehicleId": "434904",
					"TotalCost": 30.46,
					"LastUpdated": "6/1/2012",
					"Dealership": null,
					"Franchise": {
						"value": "20",
						"text": "Texan Buick GMC"
					},
					"OppCodes": [
						{
							"RONumber": "158024",
							"Type": "S",
							"Cat": "C",
							"OppCode": "98GCZ",
							"Description": "FREE MULTIPOINT INSP"
						},
						{
							"RONumber": "158024",
							"Type": "S",
							"Cat": "C",
							"OppCode": "98GCZ0019",
							"Description": "FALL CARE PACKAGE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "06GCZFALIGN",
							"Description": "ALIGN FRONT SUSP."
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "06GCZROT",
							"Description": "ROTATE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "50GCZCOO",
							"Description": "COOLANT FLUSH"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "50GCZFALIGN",
							"Description": "ALIGN FRONT SUSP."
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "50GCZFIL",
							"Description": "FUEL FILTER"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "95GCZBGFBJ",
							"Description": "*BG FRT BRK JOB RES"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0001",
							"Description": "*TIRE ROTATION"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0006",
							"Description": "*LOF DIESEL"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0007",
							"Description": "ENGINE, LOF TRUCK"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ001",
							"Description": "*SYNTH OIL CHANGE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0021",
							"Description": "ENGINE, LOF"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "98GCZ0026",
							"Description": "*ROTATE & BALANCE"
						},
						{
							"RONumber": "158024",
							"Type": "D",
							"Cat": "C",
							"OppCode": "99GCZ",
							"Description": "TEXAN MAINTENANCE"
						}
					],
					"FirstName": null,
					"LastName": null
				}
			],
			"GlobalId": null,
			"Created": null,
			"LastModified": null,
			"CreatedBy": null,
			"LastModifiedBy": null,
			"ImageUrls": []
		}
	};

/***/ },

/***/ 915:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../typings/index.d.ts"/>
	"use strict";
	var PullCreditReport = (function () {
	    function PullCreditReport() {
	        this.pullCreditReportData = __webpack_require__(916);
	    }
	    PullCreditReport.prototype.registerHandlers = function ($httpBackend, shimBaseUrl, shimBaseUrlRegex) {
	        var _this = this;
	        var pullCreditReportUrl = /\/shim\/creditreport\/(\d+)/;
	        var ncciCredit = this.pullCreditReportData.ncciCreditSetup;
	        //ToDo: Figure out how to utilize the other three credit agencies
	        var sevenHundredCredit = this.pullCreditReportData.sevenHundredCreditSetup;
	        var adpCredit = this.pullCreditReportData.adpCreditSetup;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + pullCreditReportUrl.source)).respond(function (method, url, data, headers) {
	            return [200, ncciCredit];
	        });
	        var isDealershipSetUpUrl = /\/shim\/creditReportDealershipIsSetUp\/(\d+)/;
	        $httpBackend.whenGET(new RegExp(shimBaseUrlRegex.source + isDealershipSetUpUrl.source)).respond(function (method, url, data, headers) {
	            return [200, _this.pullCreditReportData.isSetUp];
	        });
	    };
	    return PullCreditReport;
	}());
	module.exports = PullCreditReport;


/***/ },

/***/ 916:
/***/ function(module, exports) {

	module.exports = {
		"isSetUp": {
			"isSetUp": true,
			"errorMessage": ""
		},
		"ncciCreditSetup": {
			"transunion": {
				"enabled": true,
				"default": true
			},
			"experian": {
				"enabled": true,
				"default": true
			},
			"equifax": {
				"enabled": true,
				"default": true
			},
			"accountName": "12113html",
			"password": "465fsad465",
			"agency": "NCCICredit"
		},
		"sevenHundredCreditSetup": {
			"transunion": {
				"enabled": true,
				"default": false
			},
			"experian": {
				"enabled": true,
				"default": true
			},
			"equifax": {
				"enabled": true,
				"default": false
			},
			"accountName": "dealersckt",
			"password": "Test1234",
			"agency": "700"
		},
		"adpCreditSetup": {
			"transunion": {
				"enabled": false,
				"default": false
			},
			"experian": {
				"enabled": false,
				"default": false
			},
			"equifax": {
				"enabled": false,
				"default": false
			},
			"agency": "ADP"
		}
	};

/***/ }

});