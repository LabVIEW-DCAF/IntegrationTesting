<?xml version='1.0' encoding='UTF-8'?>
<Project Type="Project" LVVersion="9008000">
	<Item Name="My Computer" Type="My Computer">
		<Property Name="server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="server.tcp.port" Type="Int">0</Property>
		<Property Name="server.tcp.serviceName" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.tcp.serviceName.default" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="specify.custom.address" Type="Bool">false</Property>
		<Item Name="Analyze Hierarchy for Reentrancy_Pretest.vi" Type="VI" URL="../Analyze Hierarchy for Reentrancy_Pretest.vi"/>
		<Item Name="Run All Jitter Tests Reentrancy_Pretest.vi" Type="VI" URL="../Run All Jitter Tests Reentrancy_Pretest.vi"/>
		<Item Name="Dependencies" Type="Dependencies">
			<Item Name="vi.lib" Type="Folder">
				<Item Name="Merge Errors.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Merge Errors.vi"/>
				<Item Name="Get File Extension.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Get File Extension.vi"/>
				<Item Name="Recursive File List.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Recursive File List.vi"/>
				<Item Name="List Directory and LLBs.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/List Directory and LLBs.vi"/>
				<Item Name="Clear Errors.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Clear Errors.vi"/>
			</Item>
			<Item Name="Find first RT Target in project.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Tools/LabVIEW Project/Targets/Find/Find first RT Target in project.vi"/>
			<Item Name="VI Reentrancy Setting.ctl" Type="VI" URL="../VI Reentrancy Setting.ctl"/>
			<Item Name="Test Parameter Enum.ctl" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Test Parameter Enum.ctl"/>
			<Item Name="Set Parameter Value by Name Poly.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name Poly.vi"/>
			<Item Name="Set Parameter Value by Name (Double).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (Double).vi"/>
			<Item Name="Set Parameter Value by Name.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name.vi"/>
			<Item Name="Set Parameter Value by Name (Bool).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (Bool).vi"/>
			<Item Name="Set Parameter Value by Name (I32).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (I32).vi"/>
			<Item Name="Set Parameter Value by Name (Stringl).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (Stringl).vi"/>
			<Item Name="Set Parameter Value by Name (U32).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (U32).vi"/>
			<Item Name="Set Parameter Value by Name (Path).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (Path).vi"/>
			<Item Name="Set Parameter Value by Name (Variant).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (Variant).vi"/>
			<Item Name="Set Parameter Value by Name (U64).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Set Parameter Value by Name (U64).vi"/>
			<Item Name="Is My Computer.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Tools/LabVIEW Project/Targets/Query/Is My Computer.vi"/>
			<Item Name="Get Parameter Value by Name Poly.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name Poly.vi"/>
			<Item Name="Get Parameter Value by Name DBL.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name DBL.vi"/>
			<Item Name="Get Parameter Value by Name.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name.vi"/>
			<Item Name="Get Parameter Value by Name I32.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name I32.vi"/>
			<Item Name="Get Parameter Value by Name (Bool).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name (Bool).vi"/>
			<Item Name="Get Parameter Value by Name (String).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name (String).vi"/>
			<Item Name="Get Parameter Value by Name (Path).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name (Path).vi"/>
			<Item Name="Get Parameter Value by Name (U32).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name (U32).vi"/>
			<Item Name="Get Parameter Value by Name (Variant).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name (Variant).vi"/>
			<Item Name="Get Parameter Value by Name (U64).vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Parameter Value by Name (U64).vi"/>
			<Item Name="Get Test Suite Parameter Name.vi" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Get Test Suite Parameter Name.vi"/>
			<Item Name="Test Parameter Map.ctl" Type="VI" URL="../../../../../../../CommonSubVIs/Framework/Flattened_Array/Test Parameter Map.ctl"/>
			<Item Name="Traverse VI for Flat Sequence by Label.vi" Type="VI" URL="../Traverse VI for Flat Sequence by Label.vi"/>
			<Item Name="Select Frame that holds code under investigation.vi" Type="VI" URL="../Select Frame that holds code under investigation.vi"/>
			<Item Name="Reentrancy Settings for Hierarchy.vi" Type="VI" URL="../Reentrancy Settings for Hierarchy.vi"/>
			<Item Name="Retrieve Frame And Script Scratch VI.vi" Type="VI" URL="../Retrieve Frame And Script Scratch VI.vi"/>
		</Item>
		<Item Name="Build Specifications" Type="Build"/>
	</Item>
	<Item Name="cobaka" Type="RT PXI Chassis">
		<Property Name="alias.name" Type="Str">cobaka</Property>
		<Property Name="alias.value" Type="Str">10.0.39.160</Property>
		<Property Name="CCSymbols" Type="Str">OS,PharLap;CPU,x86;INVALIDATE_CACHE,TRUE;TARGET_TYPE,RT;</Property>
		<Property Name="host.ResponsivenessCheckEnabled" Type="Bool">true</Property>
		<Property Name="host.ResponsivenessCheckPingDelay" Type="UInt">5000</Property>
		<Property Name="host.ResponsivenessCheckPingTimeout" Type="UInt">1000</Property>
		<Property Name="host.TargetCPUID" Type="UInt">3</Property>
		<Property Name="host.TargetOSID" Type="UInt">15</Property>
		<Property Name="target.cleanupVisa" Type="Bool">false</Property>
		<Property Name="target.FPProtocolGlobals_ControlTimeLimit" Type="Int">300</Property>
		<Property Name="target.getDefault-&gt;WebServer.Port" Type="Int">80</Property>
		<Property Name="target.getDefault-&gt;WebServer.Timeout" Type="Int">60</Property>
		<Property Name="target.IOScan.Faults" Type="Str"></Property>
		<Property Name="target.IOScan.NetVarPeriod" Type="UInt">100</Property>
		<Property Name="target.IOScan.Period" Type="UInt">10000</Property>
		<Property Name="target.IOScan.PowerupMode" Type="UInt">0</Property>
		<Property Name="target.IOScan.Priority" Type="UInt">0</Property>
		<Property Name="target.IOScan.ReportModeConflict" Type="Bool">false</Property>
		<Property Name="target.IsRemotePanelSupported" Type="Bool">true</Property>
		<Property Name="target.RTCPULoadMonitoringEnabled" Type="Bool">true</Property>
		<Property Name="target.RTTarget.ApplicationPath" Type="Path">/c/ni-rt/startup/startup.rtexe</Property>
		<Property Name="target.RTTarget.EnableFileSharing" Type="Bool">true</Property>
		<Property Name="target.RTTarget.IPAccess" Type="Str">+*</Property>
		<Property Name="target.RTTarget.LaunchAppAtBoot" Type="Bool">false</Property>
		<Property Name="target.RTTarget.VIPath" Type="Path">/c/ni-rt/startup</Property>
		<Property Name="target.server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="target.server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="target.server.tcp.access" Type="Str">+*</Property>
		<Property Name="target.server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="target.server.tcp.paranoid" Type="Bool">true</Property>
		<Property Name="target.server.tcp.port" Type="Int">3363</Property>
		<Property Name="target.server.tcp.serviceName" Type="Str">Main Application Instance/VI Server</Property>
		<Property Name="target.server.tcp.serviceName.default" Type="Str">Main Application Instance/VI Server</Property>
		<Property Name="target.server.vi.access" Type="Str">+*</Property>
		<Property Name="target.server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="target.server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="target.WebServer.Enabled" Type="Bool">false</Property>
		<Property Name="target.WebServer.LogEnabled" Type="Bool">false</Property>
		<Property Name="target.WebServer.LogPath" Type="Path">/c/ni-rt/system/www/www.log</Property>
		<Property Name="target.WebServer.Port" Type="Int">80</Property>
		<Property Name="target.WebServer.RootPath" Type="Path">/c/ni-rt/system/www</Property>
		<Property Name="target.WebServer.TcpAccess" Type="Str">c+*</Property>
		<Property Name="target.WebServer.Timeout" Type="Int">60</Property>
		<Property Name="target.WebServer.ViAccess" Type="Str">+*</Property>
		<Property Name="target.webservices.SecurityAPIKey" Type="Str">PqVr/ifkAQh+lVrdPIykXlFvg12GhhQFR8H9cUhphgg=:pTe9HRlQuMfJxAG6QCGq7UvoUpJzAzWGKy5SbZ+roSU=</Property>
		<Property Name="target.webservices.ValidTimestampWindow" Type="Int">15</Property>
		<Item Name="Dependencies" Type="Dependencies"/>
		<Item Name="Build Specifications" Type="Build"/>
	</Item>
</Project>
