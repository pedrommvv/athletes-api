# Testing Strategy

## Describes how you would approach the frontend testing, specifically focusing on:

## Tools you will use taking into account the frontend will be ReactJs based SPA consuming the REST API

CodeceptJS or Playwright. Both have it's advantages.
I used CodeceptJS in the previous project, a wrapper than works different helpers like Playwright, Webdriverio and others.
For Playwright I never applied to any professional project but I see a great potencial too, it's very well maintained with regular updates.

## Approach to testing, how would you get involved and in what point from beginning of the development to the end. Assuming the spec for the frontend has just been handled out to the team by the PO and it will be implemented in one sprint of two weeks, what would you involvement be, when and what specific tasks you will use

Scenario: start a project from scratch. The approach also depends on the time and resources available.

Working in Scrum cerimonies, I would start with the test analysis as soon as the stories are available in the backlog the grooming/refinement meeting takes place.
It's possible to evaluate the test conditions, possible blockers, edge cases and other challenges before giving an estimate of a story. Only this way we can give a honest estimate to the Product team and the team understands the test complexity.

When a story is in the current sprint, while the developer works on a story, I would do the test design, prioritize and write the test cases. (I would love to have a JIRA plugin that shows the test cases and results directly in the JIRA ticket, so that the tester work could have more visibility.)

When the developer opens the Pull Request, I could start the test implemention of the integration or e2e tests. The Pull Request is subject to changes, and it's important to regularly pull code from the repository. When the test code is pushed to the repository, if the CI is configured properly, the old and new tests need to "pass" in order to merge the PR. We could argue if it should run all the regression tests or just the smoke tests because of the time it would take.

After the successfull merge of the PR, the test automation should run the entire test regression to guarantee no errors occured in the test environment. Ideally an e2e test.

In my previous projects, I also did manual testing and I would write the test case and steps.
For the automation tests role I would write the test scripts as soon as the Pull Request is open because of time contrains. Of course is open to changes, but it would speed the delivery. Ideally the PR should be only approved with the unit/integration tests are all green.
These topics should be addressed, regarding the processes within the team. It's not only the QA responsible for the quality, it's everyone.

## Interaction with developers and developer code. How would your relation with the developers be and, specifically, what changes would you ask for in their code practices or structure?

It's important to have fixed data-test attributes in the HTML code, so that eases the test suite maintainbility. Depending wheter the QA has access to the source code repository or not, and if the developers wish, the tester could add those test attributes in the HTML or in configuration files for react and angular applications in the past. However this topic needs to be address within the team.

Also would be important to use libraries like prettier and tslint, to improve the code quality.

I also would request that integration tests should be run in the branch in the CI pipeline, to guarantee we do not merge avoidable bugs to the test development, qa or staging environments.

## Describes any additional comments or remarks overall, including changes you would make (if any) to the REST API design or to the way it has been developed that would have enabled to automate the testing better as well as any remarks you feel prevented you from automating better

- /athletes/:id/results
The Fourths atribute is not present in this endpoin as mentioned in the Word Document. Not sure if it's a bug from the spec or the api

- Handle errors gracefully

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found - this is noticeable for the response of the endpoint {{url}}/athletes/12232312313, when the id does not have an athlete yet
500 Internal server error
502 Bad Gateway
503 Service Unavailable

- Allow filtering, sorting and pagination. - would be useful to have lighter http responses

- Security: communication between client and server should be private since we often send and receive private information. Use of SSL/TLS is important.

- photo_id same as athlete id. If theres no more than one photo per athlete, no need for photo_id attribute or endpoint. it could be part of atlete request.

- use Base64 encoding for photos?
  
- date format should be DD-MM-YYYY instead of DD/MM/YYYY

- no information about the metrics related to weight or height, are those values metric?
