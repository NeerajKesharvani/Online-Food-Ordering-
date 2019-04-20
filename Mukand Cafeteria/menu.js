class MenuItem 
{
	constructor(name, price, description, amount)
	{
		this.name = name;
		this.price = price;
		this.description = description;
		this.amount = amount;
	}
	
	getName()
	{
		return this.name;
	}
	
	getPrice()
	{
		return this.price;
	}
	
	getDescription()
	{
		return this.description;
	}
	
	getAmount()
	{
		return this.amount;
	}

	setAmount(amount)
	{
		this.amount = amount;
	}
}

class Menu 
{
	constructor()
	{
		this.menuItems = 
		[
			new MenuItem("Samosa", 8, "Fresh and Delicious.", 0),
			new MenuItem("Burger", 30, "Quarter pound burger with lettuce, tomatoes, and bacon.", 0),
			new MenuItem("Hot Dog", 25, "Two hot dogs topped with chili and cheese.", 0),
			new MenuItem("Sandwich", 20, "Enjoy every sandwich.", 0),
			new MenuItem("Noodles", 30, "Noodles are not only amusing but delicious..", 0),
			new MenuItem("Parantha", 35, "Aloo Parantha.", 0)

		]
	}

	updateMenu()
	{
		document.getElementById("samosa").innerHTML = "<span class=boldText>" + this.menuItems[0].getName() + "</span>" + "<br>Price: ₹" + this.menuItems[0].getPrice() + "<br>" + this.menuItems[0].getDescription();
		document.getElementById("samosaAmount").innerHTML = "Amount: " + this.menuItems[0].getAmount();
		document.getElementById("burger").innerHTML = "<span class=boldText>" + this.menuItems[1].getName() + "</span>" + "<br>Price: ₹" + this.menuItems[1].getPrice() + "<br>" + this.menuItems[1].getDescription();
		document.getElementById("burgerAmount").innerHTML = "Amount: " + this.menuItems[1].getAmount();
		document.getElementById("hotDog").innerHTML = "<span class=boldText>" + this.menuItems[2].getName() + "</span>" + "<br>Price: ₹" + this.menuItems[2].getPrice() + "<br>" + this.menuItems[2].getDescription();
		document.getElementById("hotDogAmount").innerHTML = "Amount: " + this.menuItems[2].getAmount();
		document.getElementById("sandwich").innerHTML = "<span class=boldText>" + this.menuItems[3].getName() + "</span>" + "<br>Price: ₹" + this.menuItems[3].getPrice() + "<br>" + this.menuItems[3].getDescription();
		document.getElementById("sandwichAmount").innerHTML = "Amount: " + this.menuItems[3].getAmount();
		document.getElementById("noodles").innerHTML = "<span class=boldText>" + this.menuItems[4].getName() + "</span>" + "<br>Price: ₹" + this.menuItems[4].getPrice() + "<br>" + this.menuItems[4].getDescription();
		document.getElementById("noodlesAmount").innerHTML = "Amount: " + this.menuItems[4].getAmount();
		document.getElementById("parantha").innerHTML = "<span class=boldText>" + this.menuItems[5].getName() + "</span>" + "<br>Price: ₹" + this.menuItems[5].getPrice() + "<br>" + this.menuItems[5].getDescription();
		document.getElementById("paranthaAmount").innerHTML = "Amount: " + this.menuItems[5].getAmount();
		document.getElementById("orderTotal").innerHTML = "<span class='boldText'>Subtotal:</span> ₹" + order.getSubtotal().toFixed(2);
	}
}

class Order
{
	constructor()
	{
		this.orderItems = []; //Object with key value pairs, keys are items and values are quantities
		this.subtotal = 0;
		this.total = 0;
	}

	addItem(item)
	{
		//Adding item to order
		if (this.orderItems.includes(item)) //Item is already present, need to increment item quantity
		{
			var itemIndex = this.orderItems.indexOf(item);
			this.orderItems[itemIndex].quantity += 1;
		}
		else //Item is not already present, need to add it and intialize quantity property to 1
		{
			this.orderItems.push(item);
			var itemIndex = this.orderItems.indexOf(item);
			this.orderItems[itemIndex].quantity = 1;
		}

		//Updating subtotal
		this.subtotal += item.getPrice();
		item.setAmount(item.getAmount() + 1);
		menu.updateMenu();
	}

	removeItem(item)
	{
		if (item.getAmount() > 0) //There is at least one item of this type to remove
		{
			//Removing item from order
			if (this.orderItems.includes(item)) //Item is present, need to decrement item quantity and remove item if quantity becomes 0
			{
				var itemIndex = this.orderItems.indexOf(item);

				if (this.orderItems[itemIndex].quantity > 1)
				{
					this.orderItems[itemIndex].quantity -= 1;
				}
				else
				{
					this.orderItems.splice(itemIndex, 1); //Remove item from inventory
				}
			}

			this.subtotal -= item.getPrice();
			item.setAmount(item.getAmount() - 1);
		}
		menu.updateMenu();
	}

	getSubtotal()
	{
		return this.subtotal;
	}



	checkout()
	{
		window.scrollTo(0,0); //Set scroll to top of the screen

		if (customerLogin.getCustomer() != null) //Need to be logged in to checkout
		{
			if (this.orderItems.length > 0) //There is at least 1 item being ordered
			{
				menuContainer.style.display = "none"; //Hide menu
				checkoutContainer.style.display = "block"; //Display checkout
	
				//Print the order
				var orderDisplay = document.getElementById("orderDisplay");
				while (orderDisplay.childElementCount > 1) //Emptying order display first in case the customer was editing the order (not removing the table header though)
				{
					orderDisplay.removeChild(orderDisplay.lastChild);
				}
				for (var i = 0; i < this.orderItems.length; i++)
				{
					var item = document.createElement('tr');
					item.innerHTML = '<tr><td>' + this.orderItems[i].getName() + '</td><td>' + this.orderItems[i].quantity + '</td><td>₹' + (this.orderItems[i].getPrice() * this.orderItems[i].quantity) + '</td></tr>';
					orderDisplay.appendChild(item);
				}
	
				//Display customer information
				var customerNameDisplay = document.getElementById("customerNameDisplay");
				var customerRollNumberDisplay = document.getElementById("customerRollNumberDisplay");

				var customer = customerLogin.getCustomer();
				customerNameDisplay.innerHTML = '<td>' + customer.getFirstName() + ' ' + customer.getLastName() + '</td>';
				customerRollNumberDisplay.innerHTML = '<td>Roll Number:</td><td>' + customer.getRollNumber() + '</td>';


	
				//Display transaction totals and fees
				var totalDisplay = document.getElementById("total");
				this.total = (this.subtotal).toFixed(2);
				totalDisplay.innerHTML = '<td class="boldText">Total:</td><td class="boldText">₹' + this.total + '</td>';
			}
			else
			{
				alert("You need to select an item to order before you can checkout!");
			}
		}
		else
		{
			//Display login
			loginContainer.style.display = "block";
			menuContainer.style.display = "none";
			alert("You need to login in before you can checkout!");
		}
		
	}

	editOrder()
	{
		//Display menu again
		if (this.delivery)
		{
			this.subtotal -= this.deliveryCost;
		}
		menuContainer.style.display = "block";
		checkoutContainer.style.display = "none";
		window.scrollTo(0,0); //Set scroll to top of the screen
	}

	placeOrder()
	{
		this.chargeCustomer();
		location.reload();
		window.scrollTo(0,0); //Set scroll to top of the screen
	}

	chargeCustomer()
	{

		alert("Thank you for ordering with us!");
	}
}

class CustomerAccount 
{
	constructor(emailAddress, password, rollNumber, firstName, lastName)
	{
		this.emailAddress = emailAddress;
		this.password = password;
		this.rollNumber = rollNumber;

		this.firstName = firstName;
		this.lastName = lastName;
	}

	getEmailAddress()
	{
		return this.emailAddress;
	}

	setEmailAddress(emailAddress)
	{
		this.emailAddress = emailAddress;
	}

	getPassword()
	{
		return this.password;
	}

	setPassword(password)
	{
		this.password = password;
	}

	getRollNumber()
	{
		return this.rollNumber;
	}

	setRollNumber(rollNumber)
	{
		this.rollNumber = rollNumber;
	}



	getFirstName()
	{
		return this.firstName;
	}

	setFirstName(firstName)
	{
		this.firstName = firstName;
	}

	getLastName()
	{
		return this.lastName;
	}

	setLastName(lastName)
	{
		this.lastName = lastName;
	}
}

class CustomerLogin
{
    constructor()
    {
		this.customer = null;

		//Stand in for actual database
		this.accountDatabase =
		[
			new CustomerAccount('marty@gmail.com', 'pswd', '1217201',  'Marty', 'Fitzer'),
			new CustomerAccount('sam@gmail.com', 'password', '1217202',  'Sam', 'Ondieki'),
			new CustomerAccount('gavin@mailinator.com', 'scsu', '1217203',  'Gavin', 'Dutcher'),
			new CustomerAccount('cody@mailinator.com', 'huskies', '1217204',  'Cody', 'Asfeld')
		]
	}

	getCustomer()
	{
		return this.customer;
	}

	setCustomer(accountIndex)
	{
		this.customer = this.accountDatabase[accountIndex];
	}

	getAccountCount()
	{
		return this.accountDatabase.length;
	}

	validate()
	{
        var email = document.getElementById("username").value;
		var password = document.getElementById("password").value;

		//Checking if account exists
		for (var i = 0; i < this.accountDatabase.length; i++)
		{
			//Valid credentials
			if (this.accountDatabase[i].getEmailAddress() == email && this.accountDatabase[i].getPassword() == password)
			{
				this.customer = this.accountDatabase[i];
				urlParams.append("act", i.toString());
				document.location.href = "index.html?" + urlParams;
				alert("Login Successful");
				loginContainer.style.display = "none";
				menuContainer.style.display = "block";
				checkoutContainer.style.display = "none";
			}
		}

		//Invalid credentials
        if (this.customer == null)
        {
            alert("Invalid Details");
            document.getElementById("password").value = "";
        }
	}

	viewSignUp()
	{
		document.getElementById("panelTitle").innerHTML = "Sign Up";
		document.getElementById("signUpBtn").style.display = "block";
		document.getElementById("saveBtn").style.display = "none";
		loginContainer.style.display = "none";
		signUpContainer.style.display = "block";
		menuContainer.style.display = "none";
		checkoutContainer.style.display = "none";
	}

	createAccount()
	{
		//Get data
		var email = document.getElementById("signUpEmail").value;
		var password = document.getElementById("signUpPassword").value;
		var rollNumber = document.getElementById("signUpRollNumber").value;

		var firstName = document.getElementById("signUpFirstName").value;
		var lastName = document.getElementById("signUpLastName").value;

		//Input fields titles
		var emailTitle = document.getElementById("emailTitle");
		var passwordTitle = document.getElementById("passwordTitle");
		var rollNumberTitle = document.getElementById("rollNumberTitle");
		var firstNameTitle = document.getElementById("firstNameTitle");
		var lastNameTitle = document.getElementById("lastNameTitle");

		//Checking if required fields have been filled
		var requirementsMet = true;
		if (email.length < 3)
		{
			emailTitle.style.color = "red";
			requirementsMet = false;
		}
		if (password.length < 1)
		{
			passwordTitle.style.color = "red";
			requirementsMet = false;
		}
		if (rollNumber.length < 8)
		{
			rollNumberTitle.style.color = "red";
			requirementsMet = false;
		}
		if (firstName.length < 1)
		{
			firstNameTitle.style.color = "red";
			requirementsMet = false;
		}
		if (lastName.length < 1)
		{
			lastNameTitle.style.color = "red";
			requirementsMet = false;
		}

		if (requirementsMet) //All required fields are filled out
		{
			var newAccount = new CustomerAccount(email, password, rollNumber, firstName, lastName);
			this.accountDatabase.push(newAccount);

			loginContainer.style.display = "block";
			signUpContainer.style.display = "none";
			menuContainer.style.display = "none";
			checkoutContainer.style.display = "none";
		}
		else
		{
			alert("Please fill out valid information in the required fields!");
		}
	}

	viewEditAccount()
	{
		if (customerLogin.getCustomer() != null) //Logged in
		{
			document.getElementById("panelTitle").innerHTML = "Edit Account";
			document.getElementById("signUpBtn").style.display = "none";
			document.getElementById("saveBtn").style.display = "block";
			loginContainer.style.display = "none";
			signUpContainer.style.display = "block";
			menuContainer.style.display = "none";
			checkoutContainer.style.display = "none";

			//Get data
			var email = document.getElementById("signUpEmail");
			var password = document.getElementById("signUpPassword");
			var rollNumber = document.getElementById("signUpRollNumber");

			var firstName = document.getElementById("signUpFirstName");
			var lastName = document.getElementById("signUpLastName");
			var customer = customerLogin.getCustomer();

			//Populate fields with current customer account data
			email.value = customer.getEmailAddress();
			password.value = customer.getPassword();
			rollNumber.value = customer.getRollNumber();

			firstName.value = customer.getFirstName();
			lastName.value = customer.getLastName();
		}
		else
		{
			loginContainer.style.display = "block";
			signUpContainer.style.display = "none";
			menuContainer.style.display = "none";
			checkoutContainer.style.display = "none";
		}
	}

	editAccount()
	{
		//Get data
		var email = document.getElementById("signUpEmail").value;
		var password = document.getElementById("signUpPassword").value;
		var rollNumber = document.getElementById("rollNumber").value;

		var firstName = document.getElementById("signUpFirstName").value;
		var lastName = document.getElementById("signUpLastName").value;

		//Input fields titles
		var emailTitle = document.getElementById("emailTitle");
		var passwordTitle = document.getElementById("passwordTitle");

		var firstNameTitle = document.getElementById("firstNameTitle");
		var lastNameTitle = document.getElementById("lastNameTitle");

		//Checking if required fields have been filled
		var requirementsMet = true;
		if (email.length < 3)
		{
			emailTitle.style.color = "red";
			requirementsMet = false;
		}
		if (password.length < 1)
		{
			passwordTitle.style.color = "red";
			requirementsMet = false;
		}

		if (firstName.length < 1)
		{
			firstNameTitle.style.color = "red";
			requirementsMet = false;
		}
		if (lastName.length < 1)
		{
			lastNameTitle.style.color = "red";
			requirementsMet = false;
		}

		if (requirementsMet) //All required fields are filled out
		{
			//Save changes
			this.customer.setEmailAddress(email);
			this.customer.setPassword(password);
			this.customer.setRollNumber(rollNumber);

			this.customer.setFirstName(firstName);
			this.customer.setLastName(lastName);
	
			loginContainer.style.display = "none";
			signUpContainer.style.display = "none";
			menuContainer.style.display = "block";
			checkoutContainer.style.display = "none";
			window.scrollTo(0,0); //Set scroll to top of the screen

			if (urlParams.has("edit"))
			{
				urlParams.delete("edit"); //Remove edit parameter
				window.history.pushState({}, document.title, "index.html?" + urlParams);
			}			
		}
		else
		{
			alert("Please fill out valid information in the required fields!");
		}
	}
}

var menu = new Menu();
var order = new Order();
var customerLogin = new CustomerLogin();

//Display correct page elements
var loginContainer = document.getElementById("loginContainer");
var signUpContainer = document.getElementById("signUpContainer");
var menuContainer = document.getElementById("menuContainer");
var checkoutContainer = document.getElementById("checkoutContainer");

signUpContainer.style.display = "none";
checkoutContainer.style.display = "none";

//Determine if menu is being accessed
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("menu")) //Display menu
{
	loginContainer.style.display = "none";
	menuContainer.style.display = "block";
}
else
{
	loginContainer.style.display = "block";
	menuContainer.style.display = "none";
}

//Checking if customer is already logged in
if (urlParams.has("act"))
{
	var accountIndex = urlParams.get("act");
	if (accountIndex < customerLogin.getAccountCount() && accountIndex >= 0) //Logged in
	{
		customerLogin.setCustomer(accountIndex);

		if (urlParams.has("edit")) //Edit account
		{
			/*if (urlParams.has("menu"))
			{
				urlParams.delete("menu");
				document.location.href = 'index.html?' + urlParams.toString();
			}*/

			customerLogin.viewEditAccount();
		}
		else //Show menu
		{
			loginContainer.style.display = "none";
			menuContainer.style.display = "block";
		}
	}
	else
	{
		urlParams.delete("act");
		document.location.href = "index.html?" + urlParams.toString();
	}
}

window.scrollTo(0,0); //Set scroll to top of the screen on load
menu.updateMenu(); //Display the menu