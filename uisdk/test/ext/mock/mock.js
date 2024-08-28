define(['Titan'], function (Titan) {

    describe("Titan.mock", function () {

        it("1 Check that Titan.mock and its methods are defined", function () {
            expect(Titan.mock).toBeDefined();

            expect(Titan.mock.get).toBeDefined();
            expect(Titan.mock.put).toBeDefined();
            expect(Titan.mock.clear).toBeDefined();
            expect(Titan.mock.register).toBeDefined();
        });

        it("2.1 Check that Titan.mock works with simple model. Save new data to Storage and try to get it.", function () {
            var Project = Titan.Model.extend({
                urlRoot: 'rest/project'
            });

            Titan.mock.register(Project, 'Projects');

            var project = new Project({
                name: 'Project1',
                description: 'Description1'
            });
            project.save();

            var id = project.get('id');

            var model = Titan.mock.get(Project, id);
            expect(model).toBeDefined();
            expect(model.id).toBe(id);
            expect(model.name).toBe(project.get('name'));
            expect(model.description).toBe(project.get('description'));
        });

        it("2.2 Check that Titan.mock works with simple model. Put some data to Storage and try to get it", function() {
            var Project = Titan.Model.extend({
                urlRoot: 'rest/project'
            });

            Titan.mock.register(Project, 'Projects');

            var object = Titan.mock.put(Project, {
                name: 'Project2',
                description: 'Description2'
            });
            var id = object.id;

            var project = new Project({
                id: id
            });
            project.fetch();

            expect(project.get('id')).toBe(id);
            expect(project.get('name')).toBe(object.name);
            expect(project.get('description')).toBe(object.description);

            var model = Titan.mock.get(Project, id);
            expect(model).toBeDefined();
            expect(model.id).toBe(id);
            expect(model.name).toBe(object.name);
            expect(model.description).toBe(object.description);
        });

        it("2.3 Check that Titan.mock works with simple model. Get data from Storage, update it and check", function() {
            var Project = Titan.Model.extend({
                urlRoot: 'rest/project'
            });

            Titan.mock.register(Project, 'Projects');

            var object = Titan.mock.put(Project, {
                name: 'Project2',
                description: 'Description2'
            });
            var id = object.id;

            var project = new Project({
                id: id
            });
            project.fetch();

            var model = Titan.mock.get(Project, id);
            expect(model).toBeDefined();
            expect(model.id).toBe(id);
            expect(model.name).toBe(object.name);
            expect(model.description).toBe(object.description);

            project.save({
                description: 'Description3'
            });

            var model2 = Titan.mock.get(Project, id);
            expect(model2.description).not.toBe(object.description);
            expect(model2.description).not.toBe(project.description);
        });

        it("3.1 Check that Titan.mock works with simple collections and models. Save new data to Storage and try to get it. Work with JSON data", function() {
            var Person = Titan.Model.extend();

            var Team = Titan.Collection.extend({
                url: 'rest/team',
                model: Person
            });

            Titan.mock.register(Team, 'Persons');

            var team = new Team();
            expect(team.length).toBe(0);
            team.fetch();
            expect(team.length).toBe(0);

            // working with json data
            var attributes = {
                name: "Name1",
                surname: "Surname1"
            };

            team.create(attributes);
            expect(team.length).toBe(1);
            team.fetch();
            expect(team.length).toBe(1);

            var person = team.first();
            expect(person.get('id')).toBeDefined();
            expect(person.get('name')).toBe(attributes.name);
            expect(person.get('surname')).toBe(attributes.surname);
        });

        it("3.2 Check that Titan.mock works with simple collections and models. Save new data to Storage, check added data, remove it. Work with object", function() {
            var Person = Titan.Model.extend();

            var Team = Titan.Collection.extend({
                url: 'rest/team',
                model: Person
            });

            Titan.mock.register(Team, 'Persons');

            var team = new Team();
            expect(team.length).toBe(0);
            team.fetch();
            expect(team.length).toBe(0);

            // working with object
            var person = new Person({
                name: "Name1",
                surname: "Surname1"
            });
            person.collection = team;

            person.parse = function(savedAttrs) {
                expect(savedAttrs.name).toBe(person.get('name'));
                expect(savedAttrs.surname).toBe(person.get('surname'));
            };
            person.save();

            // check url
            var id = person.get('id');
            expect(person.url()).toBe(Team.prototype.url + '/' + id);

            team.fetch();
            expect(team.length).toBe(1);

            person.destroy();
            team.fetch();
            expect(team.length).toBe(0);
        });
    });

});