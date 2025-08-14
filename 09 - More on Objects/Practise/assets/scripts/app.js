// DOMHelper as a plain object
var DOMHelper = {
  clearEventListeners: function(element) {
    var clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  },

  moveElement: function(elementId, newDestinationSelector) {
    var element = document.getElementById(elementId);
    var destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.appendChild(element);
  }
};

// ProjectItem constructor
function ProjectItem(id, updateProjectListsFunction, type) {
  this.id = id;
  this.updateProjectListsHandler = updateProjectListsFunction;
  this.connectMoreInfoButton();
  this.connectSwitchButton(type);
}

ProjectItem.prototype.connectMoreInfoButton = function() {
  // You can add functionality here for "More Info" button if needed
};

ProjectItem.prototype.connectSwitchButton = function(type) {
  var projectItemElement = document.getElementById(this.id);
  var switchBtn = projectItemElement.querySelector('button:last-of-type');
  switchBtn = DOMHelper.clearEventListeners(switchBtn);
  switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
  switchBtn.addEventListener(
    'click',
    this.updateProjectListsHandler.bind(null, this.id)
  );
};

ProjectItem.prototype.update = function(updateProjectListsFn, type) {
  this.updateProjectListsHandler = updateProjectListsFn;
  this.connectSwitchButton(type);
};

// ProjectList constructor
function ProjectList(type) {
  this.type = type;
  this.projects = [];
  var prjItems = document.querySelectorAll('#' + type + '-projects li');
  var self = this;
  prjItems.forEach(function(prjItem) {
    self.projects.push(
      new ProjectItem(prjItem.id, self.switchProject.bind(self), self.type)
    );
  });
  console.log(this.projects);
}

ProjectList.prototype.setSwitchHandlerFunction = function(switchHandlerFunction) {
  this.switchHandler = switchHandlerFunction;
};

ProjectList.prototype.addProject = function(project) {
  this.projects.push(project);
  DOMHelper.moveElement(project.id, '#' + this.type + '-projects ul');
  project.update(this.switchProject.bind(this), this.type);
};

ProjectList.prototype.switchProject = function(projectId) {
  var projectIndex = this.projects.findIndex(function(p) {
    return p.id === projectId;
  });
  if (projectIndex !== -1) {
    var project = this.projects[projectIndex];
    this.projects.splice(projectIndex, 1);
    this.switchHandler(project);
  }
};

// App object
var App = {
  init: function() {
    var activeProjectsList = new ProjectList('active');
    var finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
};

App.init();
