![<Concept Plus>](./app/images/cp-full-logo-colored-315x53.png)

# What is EPA-GO?

EPA-GO is Concept Plus' working prototype submission in response to the EPA Environmental Digital Services (EPA-EDS) - Request for Information. [Solicitation Number: SOL-DC-16-00010](https://www.fbo.gov/index?s=opportunity&mode=form&id=318612f638d28fae5675eef7bcc3dfc3&tab=core&_cview=0)

Project Links  | URLs 
 ------------- | ------------- 
 Production Application    | [epago.conceptplusllc.net](https://EPAgo.conceptplusllc.net) 

#### Powered By

![AngularJS](./app/images/angular.png)
![AWS](./app/images/aws.png)
![cAdvisor](./app/images/cadvisor.png)
![Bootstrap](./app/images/bootstrap.png)
![Bower](./app/images/bower.png)
![D3](./app/images/d3.png)
![NVD3](./app/images/novus.png)
![Docker](./app/images/docker.png)
![Github](./app/images/github.png)
![Grunt](./app/images/grunt.png)
![InVision](./app/images/invision.png)
![Jasmine](./app/images/jasmine.png)
![Jenkins](./app/images/jenkins.png)
![KarmaJS](./app/images/karma.png)
![NightwatchJS](./app/images/nightwatch.png)
![NodeJS](./app/images/nodejs.png)
![Selenium](./app/images/selenium.png)
![Yeoman](./app/images/yeoman.png)

# Installation

_See the [EPA-GO Local Deployment Guide](./LOCAL_DEPLOYMENT.md)_

**Docker**  
  
_See the [Docker hub registry - Front End](https://registry.hub.docker.com/u/conceptplus/epa-eds/)_
_See the [Docker hub registry - Data Services](https://registry.hub.docker.com/u/conceptplus/epa-eds/)_


# Technologies

The prototype consumes publicly available, EPA related APIs and works on multiple devices while satisfying all of the criteria's for this challenge. This was achieved with using many modern and open source technologies.


## Modern, Open Source Technologies

* **[NodeJS](http://nodejs.org)** - Cross-platform runtime environment
* **[AngularJS](https://angularjs.org/)** - Front-end framework
* **[Bootstrap](http://getbootstrap.com)** - Front-end UI framework
* **[GruntJS](http://gruntjs.com/)** - Javascript task runner
* **[Docker](http://docker.com)** - Container framework
* **[Karma](http://karma-runner.github.io/)** - Unit testing framework
* **[Jasmine](http://jasmine.github.io/)** - Unit testing framework

## Other Technologies

* **[Github](http://github.com)** - Code repository
* **[Jenkins](https://jenkins-ci.org/)** - Continuous integration
* **[Selenium](http://www.seleniumhq.org/)** - Browser automation
* **[EPA.gov](http://www.epa.gov/enviro/web-services#uvindex)** - REST API
* **[AirNow.gov](https://docs.airnowapi.org)** - REST API

# Environments

* **[Amazon Web Services](http://aws.amazon.com)** was used as our IaaS provider.
* **[Docker](http://docker.com)** containerization of web application.

## Continuous Integration

Our Continuous Integration implementation involved:
* Code check-in
* Jenkins polls and executes build to AWS
* AWS builds and starts Docker container
* Container is published to Docker Hub
* Upon successful deployment of container Jenkins executes job to run automated tests

## Continuous Monitoring

For the scope of this effort, we have enabled multiple monitoring tools to monitor security, vulnerability, performance and health. Based on findings from periodic scans, appropriate action was taken.

* **SSL Scans** - [Qualys](https://www.qualys.com/free-tools-trials/security-at-your-fingertips/)
* **Open Web Application Security Project (OWASP)** - [Qualys](https://www.qualys.com/free-tools-trials/security-at-your-fingertips/)
* **Vulnerability** - [Qualys](https://www.qualys.com/free-tools-trials/security-at-your-fingertips/)
* **Container Monitoring** - [cAdvisor](http://ec2-52-90-111-204.compute-1.amazonaws.com:8080/containers/)
* **Machine Health / Usage** - [AWS CloudWatch](http://aws.amazon.com/cloudwatch/) with real-time alerts


## Automated Testing

The following tools tied into our CI solution and triggered the execution of automated test scripts. All testing results were captured in html reports. 

* [Selenium](http://www.seleniumhq.org/) - web browser automation tool.
* [NightwatchJS](http://www.nightwatchjs.org/) - Node.js E2E testing for browser based apps and websites.
* [PhantomJS](http://phantomjs.org/) - headless webkit scriptable with a Javascript API.

## 508 Testing

This is a prototype, not designed to be 508 compliant. Concept Plus has implemented numerous similar efforts to meet 508 compliance. 

# License

EPA-GO is licensed under the MIT license. For full details see the [LICENSE](./LICENSE.md) on github.

