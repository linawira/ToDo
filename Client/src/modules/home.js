// export class Home {
// 	constructor(){
// 		this.message = "Home";
// 	}
    import {inject} from 'aurelia-framework';
    import {Router} from 'aurelia-router';
    
    @inject(Router)
    export class Home {
      constructor(router) {
        this.router = router;
        this.message = 'Home';
      }
    
      login(){
          this.router.navigate('list');
      }
    }
    


// }
