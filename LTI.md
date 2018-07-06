### LTI Integration

On the module page you are adding Quodl to, click settings (the gear icon in the top right corner), and click 'Turn Editing On'
<img width="1261" alt="Module page settings" src="https://user-images.githubusercontent.com/8939909/42373632-71993524-810d-11e8-879d-4f04a84e109f.png">

This will bring up the editing options. Click 'Add an activity or resource'.
<img width="1259" alt="visible settings" src="https://user-images.githubusercontent.com/8939909/42373655-84050f3a-810d-11e8-94f0-58a9a64a565c.png">

Then select 'External Tool' and click 'Add'.
<img width="710" alt="add an activity or resource" src="https://user-images.githubusercontent.com/8939909/42374472-210860fa-8110-11e8-9924-b69e1755f3d8.png">

From Preconfigured tool, select 'Quodl'. If Quodl is not in the list of apps, it will need to be preconfigured. Click the '+' next to the selection box and [follow the steps to preconfigure a tool](#preconfiguring-tools).
<img width="872" alt="add preconfigured tool" src="https://user-images.githubusercontent.com/8939909/42374816-4c3f5584-8111-11e8-890f-862989e004eb.png">

In the custom paramaters box, you'll need to add 'module=' and then the 4 character module ID that will identify this module on Quodl.
<img width="1087" alt="custom module id param" src="https://user-images.githubusercontent.com/8939909/42374169-33f0e2a6-810f-11e8-951c-9cc89cde0c61.png">

After this, click 'Save and display' and your link to Quodl should be added to the module page.

<img width="900" alt="Quodl on module page" src="https://user-images.githubusercontent.com/8939909/42375582-e0045ca4-8113-11e8-9ef0-56c54564ec96.png">

### Leaderboard

To display the leaderboard for a module in Moodle, follow the same steps above until you reach 'Add an activity or resource'. Then, select 'URL' from the 'resources' section
<img width="710" alt="add an activity or resource" src="https://user-images.githubusercontent.com/8939909/42376104-d43d8722-8115-11e8-9f08-d1b6fbf393e1.png">

Then give your resource a name, and a url of:  
`https://cul-app-staging.herokuapp.com/#/`, then your 4 character module ID, then `/leaderboard`.
<img width="975" alt="url settings" src="https://user-images.githubusercontent.com/8939909/42376119-e0e8b456-8115-11e8-8797-e26519cdf04a.png">

Select an appearance Display of 'Embed', then click 'Save and return to course' and a link to this module's leaderboard will be available on the module page.
<img width="886" alt="url appearance settings" src="https://user-images.githubusercontent.com/8939909/42376133-ec952064-8115-11e8-9446-894a1d35b00e.png">

<img width="931" alt="leaderboard link on module page" src="https://user-images.githubusercontent.com/8939909/42376332-b3947b7e-8116-11e8-815d-4fe0bcf097f9.png">

<img width="1127" alt="leaderboard iframe" src="https://user-images.githubusercontent.com/8939909/42376329-afe54dfa-8116-11e8-8dc1-817a40dee2d1.png">

### Preconfiguring Tools

To set up Quodl as an external tool and allow it to be used by other people, follow the steps below:

Give the tool:
* a name (most likely 'Quodl')
* a url (https://cul-app-staging.herokuapp.com/lti)
* a consumer key: (cu-moodle)
* The shared secret (This will be provided in an email)
* A default launch container (New window)
* An icon url (https://cul-app-staging.herokuapp.com/assets/logo/Login_signup_icon.svg)

<img width="1183" alt="external tool configuration" src="https://user-images.githubusercontent.com/8939909/42374081-d78f6e2e-810e-11e8-984a-fe4405ca1ff9.png">

<img width="1213" alt="external tool configuration" src="https://user-images.githubusercontent.com/8939909/42374098-e6526d30-810e-11e8-8ab5-73c56d0a1503.png">

Then 'Save changes', and this tool will be available to add to modules.
