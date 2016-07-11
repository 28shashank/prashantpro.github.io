<!--
---
layout: post
title:  ""
date:   2015-11-20 10:22:00
categories: craftsmanship
excerpt: Architecture patterns
comments: true
---

Architectural patterns

Traditional layered architecture

Event driven architecture (EDA)
	Async event processing
	Multiple targets for events
	Complex Multi purpose processors.

	(Highly decoupled and distributed, highly scalable, high degree of complexity)
	Types:
	Event processor
	Broker toplogy
	Broker-less topology

Service oriented architecture (SOA)
	Good pattern for understanding and impl business and processes.
	Very high level of complexity
	*All about data
	diff to impl due to complex tools, hype, misconceptions, heavy biz user involvement.

	business services
		message bus
			process choreographer
			service orchestrator
	
	enterprise services
	application services
	infrastructure services
	
	Defining business service:
		type: abstract
		owner: business users
		granularity: course-grained
		scope: enterprise-level
		notes: contains name, input, output, and process flow (biz services)
		*They are independent of any tech impl or protocol
		*Represented in BPEL, WSDL, etc.
		Examples: PlaceOrder, ExecuteTrade, ProcessClaim

	Defining enterprise service:
		type: concrete
		owner: architect/shared services team
		granularity: course-grained
		scope: enterprise-level
		notes: custom or vendor impl (C++, Java)
		One-to-one or many-to-one relationship with business service.
		Examples: CreateCustomer, CalculateQuote, CheckCompliance

	Defining application service:
		type: concrete
		owner: applicaiton dev team
		granularity: fine-grained
		scope: application-level
		notes: bound to specific application context; generally not shared.
		used for validation, database query and updates.
		Examples: addDriver, addVehicle, getInventoryCount

	Defining infrastructure service:
		type: concrete
		owner: applicaiton dev team
		granularity: fine-grained
		scope: enterprise-level
		notes: supports app and enterprise services.
		impl non-business functionality		
		Examples: security, access, error handling, sso

	Message Bus
		process choreography
		service orchestration
		service registry (mapping of name to service address)
		protocol transformation
		json to xml etc.. message transformation
	
	service-oriented architecture
		Create Quote - BS
		Message Bus
		CreateCustomer	CalcQuote - ES
		AddDriver addVehicle  CheckDriverRecord - AS
		WriteAuditTrail		- IS

Pipeline architecture
	pipe -> transform -> pipe
	uni-directionaly only
	usually point-to-point for high performance, but could be message-based for scalability.
	Payload can be any type (bytes, text, xml etc)
	Synchronous data filtering.
	single target for pipe.
	simple single purpose filters.

	Filters
		self-contained and independent to perform specific task
		Four filter types (producer, consumer, transformer and tester)
		producer-> : starting point, outbound only
		->transformer-> : input, processing, output
		->tester-> : input, discard or pass-thru
		->consumer	: ending point, inbound only
	Example: input reader(producer)-> converter(transformer)-> reducer(transformer)->validator(tester)->input processor(consumer)

	Its usefull for small deterministic systems with a distinct processing flow.
	Loosely coupled  filters. (easily added or removed)
	provides high level decoupling.
	Supports evolutionary design.
	Very adaptible to change.
	Can be incorporated into another pattern.

Microkernel architecture (aka plugin architecture)
	Core system supported by plugins (modules)
	Core - minimal functionality to run the system (smallest possible)
	general biz rules and logic (no custom processing).

	Plugin-module: 
	standalone independent module
	specific additional rules or logic
	Easy add or remove plugins.
	Supports evolutionary design.
	Embeddable into other patterns.

	Example: Eclipse
	Best for systems that have custom processing or processing is susceptible to change.

Space-based architecture
	Very complex,
	Variable scalability
	Not good for traditional rdbms
	expensive pattern to implement.

	Issue in Scalability - DB is not designed to be scalable like web server or app server.
	processing unit - 
		The application having modules 
		Contains internal in mem db or a persistent datastore.
		Data replication engine.

	Middleware (4)
		messaging grid
			control request, session, tracking information (input posting to units)
		data grid
			resp for data replication between units. keeps data in sync.
			async keep centralized system of records.
		processing rid
			manages parallel request processing
		deployment manager
			manage dynamic unit deployment
